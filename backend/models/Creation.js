import mongoose from "mongoose";

const creationSchema = new mongoose.Schema(
  {
    type: String,
    content: String,
    userId: String, // 👈 ADD THIS (MOST IMPORTANT)
  },
  {
    timestamps: true, // 👈 auto createdAt + updatedAt
  }
);

export default mongoose.model("Creation", creationSchema);