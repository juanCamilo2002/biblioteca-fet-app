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
        async jwt({ account, token, user }) {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session({ session, token }) {
            session.user = token.user; 
            return session;
        },
    },
    pages: {
        signIn: "/login",
        signOut: "/login",
        callbackUrl: "/dashboard",

    },
    session: {
        maxAge: 60 * 60 ,
        revalidate: 60 * 60,
    }
});

export { handler as GET, handler as POST }