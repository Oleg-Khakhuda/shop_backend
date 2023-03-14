import mongoose from "mongoose";
import bcrypt from "bcryptjs";
// import { randomUUID } from "crypto";
// import gravatar from "gravatar";
import { Role } from "../lib/constants";

const { Schema, SchemaTypes, model } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      default: "Guest",
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate(value) {
        const re = /\S+@\S+\.\S+/;
        return re.test(String(value).trim().toLowerCase());
      },
    },
    role: {
      type: String,
      enum: {
        values: Object.values(Role),
        message: "Role is not allowed",
      },
      default: Role.USER,
    },
    address: [
      {
        type: SchemaTypes.ObjectId,
        ref: "address",
      },
    ],
    cart: [
      {
        product: {
          type: SchemaTypes.ObjectId,
          ref: "product",
        },
        unit: {
          type: Number,
          require: true,
        },
      },
    ],
    orders: [
      {
        type: SchemaTypes.ObjectId,
        ref: "order",
      },
    ],
    token: {
      type: String,
      default: null,
    },
    // avatarUrl: {
    //   type: String,
    //   default: function () {
    //     return gravatar.url(this.email, { s: "250" }, true);
    //   },
    // },
    // idAvatarCloud: {
    //   type: String,
    //   default: null,
    // },
    // verify: {
    //   type: Boolean,
    //   default: false,
    // },
    // verificationToken: {
    //   type: String,
    //   required: [true, "Verify token is required"],
    //   default: function () {
    //     return randomUUID();
    //   },
    // },
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        return ret;
      },
    },
    toObject: { virtuals: true },
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(6);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("user", userSchema);

export default User;
