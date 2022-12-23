import User from "../../models/User";
import connectMongo from "../../utils/connectMongo"

export default async function loginUser(req, res) {
try{
    await connectMongo();
  
    const user = await User.find({});
    if (!user) {
      return res.json({ error: true, message: "User Not found" });
    }
    res.status(200).send(user)
}catch(err){
    res.status(500).send(err.message)
}

}