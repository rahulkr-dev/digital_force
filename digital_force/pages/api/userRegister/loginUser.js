import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";

export default async function loginUser(req, res) {
  const { email, password } = req.body;

  console.log("Connecting To DB ");
  await connectMongo();
  console.log("Connected To DB ");
  console.log("Fetcing  User From DB ");

  const userExists = await User.findOne({ email });
  if (!userExists) {
    return res.json({ error: true, message: "User Not found" });
  }

  try {
    if (userExists && userExists.password === password) {
      return res.json({ error: false, message: "Login Success",id:userExists._id });     // changed only

      // throw new Error("User Alreay Exists");
    } else {
      return res.json({ error: true, message: "User not found" });
    }
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
}
