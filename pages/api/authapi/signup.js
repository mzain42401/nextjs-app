import { saveUserData } from "../services/user"



export default async function handler(req, res) {

    if (req.method!=="POST") {
    res.status(400).send()
        
    }

    const {firstName,lastName,email,password}=req.body
try{
   await saveUserData(firstName,lastName,email,password)
    res.status(200).send()

}

catch (e) {
    console.log(e);
    res.status(401).json({ error:"user already exist"})
  }
  

  }