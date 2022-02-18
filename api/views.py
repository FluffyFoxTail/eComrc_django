from rest_framework.response import Response
from rest_framework.decorators import api_view


@api_view(["GET"])
def getRoutes(request):
    routes = [
        {
            "Endpoint": "/products/",
            "method": "GET",
            "body": None,
            "description": "Returns an array of products"
        },
        {
            "Endpoint": "/products/id",
            "method": "GET",
            "body": None,
            "description": "Returns a single product object"
        },
        {
            "Endpoint": "/products/create/",
            "method": "POST",
            "body": {"body": ""},
            "description": "Creates new product with data sent in post request"
        },
        {
            "Endpoint": "/products/id/update/",
            "method": "PUT",
            "body": {"body": ""},
            "description": "Creates an existing product with data sent in post request"
        },
        {
            "Endpoint": "/products/id/delete/",
            "method": "DELETE",
            "body": None,
            "description": "Deletes and exiting product"
        },
    ]
    return Response(routes)
