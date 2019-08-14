import React, {Component} from 'react'

class Character extends Component {
	handleDelete = () => {
		this.props.onDelete(this.props.character.id)
	}

	render(){
		return(
			<div className="charac" >
				<span className="delete" onClick={this.handleDelete}>x</span>
				<h4 className="characName">Name : {this.props.character.name}</h4>
				<p className="info">Gender : <modif className="detail">{this.props.character.gender}</modif><br />Year of Birth : <modif className="detail">{this.props.character.yearofbirth}</modif><br />Species : <modif className="detail">{this.props.character.species}</modif> </p>
			</div>
		)
	}
}

	
		


export default Character
