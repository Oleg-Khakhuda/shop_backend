import mongoose from "mongoose";
const { Schema, model } = mongoose;

const MainCategorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
    },
    image: { type: String },
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

const MainCategory = model("mainCategory", MainCategorySchema);

export default MainCategory;
