import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "257345838182-6adr5jeem0pct3f5pjd5shj6gik1svn2.apps.googleusercontent.com",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "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"
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
    // pages: {
    //     signin: "/login",
    // },
    secret: process.env.JWT_SECRET,
    debug: true,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }