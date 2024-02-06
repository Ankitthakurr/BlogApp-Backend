import mongoose from "mongoose";

export const ConnectToMONGODB = async () => {
  try {
   const response =  await mongoose.connect(process.env.URI);
    console.log("connect");
  } catch (error) {
    console.log(error);
  }
};
