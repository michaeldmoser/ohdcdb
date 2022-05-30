'''
Organization objects api
'''
from rest_framework import viewsets, permissions
from rest_framework import filters
from rest_framework.response import Response

from .models import Organization
from .serializers import OrganizationSerializer


class OrganizationViewSet(viewsets.ModelViewSet):  # pylint: disable=too-many-ancestors
    '''Organization ViewSet'''

    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = OrganizationSerializer

    filter_backends = [filters.SearchFilter]
    search_fields = ['name'],
    queryset = Organization.objects.all().order_by(  # pylint: disable=no-member
        'name')

    def perform_create(self, serializer):
        serializer.save()
