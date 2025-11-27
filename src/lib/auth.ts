import { NextAuthOptions } from "next-auth";
import CredentialsProvider  from "next-auth/providers/credentials";

const users =[
    {
        id:'1',
        email:'test@test.com',
        password:"password123",
        name:"Тестовый пользователь"
    }
];

export const authOptions:NextAuthOptions ={
    providers:[
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email:{label:"Email",type:'email'},
                password:{label: "Пароль", type: "password"}
            },
            async authorize(credentials){
                if(!credentials?.email || !credentials?.password){
                    return null
                }
                const user = users.find(u=>u.email===credentials.email)
                if(user && user.password===credentials.password){
                    return {
                        id:user.id,
                        email:user.email,
                        name:user.name
                    }
                }
                return null
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn:"/auth/signin",
    },
    callbacks:{
        async session({session,token}){
            if(token && session.user){
                session.user.id = token.sub!;
            }
            return session
        }
    }

}