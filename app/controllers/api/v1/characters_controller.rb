module Api::V1
	class CharactersController < ApplicationController
		def index
			@characters = Character.order("created_at DESC")
			render json: @characters
		end

		def create
			@character = Character.create(character_params)
			render json: @character
		end

		private 
		
		def character_params
			params.require(:character).permit(:name, :species, :yearofbirth, :gender)
		end
	end
end
