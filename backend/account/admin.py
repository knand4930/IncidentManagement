from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

from account.forms import CustomUserCreationForm, CustomUserChangeForm
from account.models import Incident

User = get_user_model()


# Register your models here.
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ('id', 'email', 'first_name', 'last_name', "create_at", "last_login")
    list_filter = ('create_at', "last_login")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Basic Details",
         {"fields": (
             "phone", "address", "pin_code", "city", "country"
         )}

         ),
        ("Assign User",
         {"fields": (
             "assign_user",
         )}

         )
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff",
                "is_active", "groups", "user_permissions"
            )}
         ),
    )

    search_fields = ("email",)
    ordering = ("email",)


admin.site.register(User, CustomUserAdmin)


class IncidentAdmin(admin.ModelAdmin):
    list_display = ("id", "incident_id", "category", "reporter", "status", "priority", "reported_date", "update_date")
    list_filter = ("category", "reporter", "status", "priority", "reported_date")


admin.site.register(Incident, IncidentAdmin)
