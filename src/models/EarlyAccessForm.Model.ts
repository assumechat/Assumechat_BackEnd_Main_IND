import mongoose from "mongoose";
const EarlyAccessFormSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    whichIIT: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.EarlyAccessForm ||
  mongoose.model("EarlyAccessForm", EarlyAccessFormSchema);
