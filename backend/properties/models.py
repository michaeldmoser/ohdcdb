'''
Properties model
'''
from django.db import models


class Properties(models.Model):
    '''
    Properties model
    '''
    address1 = models.CharField(max_length=255, default='n/a')
    address2 = models.CharField(max_length=255, blank=True)
    postalcode = models.CharField(
        max_length=255, default='59801')
    acres = models.DecimalField(decimal_places=3, max_digits=5)
    date_entered = models.DateTimeField(auto_now_add=True)
