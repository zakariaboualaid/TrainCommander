class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

  def send_email
    @user = User.find_by_email(params["email"])
    UserMailer.confirmation_pdf(@user).deliver if @user
  end

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
