from rest_framework import routers

from .api import PeopleViewSet

router = routers.DefaultRouter()
router.register('api/people', PeopleViewSet, 'people')

urlpatterns = router.urls
