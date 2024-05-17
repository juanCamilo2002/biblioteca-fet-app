import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" }
          });

        const user = await res.json();
        if (!user.data) throw user;

        return user;
      },

    })
  ],
  callbacks: {
    async jwt({ token, user }) {

      if (user) {
        token.accessToken = user.data.token;
        token.accessTokenExpires = Date.now() + 3600 * 1000; 
        token.user = user;
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return null;
    },
    async session({ session, token }) {

      if (!token) {
        return null;
      }

      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/login",
    callbackUrl: "/dashboard",

  },
  session: {
    maxAge: 60 * 60,
    revalidate: 60 * 60,
  }
});

export { handler as GET, handler as POST }