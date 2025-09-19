"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import Image from "next/image";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import { Input } from "../../../components/ui/input";
import { useCart } from "../../../context/cartContext";
import {
  removeAllCart,
  removeFromCart,
  updateItemQty,
} from "../../../services/cart.service";
import { toast } from "sonner";
import { Badge } from "../../../components/ui/badge";
import { X } from "lucide-react";
export default function CartPage() {
  const { cartDetails, setCartDetails } = useCart();
  async function removeUserCart() {
    const res = await removeAllCart();
    if (res.message === "success") {
      toast.success("Cart Deleted Successfully", {
        position: "top-center",
      });
      setCartDetails(null);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  async function removeCartItem(productId: string) {
    const res = await removeFromCart(productId);

    if (res.message === "success") {
      setCartDetails(res.data);
      toast.success("Product Deleted Successfully", {
        position: "top-center",
      });
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  async function updateProductQty(productId: string, count: number) {
    const res = await updateItemQty(productId, count);
    if (res.message === "success") {
      toast.success("Product Quantity Updated Successfully", {
        position: "top-center",
      });
      setCartDetails(res.data);
    } else {
      toast.error(res.message, {
        position: "top-center",
      });
    }
  }
  return (
    <section className="py-20">
      <div className="container mx-auto">
        {cartDetails && cartDetails.numOfCartItems > 0 ? (
          <>
            <section className="mb-20">
              <Table className="mb-6">
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartDetails.data.products.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-5 relative">
                          <Badge
                            className="absolute -top-0.5 -start-0.5 h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
                            variant="destructive"
                            onClick={() => removeCartItem(product.product._id)}
                          >
                            <X className="size-4" />
                          </Badge>
                          <Image
                            src={product.product.imageCover}
                            alt={product.product.title}
                            width={54}
                            height={54}
                          />
                          <h2>{product.product.title}</h2>
                        </div>
                      </TableCell>
                      <TableCell>
                        {product.price}
                        <span className="font-semibold text-red-500"> EGP</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-4">
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              updateProductQty(
                                product.product._id,
                                product.count - 1
                              )
                            }
                          >
                            -
                          </Button>
                          <span>{product.count}</span>
                          <Button
                            variant={"outline"}
                            onClick={() =>
                              updateProductQty(
                                product.product._id,
                                product.count + 1
                              )
                            }
                          >
                            +
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {product.price * product.count}{" "}
                        <span className="font-semibold text-red-500"> EGP</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between">
                <Button variant={"outline"}>
                  <Link href="/products">Continue Shopping</Link>
                </Button>
                <Button variant={"destructive"} onClick={removeUserCart}>
                  Remove All Products
                </Button>
              </div>
            </section>
            <section className="flex justify-between">
              <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-12 items-center">
                <div className="col-span-1 grid grid-cols-2 md:grid-cols-3 gap-2">
                  <Input className="col-span-2" placeholder="Coupon Code" />
                  <Button className="col-span-1" variant={"destructive"}>
                    Apply Cupon
                  </Button>
                </div>
                <div className="col-span-1  py-8 px-6 border border-gray-900">
                  <h3 className="font-semibold text-xl mb-6">Cart Total</h3>
                  <ul className="divide-y divide-gray-900">
                    <li className="py-6 flex justify-between">
                      <span>Subtotal</span>
                      <span>
                        {cartDetails.data.totalCartPrice}{" "}
                        <span className="font-semibold text-red-500"> EGP</span>
                      </span>
                    </li>
                    <li className="py-6 flex justify-between">
                      <span>Shipping</span>
                      <span>free</span>
                    </li>
                    <li className="py-6 flex justify-between">
                      <span>Total</span>
                      <span>
                        {cartDetails.data.totalCartPrice}{" "}
                        <span className="font-semibold text-red-500"> EGP</span>
                      </span>
                    </li>
                  </ul>
                  <div className="flex justify-center">
                    <Button variant={"destructive"} asChild>
                      <Link href="/checkout">Proceed to Checkout</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="py-40 flex flex-col items-center justify-center gap-4">
            <span className="text-2xl font-semibold "> Your Cart is Empty</span>
            <Button variant={"destructive"} asChild>
              <Link href="/products">Shop Now</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
