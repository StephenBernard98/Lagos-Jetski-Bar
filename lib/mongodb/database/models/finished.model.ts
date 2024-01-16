import { Document, Schema, models, model } from "mongoose";

export interface IFinishedDrink extends Document {
  _id: string;
  title: string;
  memberName?: string;
  createdAt: Date;
  dateAdded: Date;
  category: { _id: string; name: string };
  organizer: {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
  };
}

const FinishedDrinkSchema = new Schema({
  title: { type: String, required: true },
  memberName: { type: String },
  createdAt: { type: Date, default: Date.now },
  dateAdded: { type: Date, default: Date.now },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const FinishedDrink = models.FinishedDrink || model("FinishedDrink", FinishedDrinkSchema);

export default FinishedDrink;
