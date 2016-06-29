class UserMailer < ApplicationMailer
  def confirmation_pdf user
    @user = user
    @url  = TraincommanderApi::Application.config.hostname
    mail(to: @user.email, subject: "Thank you for purchasing a ticket.")
    puts "Sending email !!"
  end
end
