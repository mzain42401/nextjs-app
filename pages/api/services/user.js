import fs from 'fs'
import path from 'path'
import { hash,compare } from 'bcrypt'

const authDataPath = path.join(process.cwd(), "pages", "data", "authdata.json")


export const allData = () => {
    const data = fs.readFileSync(authDataPath)
    return JSON.parse(data)
}


export const checkByEmail = (email) => {
    const data = allData()
    return data.find((element) => {
        return element.email === email
    })
}
export const verifyPassword =async (password,hashpassword) => {
    const vaild=await compare(password,hashpassword)
    return vaild
}

export const saveUserData = async(firstName,lastName,email,password) => {
    const data = allData()
const hashpassword =await hash(password,12)
const user= checkByEmail(email)
if (user) {
    throw new Error ("user already exist")
}
data.push({firstName,lastName,email,password:hashpassword,blogs: []})
fs.writeFileSync(authDataPath,JSON.stringify(data))
   
}


export const postBlog = (blogTittle,blogDiscription,email,date,day,month,year) => {
  
    const user=checkByEmail(email)
    user.blogs.push({blogTittle,blogDiscription,email,date,day,month,year})
    const data = allData()
    const otheruser=data.filter((elemnet)=>{
return elemnet.email!==email
    })



fs.writeFileSync(authDataPath,JSON.stringify([...otheruser,user]))
   
}
