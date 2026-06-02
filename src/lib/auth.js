import dns from "node:dns";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { jwt } from "better-auth/plugins";

const uri = process.env.MONGODB_URI;
if (!uri) {
    throw new Error("MONGODB_URI environment variable is required.");
}

if (uri.startsWith("mongodb+srv://")) {
    dns.setServers(["8.8.8.8", "8.8.4.4"]);
}

const client = new MongoClient(uri, {
    connectTimeoutMS: 10000,
    serverSelectionTimeoutMS: 10000,
});
const db = client.db("wonderlast");

export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    accountLinking: {
        enabled: true,
        autoLink: true,
        trustedProviders: ["google", "github"],
    },
    advanced: {
        useSecureCookies: process.env.NODE_ENV === "production",
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            //max 7 days
            maxAge: 7 * 24 * 60 * 60
        },
    },
    plugins: [
        jwt()
    ]
});