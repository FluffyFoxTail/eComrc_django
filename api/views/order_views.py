from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from api.models import Product, Order, OrderItem, DeliveryAddress
from api.serializers import OrderSerializer


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def addOrderItems(request):
    user = request.user
    data = request.data

    order_items = data["orderItems"]
    if order_items and len(order_items) == 0:
        return Response({"detail": "No order items"}, status=status.HTTP_400_BAD_REQUEST)

    order = Order.objects.create(
        user=user,
        payment_methond=data["paymentMethod"],
        tax_price=data["taxesPrice"],
        delivery_price=data["deliveryPrice"],
        total_price=data["totalPrice"]
    )

    delivery = DeliveryAddress.objects.create(
        order=order,
        country=data["deliveryAddress"]["country"],
        post_index=data["deliveryAddress"]["postIndex"],
        city=data["deliveryAddress"]["city"],
        address=data["deliveryAddress"]["address"]
    )

    for item in order_items:
        product = Product.objects.get(id=item["product"])
        ordered_item = OrderItem.objects.create(
            product=product,
            order=order,
            name=product.name,
            count=item["count"],
            price=item["price"],
            image=product.image.url
        )
        product.available -= ordered_item["count"]

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
