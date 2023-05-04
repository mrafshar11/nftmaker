import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple"

export default NextAuth({
  // secret: process.env.SECRET,
  providers: [
    // OAuth authentication providers
    AppleProvider({
      clientId: process.env.APPLE_ID,
      clientSecret: process.env.APPLE_SECRET,
    }),
    GoogleProvider({
      // clientId: '826890169119-s95vav0oifh21b2ksf35mdtk1psublj9.apps.googleusercontent.com',
      // clientId: '719835688215-8nrdo2r7av9ui321irvqtj7ff0rhur3d.apps.googleusercontent.com',
      clientId: process.env.GOOGLE_ID,
      // clientSecret: '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',
      // clientSecret: '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',
      clientSecret: process.env.GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
      authorization: {
        params: { scope: "openid email profile " }
      },
      idToken: true,
      checks: ["pkce", "state"],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
      id: "google",
      name: "Google",
      type: "oauth",
    })
  ],
  theme: {
    colorScheme: "light",
  },
  callbacks: {
    async jwt({ token }) {
      token.userRole = "admin"
      return token
    },
  },
})