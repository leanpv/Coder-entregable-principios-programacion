import 'dotenv/config'
import mongoose from "mongoose";

const mongoData = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("db connected");
    } catch (error) {
      console.log("error connecting to the database");
    }
  };
 export default mongoData