"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addressFormSchema, addressFormState } from "@/schema/address.schema";
import type { addressFormType } from "@/schema/address.schema";
import { useActionState, useEffect } from "react";
import { handlePayment } from "@/services/checkout.service";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartDetails, setCartDetails } = useCart();

  const [action, formAction] = useActionState(handlePayment, addressFormState);
  console.log(action);

  const router = useRouter();
  const form = useForm<addressFormType>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      cartId: "",
      details: "",
      city: "",
      phone: "",
      paymentMethod: "cash",
    },
  });
  useEffect(() => {
    if (cartDetails) {
      form.setValue("cartId", cartDetails.cartId);
    }
  }, [cartDetails, form]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (action) {
      if (action.success && action.message) {
        if (form.getValues("paymentMethod") === "cash") {
          setCartDetails(null);
          toast.success(action.message, { position: "top-center" });
          timeout = setTimeout(() => {
            router.push(action.callbackUrl || "/allorders");
          }, 2000);
        } else {
          window.location.href = action.callbackUrl as string;
        }
      } else if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        });
      }
    }
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [action, router, setCartDetails, form]);

  return (
    <section className="py-12">
      <div className="max-w-sm md:max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">CheckOut</h1>
        <Form {...form}>
          <form action={formAction} className="space-y-8">
            {/* ************Address******** */}
            <FormField
              control={form.control}
              name="cartId"
              render={({ field }) => (
                <FormItem hidden>
                  <FormLabel>Cart Id</FormLabel>
                  <FormControl>
                    <Input {...field} value={cartDetails?.cartId} />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* ************Address******** */}
            <FormField
              control={form.control}
              name="details"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Details</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.details?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ************City******** */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="city" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.city?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* **********Phone********* */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="0123456789" {...field} type="tel" />
                  </FormControl>
                  <FormMessage>{action?.error?.phone?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* **********Payment Method********* */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      name={field.name}
                      className="flex flex-col"
                    >
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="cash" />
                        </FormControl>
                        <FormLabel className="font-normal">Cash</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center gap-3">
                        <FormControl>
                          <RadioGroupItem value="card" />
                        </FormControl>
                        <FormLabel className="font-normal">Card</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
