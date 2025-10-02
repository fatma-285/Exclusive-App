"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { getUserOrders } from "@/services/allOrders.service";
import { IOrderResponse } from "@/interfaces/orders.interface";
import Image from "next/image";

export default function AllOrdersPage() {
  const [ordersDetails, setOrdersDetails] = useState<IOrderResponse[] | []>([]);
  console.log("orders details", ordersDetails);

  async function getOrdersDetails() {
    const res = await getUserOrders();
    if (res.success && Array.isArray(res.data)) {
      setOrdersDetails(res.data);
    } else {
      setOrdersDetails([]);
      console.error(res.message);
    }
  }

  useEffect(() => {
    getOrdersDetails();
  }, []);

  return (
    <section className="py-10">
      <div className="container mx-auto">
        <h1 className="text-2xl font-semibold mb-8 ">All Orders</h1>
        {ordersDetails && ordersDetails.length > 0 ? (
          <>
            <section>
              <Table className="mb-20">
                <TableHeader>
                  <TableRow>
                    <TableHead>Order</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ordersDetails.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="flex items-center flex-col md:flex-row gap-2">
                        <Image
                          src={order.cartItems[0]?.product.imageCover}
                          alt={order.cartItems[0]?.product.title}
                          width={50}
                          height={50}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <span>
                          {order.cartItems[0]?.product.title.slice(0, 12)}...
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {order.totalOrderPrice}{" "}
                        <span className="text-sm text-red-600">EGP</span>
                      </TableCell>
                      <TableCell>{order.paymentMethodType}</TableCell>
                      <TableCell>
                        {order.isDelivered ? "Delivered" : "Not Delivered"}
                      </TableCell>
                      <TableCell>
                        <Button variant={"destructive"} asChild>
                          <Link href={`/allorders/${order._id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="flex justify-center items-center">
                <Button variant={"outline"}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            </section>
          </>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold "> No Orders Found</span>
            <Button variant={"destructive"} asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
