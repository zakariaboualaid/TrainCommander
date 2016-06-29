class UserMailerPreview < ActionMailer::Preview
  def sample_mail_preview
    UserMailer.confirmation_pdf(User.first)
  end
end