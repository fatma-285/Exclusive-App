import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions: NextAuthOptions = {
  //providers mean where we get our data from like signin with google or facebook
  providers: [
    // credentialsProvider means we get our data from the user like email and password and we send it to the server
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { name: "email", type: "email", placeholder: "email" },
        password: {
          name: "password",
          type: "password",
          placeholder: "password",
        },
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || "something went wrong");
          }
          const decoded = JSON.parse(atob(data.token.split(".")[1]));
          return {
            id: decoded.id,
            user: data.user,
            token: data.token,
          };
        } catch (error) {
          console.log(error);
          throw new Error((error as Error).message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user.user;
        token.token = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
