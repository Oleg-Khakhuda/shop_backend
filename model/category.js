import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const categorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: { type: String },
    mainCategory: {
      type: SchemaTypes.ObjectId,
      ref: "mainCategory",
      required: true,
    },
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

const Category = model("category", categorySchema);

export default Category;
