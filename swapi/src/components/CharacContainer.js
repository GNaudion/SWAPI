import React, { Component } from 'react'
import axios from 'axios'
import Charac from './Charac'
import update from 'immutability-helper'
import CharacterForm from './CharacterForm'

class CharacContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			characters: [],
			editingCharacterId: null
		}
	}	

	componentDidMount(){
		axios.get('http://localhost:3001/api/v1/characters.json')
		.then(response => {
			console.log(response)
			this.setState({characters: response.data})
		})
		.catch(error => console.log(error))
	}

	addNewCharacter = () => {
		//document.write("yolo")
		axios.post(
			'http://localhost:3001/api/v1/characters',
			{ character: 
				{
				name: '',
				species: [],
				yearofbirth:'',					
				gender: ''	
				}
			}
		)
		.then(response => {
			console.log(response)
			const characters = update(this.state.characters, {
				$splice: [[0,0,response.data]]
			})
		
			this.setState({
				characters: characters,
				editingCharacterId: response.data.id
			})
			.catch(error=> console.log(error))
		})
	}

	render(){
		return(

			<div className = "liste">
				<div>

					<button onClick={this.addNewCharacter}> 
						Add Character
					</button>
				</div>
				
				{this.state.characters.map((character) => {
					if(this.state.editingCharacterId === character.id){
						return(
							<CharacterForm character={character} key={character.id} />
						)
					}else{
						return(<Charac character={character} key={character.id} />)
					}
				})}
			</div>
		);
	}
}

export default CharacContainer
