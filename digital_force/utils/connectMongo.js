const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const URI = "mongodb+srv://gowtham:chokkalingam@cluster0.nziol8j.mongodb.net/Digital_Force?retryWrites=true&w=majority";

const connectDB = async () => mongoose.connect(URI);
export default connectDB;

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
