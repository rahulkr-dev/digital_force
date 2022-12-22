import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";

export default async function registerUser(req, res) {
  const { name, email } = req.body;

  console.log("Connecting To DB ");
  await connectMongo();
  console.log("Connected To DB ");
  console.log("Createing New User To DB ");

  const userExists = await User.findOne({ email });

  try {
    if (userExists) {
      return res.json({ error: true, message: "User_Exists" });
    }
    // throw new Error("User Alreay Exists");
    const user = await User.create(req.body);
    console.log("user-registered:", user);

    if (user) {
      res.status(201).send(user);
    } else {
      res.status(400);
      res.send("Error in creating user");
    }
  } catch (error) {
    res.send({ error: true, message: error.message });
  }
}
