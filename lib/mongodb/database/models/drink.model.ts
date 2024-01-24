import { Document, Schema, models, model } from "mongoose";

export interface IDrink extends Document {
  _id: string;
  title: string;
  memberName?: string;
  location?: string;
  size?: string;
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

const DrinkSchema = new Schema({
  title: { type: String, required: true },
  memberName: { type: String },
  createdAt: { type: Date, default: Date.now },
  dateAdded: { type: Date, default: Date.now },
  location: { type: String },
  size: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Drink = models.Drink || model("Drink", DrinkSchema);


export default Drink;