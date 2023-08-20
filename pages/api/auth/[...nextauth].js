import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import { checkByEmail, verifyPassword } from "../services/user";

export const authOptions = {
    session:{
jwt:true
    },

    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: "Credentials",
            async authorize({ email, password }) {
                const user = checkByEmail(email)
                if (!user) {
                    throw new Error("user not found")
                }
                const isvalid=  await verifyPassword(password,user.password)
                if (!isvalid) {
                    throw new Error("wrong password")
                    
                }

                return{email}

            }
        })
    ],
}

export default NextAuth(authOptions)