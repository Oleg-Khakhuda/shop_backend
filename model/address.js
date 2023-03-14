import mongoose from "mongoose";
const { Schema, SchemaTypes, model } = mongoose;

const AddressSchema = new Schema({
  city: {
    type: String,
    require: true,
  },
  street: {
    type: String,
    require: true,
  },
});

const Address = model("address", AddressSchema);

export default Address;
