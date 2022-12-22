const mongoose = require("mongoose");

const userDetailsScehma = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, unique: true, required: true },
    password: String,
    phone: { type: Number },
    Age: Number,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    pic: {
      type: String,
      required: true,
      default: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
    },
    mgCollection: {
      type: Array,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "member"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userDetailsScehma);

export default User;
