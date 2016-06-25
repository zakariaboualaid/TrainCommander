class AuthenticateUser
  prepend SimpleCommand

  attr_accessor :email, :name

  def initialize(email, password)
    @email = email
    @password = password
  end

  def call
    JsonWebToken.encode(user_id: user.id) if user
  end

  private

  attr_accessor :password, :user_id

  def user
    user = User.find_by_email(email)
    @name = user.name
    return user if user && user.authenticate(password)
    errors.add :user_authentication, 'invalid credentials'
    nil
  end
end