class SessionsController < ApplicationController
  before_filter :require_no_current_user!, :only => [:create, :new]
  before_filter :require_current_user!, :only => [:destroy]

  def create
    user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if user.nil?
      redirect_to root_url
    else
      self.current_user = user
      redirect_to user_url(user)
    end
  end

  def destroy
     current_user.reset_session_token!
     session[:session_token] = nil
     redirect_to new_session_url
  end

  def new
  end
  
end