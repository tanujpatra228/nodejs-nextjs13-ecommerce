import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "user@gm.com" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const user = { id: 1, name: "J Smith", email: "user@gm.com" }
                return user;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    },
    strategy: "jwt",
    secret: process.env.JWT_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }