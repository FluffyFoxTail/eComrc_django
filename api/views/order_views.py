from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from api.models import Product, Order, OrderItem, DeliveryAddress
from api.serializers import OrderSerializer


@api_view(["POST"])
@permission_classes((IsAuthenticated,))
def add_order_items(request):
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
        product.available -= item["count"]

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes((IsAuthenticated,))
def get_order_by_id(request, pk):
    user = request.user
    try:
        order = Order.objects.get(id=pk)
    except Order.DoesNotExist:
        return Response({"deatail": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)
    if user.is_staff or order.user == user:
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)

    return Response({"detail": "You not authorized to view order"}, status=status.HTTP_401_UNAUTHORIZED)
