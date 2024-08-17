class CreateVehicles < ActiveRecord::Migration[7.1]
  def change
    create_table :vehicles do |t|
      t.string :brand
      t.string :model
      t.string :patent
      t.string :year

      t.timestamps
    end
  end
end
