import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const cartSchema = new Schema({
  items: [
    {
      product: {
        type: SchemaTypes.ObjectId,
        ref: "product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        require: true,
      },
      title: {
        type: String,
      },
      productCode: {
        type: String,
      },
    },
  ],
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
    required: false,
  },
  totalQuantity: {
    type: Number,
    default: 0,
    require: true,
  },
  totalPrice: {
    type: Number,
    default: 0,
    require: true,
  },
});

const Cart = model("cart", cartSchema);

export default Cart;
