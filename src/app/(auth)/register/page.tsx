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
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { useRouter } from "next/navigation";
import {
  formState,
  registerFormSchema,
  registerSchema,
} from "@/schema/register.schema";
import { handleRegister } from "@/services/register.service";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

export default function RegisterPage() {
  const [action, formAction] = useActionState(handleRegister, formState);
  const router = useRouter();
  const form = useForm<registerSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
  });
  console.log(action);
  useEffect(() => {
    if (action) {
      if (action.success && action.message) {
        toast.success(action.message, { position: "top-center" });
        router.push("/login");
      }
      if (!action.success && action.message) {
        toast.error(action.message, {
          position: "top-center",
        });
      }
    }
  }, [action, router]);

  // async function onSubmit(values: registerSchema) {
  //   console.log(values);
  //   //TODO - handle Register
  //   const data = await handleRegister(values);
  //   console.log(data);
  // }

  return (
    <section className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
        <Form {...form}>
          {/* <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8"> */}
          <form action={formAction} className="space-y-8">
            {/* ************Name******** */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage>{action?.error?.name?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* ************Email******** */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="username@gmail.com"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.email?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* **********Password********* */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      {...field}
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.password?.[0]}</FormMessage>
                </FormItem>
              )}
            />
            {/* **********Re Password********* */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*******"
                      {...field}
                      type="password"
                      autoComplete="off"
                    />
                  </FormControl>
                  <FormMessage>{action?.error?.rePassword?.[0]}</FormMessage>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </section>
  );
}
