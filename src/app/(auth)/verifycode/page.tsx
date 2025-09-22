"use client";
import { handleVerificationCode } from "@/services/verifyCode.service";
import React, { useState, useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyCodePage() {
  const [isPending, startTransition] = useTransition();
  const [code, setCode] = useState("");
  const Router = useRouter();
  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const res = await handleVerificationCode(code);
      if (res.success) {
        toast.success(res.message || "Verification Code Sent Successfully", {
          position: "top-center",
        });
        Router.push("/resetpassword");
      } else {
        toast.error(res.message || "Something went wrong", {
          position: "top-center",
        });
      }
    });
  }
  return (
    <section className="py-12">
      <div className="max-w-sm mx-auto">
        <h1 className="text-2xl font-semibold mb-8 text-center">
          Verification Code
        </h1>
        <form onSubmit={onSubmit} className="space-y-6">
          <Input
            placeholder="Enter Your Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <Button type="submit" className="mb-4" disabled={isPending}>
            {isPending ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
          <p className="text-center">
            don`t receive code?{" "}
            <span className="text-sm underline">
              <Link href="/forgotpassword">Back To Forgot Password</Link>
            </span>
          </p>
        </form>
      </div>
    </section>
  );
}
