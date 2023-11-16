
{
    routes: [
      {
        "method": "POST",
        "path": "/api/orders",
        "handler": "paypal.createOrder",
        "config": {
          "policies": []
        }
      },
      {
        "method": "POST",
        "path": "/api/orders/:orderID/capture",
        "handler": "paypal.captureOrder",
        "config": {
          "policies": []
        }
      }
    ]
}
  