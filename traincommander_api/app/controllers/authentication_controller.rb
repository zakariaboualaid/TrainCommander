class AuthenticationController < ApplicationController
  skip_before_action :authenticate_request

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])

    if command.success?
      render json: { auth_token: command.result, email: command.email, name: command.name }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end

  def registerguser
    if params["sub"] and params["name"] and params["email"]
      @user = User.where(sub: params["sub"], email: params["email"]).first
      unless @user
        @user = User.new(name: params["name"], email: params["email"], sub: params["sub"])
        if @user.save(validate: false)
          render json: { auth_token: @user.sub, email: @user.email, name: @user.name }
        else
          render json: { error: @user.errors }, status: :unauthorized
        end
      else
          render json: { auth_token: @user.sub, email: @user.email, name: @user.name }
      end
    end
  end

end