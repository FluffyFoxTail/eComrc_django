from django.urls import path
from . import views

urlpatterns = [
    path("", views.get_routes, name="Routes"),
    path("products/", views.get_products, name="products"),
    path("products/<str:pk>/", views.get_product, name="product"),
    path("products/create/", views.create_product, name="createProducts"),
    path("products/<str:pk>/update/", views.update_product, name="updateProducts"),
    path("products/<str:pk>/delete/", views.delete_product, name="deleteProducts"),
]
