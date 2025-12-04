import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const users = [
  {
    id: '1',
    email: 'test@test.com',
    password: "password123",
    name: "Тестовый пользователь"
  }
];

// 1. Явно задаем секретный ключ (обязательно для продакшена, помогает при разработке)
const secret = process.env.NEXTAUTH_SECRET || "your-secret-key-for-development";

export const authOptions: NextAuthOptions = {
  secret: secret, // 👈 Добавляем секрет
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: 'email' },
        password: { label: "Пароль", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Авторизация: нет email или пароля');
          return null;
        }
        const user = users.find(u => u.email === credentials.email);
        if (user && user.password === credentials.password) {
          console.log('Авторизация успешна для:', user.email);
          return {
            id: user.id,
            email: user.email,
            name: user.name
          };
        }
        console.log('Авторизация не удалась для:', credentials.email);
        return null;
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней (опционально)
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      // При первой авторизации добавляем данные пользователя в токен
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Копируем данные из токена в объект сессии
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  // 👇 Важно для разработки на localhost (HTTP, а не HTTPS)
  useSecureCookies: process.env.NODE_ENV === "production",
  cookies: process.env.NODE_ENV === "production" ? undefined : {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false // 👈 Разрешаем insecure cookies для localhost
      }
    }
  }
};