import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github"
import { AppSettings } from '../../../functions/AppSettings';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: AppSettings.current.githubId,
            clientSecret: AppSettings.current.githubSecret,
        }),
        // ...add more providers here
    ],
    // Don't forget to change these for Production!
    // Environment variable: NEXTAUTH_SECRET
    // Environment variable: NEXTAUTH_URL
    secret: AppSettings.current.nextAuthSecret
});
