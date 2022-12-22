import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";
const bcrypt = require("bcryptjs");

export default async function registerUser(req, res) {
  const { firstName, lastName, phone, email, password } = req.body;
  console.log('req.body;:', req.body)

  console.log("Connecting To DB ");
  await connectMongo();
  console.log("Connected To DB ");
  console.log("Createing New User To DB ");

  const encryptedPassword = await bcrypt.hash(password, 10);

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ error: true, message: "User_Exists" });
    }
    const user = await User.create({ ...req.body, password: encryptedPassword });
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
