import User from "../../../models/User";
import connectDB from "../../../utils/connectMongo";
import multer from "multer";
import nextConnect from "next-connect";

export const config = {
  api: {
    bodyParser: false,
  },
};

const DIR = "./public/";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

const handler = nextConnect({
  onError(error, req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});
handler.post(upload.array("imgCollection", 10), async (req, res) => {
  await connectDB();
  const reqFiles = [];
  const url = "http://localhost:3000/";
  for (var i = 0; i < req.files.length; i++) {
    reqFiles.push(url + req.files[i].filename);
  }
  try {
    let user = await User.updateOne(
      { _id: "63a135828cd14013971df898" },
      { $push: { imgCollection: { $each: reqFiles } } }
    );
    console.log("posting images");
    console.log(user);
    res.send({
      message: "Done upload!",
      userCreated: {
        _id: user,
      },
    });
  } catch (error) {
    res.send({
      error: error.message,
    });
  }
});

handler.get(async (req, res) => {
  console.log("geeting images");
  let data;
  try {
    let useresimg = await User.find(
      { _id: "63a135828cd14013971df898" },
      { imgCollection: 1 }
    );
    //console.log(useresimg)
    data = useresimg[0].imgCollection;
    console.log(data);
    res.status(200).send(data);
  } catch (error) {
    res.send(error.message);
  }
});

handler.delete(async (req, res) => {
  console.log(req.headers.img);
  try {
    let delimg = await User.updateOne(
      { _id: "63a135828cd14013971df898" },
      { $pull: { imgCollection: { $in: req.headers.img } } }
    );
    console.log(delimg);
    res.status(201).send("Images Deleted successfully");
  } catch (error) {
    res.status(200).send(error.message);
  }
});

export default handler;
