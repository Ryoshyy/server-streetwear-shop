import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
  },
  count: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Product", productSchema);
