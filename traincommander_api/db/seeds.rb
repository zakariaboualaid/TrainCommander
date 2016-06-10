# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
  Train.delete_all
  trains = Train.create([{id: 1,name: "T1", city: "Casablanca", capacity: 300},
    {id: 2, name: "T2", city: "Rabat", capacity: 320},
    {id: 3, name: "T3", city: "Marrakech", capacity: 230},
    {id: 4, name: "T4", city: "Agadir", capacity: 220}])

  Station.delete_all
  stations = Station.create([{id: 1, name: "Casa Voyageur"},
    {id: 2, name: "L'Oasis"},
    {id: 3, name: "Rabat Agdal"}
    ]);

  Trip.delete_all
  trips = Trip.create([{id:1, departure_time: "08/06/2016 00:00:00", total_travel_time: 2800, price: 20, train_id: 1, from_id: 1, to_id: 3},
    {id: 2, departure_time: "08/06/2016 00:00:00", total_travel_time: 2500, price: 22, train_id: 1, from_id: 2, to_id: 3},
    {id: 3, departure_time: "09/06/2016 12:30:00", total_travel_time: 5000, price: 30, train_id: 1, from_id: 3, to_id: 1}
    ]);

  # User.delete_all
  # User.create!(email: 'boulaidzac@gmail.com' , password: '153624' , password_confirmation: '153624')