Rails.application.routes.draw do
  resources :stations
  root "trips#index"
  resources :orders
  post 'confirm_order', to: 'orders#confirm'
  resources :trips
  resources :trains
  resources :users
  post 'authenticate', to: 'authentication#authenticate'
  post 'send_email', to: 'users#send_email'
  post 'registerguser', to: 'authentication#registerguser'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
