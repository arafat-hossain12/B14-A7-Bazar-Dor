import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const g = globalThis as unknown as { _mongo?: MongoClient };
const client = g._mongo ?? new MongoClient(process.env.MONGODB_URI as string);
if (process.env.NODE_ENV !== "production") g._mongo = client;
const db = client.db(process.env.MONGODB_DB || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github", "email-password"],
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});