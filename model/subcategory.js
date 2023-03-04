import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const subcategorySchema = new Schema(
  {
    title: {
      type: String,
      require: true,
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

const Subcategory = model("category", subcategorySchema);

export default Subcategory;
