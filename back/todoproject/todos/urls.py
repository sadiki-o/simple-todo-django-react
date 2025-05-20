from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TodoViewSet, register_user, profile

router = DefaultRouter()
router.register(r"todos", TodoViewSet, basename="todo")

urlpatterns = [
    path("", include(router.urls)),
    path("register/", register_user, name="register"),
    path('profile/', profile, name='profile'),
]
