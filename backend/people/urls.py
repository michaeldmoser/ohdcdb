'''People app urls'''
from rest_framework import routers

from .api import PeopleViewSet

router = routers.DefaultRouter()
router.register('api/people', PeopleViewSet, basename='people')

urlpatterns = router.urls
