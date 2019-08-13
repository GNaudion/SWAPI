class CreateCharacters < ActiveRecord::Migration[5.2]
  def change
    create_table :characters do |t|
      t.string :name
      t.string :species
      t.string :yearofbirth
      t.string :gender

      t.timestamps
    end
  end
end
