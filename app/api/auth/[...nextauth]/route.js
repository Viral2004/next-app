"use server"
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/db/connectDb';
import SignUp from '@/model/SignUp';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          const user = await SignUp.findOne({ email: credentials.email });
          if (user && user.password === credentials.password) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async session({ session, user, token }) {
      try {
        if (user) {
          session.user = user;
        }
        return session;
      } catch (error) {
        console.error('Session callback error:', error);
        return Promise.reject(new Error('Failed to retrieve session'));
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/auth/error', // Redirect to a custom error page (optional)
  },
});

export { handler as GET, handler as POST };
