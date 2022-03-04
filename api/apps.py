from tabnanny import verbose
from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'
    verbose_name = "Shop tables"

    def ready(self) -> None:
        import api.signals
        return super().ready()
 