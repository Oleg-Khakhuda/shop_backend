import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for product"],
    },
    quantity: {
      type: Number,
      default: null,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    size: {
      type: Array,
    },
    productImage: {
      type: Array,
      default: null,
    },
    category: {
      type: SchemaTypes.ObjectId,
      ref: "category",
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

productsSchema.virtual("status").get(function () {
  if (this.quantity <= 5) {
    return "Закінчення товару";
  }
  return "Є в наявності";
});

const Products = model("products", productsSchema);

export default Products;
