from django.urls import path

from api.views import order_views as views

urlpatterns = [
    path("add/", views.add_order_items, name="add_order"),
    path('myorders/', views.get_my_orders, name='get_all_user_orders'),
    path("<str:pk>/", views.get_order_by_id, name="get_exact_order"),
]
