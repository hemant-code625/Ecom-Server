import mongoose, { Schema } from "mongoose";


const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String},
  picture: { type: String },
  googleId: { type: Number },
  role: { type: String, default: "user" },
  addresses: { type:[Schema.Types.Mixed]},
  name: { type: String, required: true },
  orders: { type: [Schema.Types.Mixed] },
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const User =  mongoose.model("User", userSchema);
export default User;

