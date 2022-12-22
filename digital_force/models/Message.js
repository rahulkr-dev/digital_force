import {Schema,model} from "mongoose"
import mongoose from "mongoose"

const MessageSchema =new Schema(
  {
    message: {
      text: { type: String, required: true },
    },
    users: Array,
    sender: {
      type:Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// const Message = model("Messages", MessageSchema);
const Message = mongoose.models.Messages || mongoose.model("Messages", MessageSchema);

export default Message
// module.exports = model("Messages", MessageSchema);