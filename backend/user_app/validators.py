from django.core.exceptions import ValidationError
import re

def validate_email(email):
    error_message = 'Improper email Format.'
    regex = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' 
    #checks if string is a valid email by checking the "personal info" the @ symbol and the domain ex: personal_info@domain.com
    
    good_email = re.match(regex, email)
    
    if good_email:
        return email
    raise ValidationError(error_message, params={'email': email})

def validate_password(password):
    error_message = "Password must be at least 8 characters long, contain at least one letter, one number, and one special character (@, $, !, %, *, ?, &)."
    
    regex = r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
    
    if not re.match(regex, password):
        raise ValidationError(error_message)