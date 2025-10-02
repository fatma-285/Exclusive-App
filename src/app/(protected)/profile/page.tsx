"use client";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  profileSchema,
  profileDataFormSchema,
  formState,
} from "@/schema/profile.schema";
import { handleUpdateMe } from "@/services/updateMe.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ProfilePage() {
  const [action, formAction] = useActionState(handleUpdateMe, formState);
  const router = useRouter();
  const form = useForm<profileSchema>({
    resolver: zodResolver(profileDataFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  useEffect(() => {
    if (action.success && action.message) {
      toast.success(action.message, { position: "top-center" });
      router.push("/login");
    }

    if (!action.success && action.message) {
      toast.error(action.message, { position: "top-center" });
    }
  }, [action, router]);

  return (
    <>
      <section className="py-12">
        <div className="max-w-sm mx-auto">
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Update Profile Info
          </h1>
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
    </>
  );
}
