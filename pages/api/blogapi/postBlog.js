import { postBlog } from "../services/user";

export default function handler(req,res){

    if (req.method!=="POST") {
        res.status(400).send()
            
        }

        const {blogTittle,blogDiscription,email,date}=req.body;


        postBlog(blogTittle,blogDiscription,email,date)
}


