from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model

User = get_user_model()


class IsCustomAdminUser(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated and (request.user.is_superuser or request.user.is_staff):
            return True
        else:
            return False


