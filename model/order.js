import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const orderSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
  products: [
    {
      product: {
        type: SchemaTypes.ObjectId,
        ref: "product",
        require: true,
      },
      // quantity: {
      //   type: Number,
      //   require: true,
      //   default: 1,
      // },
    },
  ],
  // total: {
  //   type: Number,
  //   required: true,
  // },
  phone: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  middleName: {
    type: String,
    require: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: "pending",
  },
});

const Order = model("order", orderSchema);

export default Order;
