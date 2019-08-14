import React, { Component } from 'react'
import axios from 'axios'

class CharacterForm extends Component{
	constructor(props){
		super(props)
		this.state={
			name: this.props.character.name,
			species: this.props.character.species,
			yearofbirth: this.props.character.yearofbirth,
			gender: this.props.character.gender
		}
	}

	handleInput = (e) => {
		this.setState({[e.target.name]: e.target.value})
	}

	handleOnSubmit = () => {
		const character = {
			name: this.state.name,
			species: this.state.species,
			yearofbirth: this.state.yearofbirth,
			gender: this.state.gender
		}
		const url = `http://localhost:3001/api/v1/characters/${this.props.character.id}`
		axios.put(
			url,
			{character: character}
		)
		.then(response => {
			console.log(response)
			this.props.updateCharacter(response.data)	
		})
		.catch(error => console.log(error))
	}

	
	render(){
		return(
			<div className="charac">
				<form id="form" onSubmit = {this.handleOnSubmit}>
					<p><h4>Name :<input className='input' type="text" name="name" placeholder='Enter a name' value={this.state.name} onChange = {this.handleInput} /></h4><br />Species : 
					<input className='input' type="text" name="species" placeholder='Enter a list of species' value={this.state.species} onChange = {this.handleInput} /><br />Birth Year : 
					<input className='input' type="text" name="yearofbirth" placeholder='Enter a year of birth' value={this.state.yearofbirth}  onChange = {this.handleInput}/><br />Gender : 
					<input className='input' type="text" name="gender" placeholder='Enter a gender' value={this.state.gender} onChange = {this.handleInput} /></p>							
				</form>
				<button type="submit" form="form" value="Submit">Submit</button>
			</div>
		);
	}
}

export default CharacterForm
