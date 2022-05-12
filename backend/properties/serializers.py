"""
Properties Serializer
"""
from rest_framework.serializers import ModelSerializer
from people.models import People

from .models import Properties


class OnwerSerializer(ModelSerializer):
    '''Serializer for Owner's of a property'''
    class Meta:
        '''Meta class'''
        model = People
        fields = ['id', 'first_name', 'last_name']


class PropertiesSerializer(ModelSerializer):  # pylint: disable=too-many-ancestors
    '''
    Properties Serializer
    '''
    owners = OnwerSerializer(many=True)

    class Meta:
        '''
        Meta class for Properties serializer
        '''
        model = Properties
        fields = '__all__'
