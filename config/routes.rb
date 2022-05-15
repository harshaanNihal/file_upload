Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  devise_for :users #default

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      devise_scope :user do
        post "login", to: "sessions#create", as: "login"
        delete "logout", to: "sessions#destroy", as: "logout"
      end

      resources :users, only: [:show, :create, :destroy]
    end
  end

  root "home#index"

  match "/home", via: :all, to: "home#index"

end
