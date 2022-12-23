import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "HACKATHON";

export default async function loginUser(req, res) {
  const { email, password } = req.body;

  console.log("Connecting To DB ");
  await connectMongo();
  console.log("Connected To DB ");
  console.log("Fetcing  User From DB ");

  const userExists = await User.findOne({ email });
  console.log("userExists:", userExists);
  if (!userExists) {
    return res.json({ error: true, message: "User Not found" });
  } else {
    try {
      if (await bcrypt.compare(password, userExists.password)) {
        const token = jwt.sign({ email: userExists.email, name: userExists.firstName, id: userExists._id }, JWT_SECRET);

        return res.json({ error: false, message: "Login Success", token, data: {userExists } });

        // throw new Error("User Alreay Exists");
      } else {
        return res.json({ error: true, message: "Wrong Password" });
      }
    } catch (error) {
      res.send({ error: true, message: error.message });
    }
  }
}
