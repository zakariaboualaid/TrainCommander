Rails.application.routes.draw do
  resources :stations
  root "trips#index"
  resources :orders
  resources :trips
  resources :trains
  post 'authenticate', to: 'authentication#authenticate'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
