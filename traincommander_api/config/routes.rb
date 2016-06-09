Rails.application.routes.draw do
  root "trips#index"
  resources :orders
  devise_for :users
  resources :trips
  resources :trains
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
