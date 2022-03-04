from django.contrib import admin

from .models import *


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "category", "rating", "price", "available")
    list_display_links = ("id", "name")
    search_fields = ("name", "category", "description")
    list_filter = ("created_at", "available")


class OrderItemInline(admin.TabularInline):
    model = OrderItem


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]
    list_display = ("id", "user", "created_at",
                    "total_price", "is_paid", "is_delivered")
    list_display_links = ("id",)
    list_editable = ("is_paid", "is_delivered")
    list_filter = ("created_at", "is_paid", "is_delivered")


@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "order", "count")
    list_display_links = ("id", "order")
    list_filter = ("order",)


@admin.register(DeliveryAddress)
class DeliveryAddressAdmin(admin.ModelAdmin):
    list_display = ("id", "order", "city", "address")
    list_display_links = ("id",)
    search_fields = ("country", "city", "address")
    list_filter = ("order",)


admin.site.register(Review)

admin.site.site_title = "eComerc Django"
admin.site.site_header = "eComerc Django"
