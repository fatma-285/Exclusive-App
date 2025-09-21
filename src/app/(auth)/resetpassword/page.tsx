"use client";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { handleResetPassword } from "@/services/resetPassword.service";
import { Label } from "@radix-ui/react-label";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isPending, startTransition] = useTransition();
  const Router = useRouter();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await handleResetPassword(email, newPassword);
      if (res.success) {
        toast.success(res.message || "Password Reset Successfully", {
          position: "top-center",
        });
        Router.push("/login");
      } else {
        toast.error(res.message, { position: "top-center" });
      }
    });
  }

  return (
    <section className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Reset Password
        </h1>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <Label>Email</Label>
            <Input
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>New Password</Label>
            <Input
              placeholder="Enter Your New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="mb-4" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : "Submit"}
          </Button>

          <p className="text-sm underline text-center">
            <Link href="/login">Back To Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
