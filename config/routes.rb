 TrolleApp::Application.routes.draw do
  resources :users, :only => [:show] do
    resources :boards, :only => [:create, :show, :index]
    resources :settings

  end


  resources :users, :only => [:create, :new]

  resources :boards, :only => [:edit, :update, :destroy] do
    resources :lists, :only => [:new, :show, :create, :index, :destroy]
  end

  resources :lists, :only => [:edit, :update] 
  resources :cards, :except => [:new]

  resource :session, :only => [:create, :destroy, :new]

  root to: "sessions#new"
end
