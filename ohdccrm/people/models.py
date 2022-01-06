from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.

class People(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, blank=True)
    phone = PhoneNumberField(blank=True, region='US')
    date_entered = models.DateTimeField(auto_now_add=True)

