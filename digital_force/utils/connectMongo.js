const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// const URI = "mongodb+srv://gowtham:chokkalingam@cluster0.nziol8j.mongodb.net/?retryWrites=true&w=majority";
const URI = "mongodb://localhost:27017/chat_2";
// const URI = process.env.MONGO_URI;

const connectDB = async () => mongoose.connect(URI);
export default connectDB

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     console.log(`MongoDB Connected:${conn.connection.host}`);
//   } catch (error) {
//     console.log("error:", error.message);
//     process.exit();
//   }
// };

// export default connectDB;
