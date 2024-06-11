from djoser import email
from django.core.mail import EmailMessage
from django.conf import settings


class ActivationEmail(email.ActivationEmail):
    template_name = 'value/activation.html'


class ConfirmationEmail(email.ConfirmationEmail):
    template_name = 'value/confirmation.html'


class PasswordResetEmail(email.PasswordResetEmail):
    template_name = 'value/password_reset.html'


class PasswordChangedConfirmationEmail(email.PasswordChangedConfirmationEmail):
    template_name = 'value/password_changed_confirmation.html'
