from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class Organization(models.Model):
    '''
    Organizations records
    '''

    class Meta:
        '''Meta data for People model'''
        verbose_name = 'Organization'
        verbose_name_plural = 'Organizations'

    name = models.CharField(max_length=100)
    contact_name = models.CharField(max_length=100)
    contact_email = models.EmailField()
    contact_phone = PhoneNumberField(blank=True)
    date_entered = models.DateTimeField(auto_now_add=True)
