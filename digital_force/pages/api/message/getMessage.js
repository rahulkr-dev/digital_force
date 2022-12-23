import Message from "../../../models/Message";
import connectMongo from "../../../utils/connectMongo";

export default async function getMessage(req, res) {
    try{
        const { from, to } = req.body;
        await connectMongo();
        const totalMsg =await Message.find({users:{$all:[from,to]}}).sort({updatedAt:1});

        let returnMsg = totalMsg.map((item)=>{
            return{
                self:item.sender ==from,
                message:item.message.text
            }
        })

        return res.status(200).send(returnMsg)

    }catch(err){
       return res.status(500).send(err.message)
    }

}