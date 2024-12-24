import mongoose from "mongoose";

export const ConnectToMongoDB = (url) => {
  mongoose
    .connect(url)
    .then((data) =>
      console.log(`Connected to MongoDB with ${data.connection.host}`)
    )
    .catch((error) =>
      console.log(`Error connecting to MongoDB : ${error.message}`)
    );
};
