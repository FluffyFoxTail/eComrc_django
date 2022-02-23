from django.urls import path

from api.views import product_views as views

urlpatterns = [
    path("contract/", views.get_routes, name="Routes"),
    path("", views.get_products, name="products"),
    path("<str:pk>/", views.get_product, name="product"),
    path("create/", views.create_product, name="createProducts"),
    path("<str:pk>/update/", views.update_product, name="updateProducts"),
    path("<str:pk>/delete/", views.delete_product, name="deleteProducts"),
]
