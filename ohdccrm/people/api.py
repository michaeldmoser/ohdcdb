from rest_framework.decorators import permission_classes
from people.models import People
from rest_framework import viewsets, permissions
from .serializers import PeopleSerializer

class PeopleViewSet(viewsets.ModelViewSet):
    queryset = People.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PeopleSerializer
    