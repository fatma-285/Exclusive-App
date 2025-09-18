import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type loginFormPayload = z.infer<typeof loginFormSchema>;
