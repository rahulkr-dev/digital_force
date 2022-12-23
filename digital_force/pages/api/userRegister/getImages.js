import User from "../../../models/User";
import connectMongo from "../../../utils/connectMongo";

export default async function getImages(req, res) {
  const users = await User.find({}, { password: 0 }, { imgCollection: 1 });

  if (!users) {
    return res.json({ error: true, message: "Users Not found" });
  } else {
    try {
      res.send(users);
    } catch (error) {
      res.send({ error: true, message: error.message });
    }
  }
}
