import mongoose from "mongoose";

const connectDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((data) => {
      console.log(`MongoDB connection established: ${data.connection.host}`);
    })
    .catch((error) => {
      console.error(`MongoDB connection error: ${error.message}`);
    });
};

export default connectDatabase;
