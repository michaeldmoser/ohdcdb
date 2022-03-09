'''
People model
'''
from django.db import models

# Create your models here.


class People(models.Model):
    '''
    People model
    '''
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField()
    date_entered = models.DateTimeField(auto_now_add=True)
