import mongoose from "mongoose";
const { Schema } = mongoose;

const wishSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  url: String,
  price: String,
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  _id: Schema.Types.ObjectId,
});

export default mongoose.model("Wish", wishSchema);
