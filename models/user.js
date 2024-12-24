import { Schema, model } from "mongoose";
import { createHmac, randomBytes } from "crypto";

const rolesArray = ["USER", "ADMIN"];

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
    profileImageUrl: { type: String, default: "images/default-profile.png" },
    role: { type: String, enum: rolesArray, default: "USER" },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return;

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(this.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

const User = model("User", userSchema);

export default User;
