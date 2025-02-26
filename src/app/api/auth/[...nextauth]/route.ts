import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

const authOptions = {
  pages: {
    signIn: "/",
  },
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        if (!user) {
          throw new Error("Usuário não encontrado!");
        }

        // Comparando a senha
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Senha incorreta!");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image:
            user.image ||
            "https://i.pinimg.com/736x/7f/e4/25/7fe425baaa808391cd7e24f091a9967b.jpg",
        };
      },
    }),
  ],
};

// Criação do handler do NextAuth sem tipagem explícita
const handler = NextAuth(authOptions);

// Exportando o handler para as rotas GET e POST
export { handler as GET, handler as POST };
