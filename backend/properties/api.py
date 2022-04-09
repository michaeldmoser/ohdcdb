'''
Properties objects api
'''
from rest_framework import viewsets, permissions
from rest_framework import filters

from .models import Properties
from .serializers import PropertiesSerializer


class PropertiesViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    '''Properties ViewSet'''

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = PropertiesSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['address1']

    queryset = Properties.objects.all().order_by(  # pylint: disable=no-member
        'address1')

    def perform_create(self, serializer):
        serializer.save()
