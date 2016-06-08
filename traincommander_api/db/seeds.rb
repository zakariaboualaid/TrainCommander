# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:

  trains = Train.create([{id: 1,name: "T1", city: "Casablanca", capacity: 300},
    {id: 2, name: "T2", city: "Rabat", capacity: 320},
    {id: 3, name: "T3", city: "Marrakech", capacity: 230},
    {id: 4, name: "T4", city: "Agadir", capacity: 220}])
