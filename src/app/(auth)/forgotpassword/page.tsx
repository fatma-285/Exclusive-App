"use client";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { handleForgotPassword } from "@/services/forgotPassword.service";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const Router = useRouter();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await handleForgotPassword(email);
      if (res.success) {
        toast.success(res.message, { position: "top-center" });
        Router.push("/verifycode");
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <section className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Forgot Password ?
        </h1>
        <p className="text-center text-md mb-6">
          We will send you a verification code
        </p>

        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            placeholder="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="mb-4" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
          <p className="text-center">
            remembered your password?{" "}
            <span className="text-sm underline">
              <Link href="/login">Back To Login</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
