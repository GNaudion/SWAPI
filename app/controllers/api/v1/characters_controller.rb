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

		def update
			@character = Character.find(params[:id])
			@character.update_attributes(character_params)
			render json: @character
		end

		def destroy
			@character = Character.find(params[:id])
			if @character.destroy
				head :no_content, status: :ok
			else
				render json: @character.errors, status: :unprocessable_entity
			end
		end

		private 
		
		def character_params
			params.require(:character).permit(:name, :species, :yearofbirth, :birth, :gender)
		end
	end
end
