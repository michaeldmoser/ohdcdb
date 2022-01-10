from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.auth.models import User


class People(models.Model):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, blank=True, unique=True)
    phone = PhoneNumberField(blank=True, region='US')
    date_entered = models.DateTimeField(auto_now_add=True)
    creator = models.ForeignKey(
        User,
        related_name='people',
        on_delete=models.CASCADE,
        null=True
    )
