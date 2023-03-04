import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const orderSchema = new Schema({
  user: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
  cart: {
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
    item: [
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
  address: {
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
