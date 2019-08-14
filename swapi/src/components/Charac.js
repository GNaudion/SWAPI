import React from 'react'

const Charac = ({character}) =>
	<div className="charac" key={character.id}>
		<h4 className="charachName">{character.name}</h4>
		<p className="info">Gender : <modif className="detail">{character.gender}</modif><br />Year of Birth : <modif className="detail">{character.yearofbirth}</modif><br />Species : <modif className="detail">{character.species}</modif> </p>
	</div>

export default Charac
