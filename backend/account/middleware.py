from django.conf import settings
from django.http import HttpResponseForbidden
from django.utils.deprecation import MiddlewareMixin
from rest_framework import status


class BrowserOnlyMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        if 'Mozilla' in user_agent or 'Mobile' in user_agent or 'ISO' in user_agent:
            response = self.get_response(request)
            return response
        else:
            return HttpResponseForbidden('API access not allowed from this device')


class CorsMiddleware(MiddlewareMixin):
    ALLOWED_ORIGINS = settings.ALLOWED_ORIGINS

    def process_response(self, request, response):
        origin = request.headers.get("Origin")

        if origin in self.ALLOWED_ORIGINS:
            response["Access-Control-Allow-Origin"] = origin
            response["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS"
            response["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
            response["X-Frame-Options"] = "DENY"
            return response
        elif request.path.startswith('/admin/') or request.path.startswith('/static/'):
            return response
        else:
            # Handle unauthorized access
            return HttpResponseForbidden('Unauthorized Access. Please contact the administrator',
                                         status=status.HTTP_400_BAD_REQUEST)
