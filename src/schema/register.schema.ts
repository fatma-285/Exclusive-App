import * as z from "zod";

export const registerFormSchema = z
  .object({
    name: z
      .string()
      .nonempty({ message: "Name is required" })
      .min(3, { message: "Name must be at least 3 characters" }),
    email: z.email({ message: "Please enter a valid email" }),
    password: z
      .string()
      .nonempty({ message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    rePassword: z
      .string()
      .nonempty({ message: "rePassword is required" })
      .min(6, { message: "rePassword must be at least 6 characters" }),
    phone: z
      .string()
      .nonempty({ message: "Phone is required" })
      .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
        message: " Invalid egyptian phone number",
      }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Password does not match",
    path: ["rePassword"],
  });

export type registerSchema = z.infer<typeof registerFormSchema>;

export const formState = {
  success: false,
  error: {},
  message: null,
};

export type FormState = {
  success: boolean;
  error: {
    name?: string[];
    email?: string[];
    password?: string[];
    rePassword?: string[];
    phone?: string[];
  };
  message: string | null;
};
