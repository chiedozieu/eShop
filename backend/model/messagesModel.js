import mongoose from "mongoose";

const messagesSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    text: {
      type: String,
    },
    sender: {
      type: String,
    },
    seen: {
      type: Boolean,
      default: false,  
    },
    status: {
      type: String,
      enum: ["sent", "delivered", "seen"],
      default: "sent",  // Default status is 'sent'
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const messagesModel = mongoose.model("Messages", messagesSchema);

export default messagesModel;
