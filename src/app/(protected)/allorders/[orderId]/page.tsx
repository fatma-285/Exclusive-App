"use client";
import React, { useEffect, useState } from "react";
import { IOrderResponse } from "@/interfaces/orders.interface";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getUserOrders } from "@/services/allOrders.service";
import { useParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function OrderDetailsPage() {
  const params = useParams();
  const orderId = Array.isArray(params?.orderId)
    ? params.orderId[0]
    : params?.orderId;
  const [order, setOrder] = useState<IOrderResponse | null>(null);

  useEffect(() => {
    async function getOrderDetails() {
      const res = await getUserOrders();
      if (res.success && Array.isArray(res.data)) {
        const foundOrder = res.data.find(
          (o: IOrderResponse) => o._id === orderId
        );
        setOrder(foundOrder || null);
      } else {
        console.error(res.message);
      }
    }
    if (orderId) getOrderDetails();
  }, [orderId]);

  return (
    <section className="py-10 container mx-auto">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {order && (
        <>
          <div className="mb-10 border p-4 rounded space-y-2">
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {order.createdAt
                ? new Date(order.createdAt).toLocaleString()
                : "-"}
            </p>
            <p>
              <span className="font-semibold">Total Price:</span>{" "}
              {order.totalOrderPrice}{" "}
              <span className="text-red-600 font-semibold">EGP</span>
            </p>
            <p>
              <span className="font-semibold">Payment Method:</span>{" "}
              <Badge variant="outline" className="text-md">
                {order.paymentMethodType}
              </Badge>
            </p>
            <p>
              <span className="font-semibold">Paid:</span>{" "}
              {order.isPaid ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Delivered:</span>{" "}
              {order.isDelivered ? "Yes" : "No"}
            </p>
          </div>

          <h2 className="text-xl font-semibold mb-4">Products</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {order.cartItems?.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border p-4 rounded relative"
              >
                <Badge className="text-xs absolute top-2 right-2">
                  {item.product?.category?.name || "No Category"}
                </Badge>
                <Image
                  src={item.product?.imageCover || "/placeholder.png"}
                  alt={item.product?.title || "product"}
                  width={80}
                  height={80}
                  className="rounded object-cover"
                />
                <div>
                  <p className="font-semibold">{item.product?.title}</p>
                  <p>Quantity: {item.count}</p>
                  <p>
                    Price: {item.price}{" "}
                    <span className="font-semibold text-red-600">EGP</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="mt-10">
        <Button asChild>
          <Link href="/allorders">Back to Orders</Link>
        </Button>
      </div>
    </section>
  );
}
