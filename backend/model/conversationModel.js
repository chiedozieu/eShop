import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    groupTitle: {
        type: String,
    },
    members: {
        type: Array,
    },
    lastMessage: {
        type: String,
    },
    lastMessageId: {
        type: String,
    },
    productImage: {     
        type: String,
      },
      productName: {     
        type: String,
      },
      productPrice: {     
        type: String,
      },

   
}, {timestamps: true}
);

const conversationModel = mongoose.model("Conversation", conversationSchema);

export default conversationModel;