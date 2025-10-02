import * as z from "zod";

export const profileDataFormSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" }),
  email: z.email({ message: "Please enter a valid email" }),
  phone: z
    .string()
    .nonempty({ message: "Phone is required" })
    .regex(/^(002|\+2)?01[0-25][0-9]{8}$/, {
      message: " Invalid egyptian phone number",
    }),
});
export type profileSchema = z.infer<typeof profileDataFormSchema>;

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
    phone?: string[];
  };
  message: string | null;
};
