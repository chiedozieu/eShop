import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter event product name!"],
  },
  description: {
    type: String,
    required: [true, "Please enter event product description!"],
  },
  category: {
    type: String,
    required: [true, "Please select event product category!"],
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Running',
  },

  tags: {
    type: String,
  },
  originalPrice: {
    type: Number,
  },

  discountPrice: {
    type: Number,
    required: [true, "Please enter event product price!"],
  },

  stock: {
    type: Number,
  },
  images: [
    {
        type: String,
        required: [true, "Please upload image"],
    }
  ],
  shopId: {
    type: String,
    required: true, 
  },
  shop: {
    type: Object,
    required: true, 
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const eventModel = mongoose.model("Event", eventSchema);

export default eventModel;
