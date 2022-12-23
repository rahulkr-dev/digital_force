import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const JWT_SECRET = "HACKATHON";

export default async function getUser(req, res) {
  console.log("Connecting To DB ");
  await connectMongo();
  console.log("Connected To DB ");
  console.log("Fetcing  User From DB ");
  const users = await User.find({});
  if (!users) {
    return res.json({ error: true, message: "Users Not found" });
  } else {
    try {
      return res.send(users);
    } catch (error) {
      res.send({ error: true, message: error.message });
    }
  }
}
