import { postBlog } from "../services/user";

export default function handler(req,res){

    if (req.method!=="POST") {
        res.status(400).send()
            
        }

        const {blogTittle,blogDiscription,email,date,day,month,year}=req.body;


        postBlog(blogTittle,blogDiscription,email,date,day,month,year)
        res.status(200).send();

}


