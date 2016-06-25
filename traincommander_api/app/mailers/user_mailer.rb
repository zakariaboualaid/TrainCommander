class UserMailer < ApplicationMailer
  def confirmation_pdf user
    @user = user
    @url  = 'http://localhost:3000/search'
    mail(to: @user.email, subject: "Thank you for purchasing a ticket.")
    puts "Sending email !!"
  end
end
