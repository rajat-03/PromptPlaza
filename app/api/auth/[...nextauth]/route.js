import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/utils/database";
import { User } from "@/models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      //to get current user
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      try {
        await connectDB();

        //check if user already exists
        const existingUser = await User.findOne({ email: profile.email });

        //if not, create new user
        if (!existingUser) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        console.log("User signed in successfully!");
        console.log("User: ", profile.email);
        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // If the URL starts with "/", concatenate the base URL and the URL
      if (url.startsWith("/")) {
      return `${baseUrl}${url}`;
      }
      // If the URL's origin matches the base URL, return the URL as is
      else if (new URL(url).origin === baseUrl) {
      return url;
      }
      // Otherwise, return the base URL
      return baseUrl;
    }
  },
});

export { handler as GET, handler as POST };
