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
      resources :documents, only: [:index, :create, :update, :destroy]
    end
  end

  get '/document/:slug', to: 'api/v1/documents#show'

  root "home#index"
  match "*path", via: :all, to: "home#index", constraints: lambda { |req|
    req.path.exclude? "rails/active_storage"
  }
end
