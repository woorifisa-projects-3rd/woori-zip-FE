import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import CredentialsProvider from 'next-auth/providers/credentials';
import { reissueToken, signIn as signInFromBackend, wooriSignIn } from '@/app/api/authApi';

// const refreshAccessToken = async (token) => {
//   const { accessToken, refreshToken } = await reissueToken(token.refreshToken);

//   if (accessToken && refreshToken) {
//     return {
//       ...token,
//       accessToken,
//       refreshToken,
//       expires_at: Date.now() + (2505600 * 1000),
//     };
//   }

//   return {
//     ...token,
//     error: 'RefreshAccessTokenError',
//   };
// };

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        username: { label: '아이디', type: 'username', placeholder: '아이디를 입력해주세요.' },
        password: { label: '비밀번호', type: 'password', placeholder: '비밀번호를 입력해주세요.' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null;

        try {
          const response = await signInFromBackend({
            username: credentials.username,
            password: credentials.password,
          });

          const { accessToken } = response;

          return {
            id: credentials.username,
            username: credentials.username,
            accessToken,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
    // {
    //   id: "oauth-woori",
    //   async authorize(code) {
    //     try {
    //       console.log('woori sign in 들어가기', code)
    //       const response = await wooriSignIn(code);
    //       const { accessToken, name } = response;
    //       console.log('profile', accessToken, name)
    //       return { accessToken, name };
    //     } catch (error) {
    //       console.error(`Auth error with code ${code}:`, error);
    //       return null;
    //     }
    //   },
    //   profile({accessToken, name}) {
    //     return {
    //       id: name,
    //       username: name,
    //       accessToken,
    //     };
    //   },
    // },
    CredentialsProvider({
      id: "oauth-woori",
      async authorize({ code }) {
        console.log('authorize 함수 호출됨, code:', code);
        try {
          const response = await wooriSignIn(code);
          const { accessToken, name } = response;
          console.log('profile', accessToken, name);
          return { accessToken, name };
        } catch (error) {
          console.error(`Auth error with code ${code}:`, error);
          return null;
        }
      },
      profile(accessToken, name) {
        return {
          id: name,
          username: name,
          accessToken,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          accessToken: user.accessToken,
          expires_at: Date.now() + (2505600 * 1000),
          user,
        };
      }

      if (Date.now() < token.expires_at) {
        return token;
      }

      return {
        ...token,
        error: 'RefreshAccessTokenError',
      };
      // return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken;
        session.user.expires_at = token.expires_at;
        session.error = token.error;
      }
      return session;
    },
    async redirect() {
      // 사용자가 로그인 성공 후 리디렉트할 URL을 커스터마이징할 수 있습니다.
      return '/';  // 예를 들어, 대시보드로 리디렉션
    },
  },
  pages: {
    signIn: '/',
  },
  
});