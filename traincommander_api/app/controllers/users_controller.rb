class UsersController < ApplicationController
  before_action :find_user
  skip_before_action :authenticate_request, only: :create

  def send_email
    UserMailer.confirmation_pdf(@user).deliver if @user
  end

  def find_user
    @user = User.find_by_email(params["email"])
  end

  def create
    @user = User.new(user_params)
    if @user.save
      # redirect_to controller: "authentication", action: "authenticate", 
      #             email: @user.email, password: @user.password
      render json: @user, status: :created, location: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # Only allow a trusted parameter "white list" through.
  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end