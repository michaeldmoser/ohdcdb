'''
People objects api
'''
from rest_framework import viewsets, permissions
import django_filters.rest_framework
from rest_framework import filters

from .models import People
from .serializers import PeopleSerializer


class PeopleViewSet(viewsets.ModelViewSet):
    '''People ViewSet'''

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PeopleSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['first_name', 'last_name', 'email']
    queryset = People.objects.all()

    def perform_create(self, serializer):
        serializer.save()
