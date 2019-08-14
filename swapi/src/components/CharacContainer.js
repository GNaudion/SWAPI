import React, { Component } from 'react'
import axios from 'axios'
import Character from './Character'
import update from 'immutability-helper'
import CharacterForm from './CharacterForm'

class CharacContainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			characters: [],
			editingCharacterId: '',
			notification: ''
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
		axios.post(
			'http://localhost:3001/api/v1/characters',
			{ character: 
				{
				name: '',
				species: '',
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
	
	updateCharacter = (character) => {
		const characterIndex = this.state.characters.findIndex(x => x.id === character.id)
		const characters = update(this.state.characters, {
			[characterIndex]: { $set: character }
		})
		this.setState({characters:characters, notification: 'success'})

	}

	render(){
		return(

			<div className = "liste">
				<div>

					<button onClick={this.addNewCharacter}> 
						Add Character
					</button>
					<span className="notification">
						{this.state.notification}
					</span>
				</div>
				
				{this.state.characters.map((character) => {
					if(this.state.editingCharacterId === character.id){
						return(
							<CharacterForm character={character} key={character.id} updateCharacter={this.updateCharacter} />
						)
					}else{
						return(<Character character={character} key={character.id} />)
					}
				})}
			</div>
		);
	}
}

export default CharacContainer
