import Message from "../../../models/Message";
import connectMongo from "../../../utils/connectMongo";

export default async function addMessage(req, res) {
    try{
        const { from, to,message } = req.body;
        await connectMongo();
        
        const messageAdded = await Message.create({
          message: { text: message },
          users: [from, to],
          sender: from,
        });
    

        return res.status(200).send({
            res:"message added sucessfully"
        })

    }catch(err){
       return res.status(404).send(err.message)
    }

}