#On récupère grace à open-uri le résultat d'une requête sur un nombre fixé de personnes (ici 25)
#On sélectionne ensuite de manière arbitraire quatre attributs de ces personnes, (date de naissance, genre, espèce, et nom). On convertit l'espèce étant donné le format de cette dernière sur SWAPI (une liste d'urls).
#On crée finalement le personnage dans la database. A noter que les exceptions sont prises en compte, le personnage 17 n'existe pas (Error 404).

require 'open-uri'

character_list = []

for i in 1..7 do
	url = "http://swapi.co/api/people/#{i}/"
	begin
		json = open(url)
		puts json

		parsed = ActiveSupport::JSON.decode(json.read()) #.read permet d'obtenir un string (json est au format StringIO)
	
		name = parsed['name']
		speciesurls = parsed['species']
		species = []
		gender = parsed['gender']
		birth = parsed['birth_year']

		speciesurls.each do |url2|
			json2 = open(url2)
			parsed2 = ActiveSupport::JSON.decode(json2.read())
			species << parsed2['name']
		end
		


		newcharacter = Character.create({
			name: name,
			species: species,
			gender: gender,
			yearofbirth: birth
		})
	
		character_list << newcharacter
	rescue OpenURI::HTTPError => ex
		puts "#{url} is unavailable"
	end
	
end

