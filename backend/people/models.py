'''
People model
'''
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

# Create your models here.


class People(models.Model):
    '''
    People model
    '''

    class Meta:
        '''Meta data for People model'''
        verbose_name = 'Person'
        verbose_name_plural = 'People'

    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    mobile = PhoneNumberField(blank=True)
    home = PhoneNumberField(blank=True)
    date_entered = models.DateTimeField(auto_now_add=True)
