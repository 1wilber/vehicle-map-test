# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

vehicles = [
  {
    "brand": "Toyota",
    "model": "Corolla",
    "patent": "A1B-234",
    "year": 2020
  },
  {
    "brand": "Honda",
    "model": "Civic",
    "patent": "C9D-567",
    "year": 2021
  },
  {
    "brand": "Ford",
    "model": "Focus",
    "patent": "E4F-890",
    "year": 2019
  },
  {
    "brand": "Chevrolet",
    "model": "Malibu",
    "patent": "G2H-123",
    "year": 2022
  },
  {
    "brand": "BMW",
    "model": "3 Series",
    "patent": "J7K-456",
    "year": 2023
  },
  {
    "brand": "Nissan",
    "model": "Altima",
    "patent": "L3M-789",
    "year": 2018
  },
  {
    "brand": "Hyundai",
    "model": "Elantra",
    "patent": "N8P-012",
    "year": 2020
  },
  {
    "brand": "Kia",
    "model": "Soul",
    "patent": "Q5R-345",
    "year": 2021
  },
  {
    "brand": "Subaru",
    "model": "Outback",
    "patent": "S6T-678",
    "year": 2019
  },
  {
    "brand": "Volkswagen",
    "model": "Golf",
    "patent": "U2V-901",
    "year": 2022
  },
  {
    "brand": "Mazda",
    "model": "CX-5",
    "patent": "W4X-234",
    "year": 2023
  },
  {
    "brand": "Audi",
    "model": "A4",
    "patent": "Y1Z-567",
    "year": 2020
  },
  {
    "brand": "Mercedes-Benz",
    "model": "C-Class",
    "patent": "B8C-890",
    "year": 2021
  },
  {
    "brand": "Lexus",
    "model": "RX",
    "patent": "D7E-123",
    "year": 2019
  },
  {
    "brand": "Jaguar",
    "model": "XE",
    "patent": "F4G-456",
    "year": 2022
  },
  {
    "brand": "Land Rover",
    "model": "Discovery",
    "patent": "H9J-789",
    "year": 2023
  },
  {
    "brand": "Porsche",
    "model": "Macan",
    "patent": "K3L-012",
    "year": 2020
  },
  {
    "brand": "Genesis",
    "model": "G80",
    "patent": "M5N-345",
    "year": 2021
  },
  {
    "brand": "Chrysler",
    "model": "300",
    "patent": "P7Q-678",
    "year": 2019
  },
  {
    "brand": "Buick",
    "model": "Enclave",
    "patent": "R9S-901",
    "year": 2022
  },
  {
    "brand": "Acura",
    "model": "MDX",
    "patent": "T2U-234",
    "year": 2023
  }
]

vehicles.each {|vehicle| Vehicle.create!(vehicle)}
