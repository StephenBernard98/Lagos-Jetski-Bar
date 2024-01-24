"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb/database";
import Drink from "@/lib/mongodb/database/models/drink.model";
import User from "@/lib/mongodb/database/models/user.model";
import Category from "@/lib/mongodb/database/models/category.model";
import { handleError } from "@/lib/utils";
import {
  CreateDrinkParams,
  UpdateDrinkParams,
  DeleteDrinkParams,
  GetAllDrinksParams,
  GetAllDrinksByOwner,
  GetRelatedDrinksByCategoryParams,
  FinishedDrinkParams,
  GetAllFinishedDrinksParams,
} from "@/types";
import FinishedDrink from "../mongodb/database/models/finished.model";

const getCategoryByName = async (name: string) => {
  return Category.findOne({ name: { $regex: name, $options: "i" } });
};

export const populateDrink = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id username",
    })
    .populate({ path: "category", model: Category, select: "_id name" })
};

// CREATE
export async function CreateDrink({ userId, drink, path }: CreateDrinkParams) {
  try {  
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Staff not found");

    const newDrink = await Drink.create({
      ...drink,
      category: drink.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(newDrink));
  } catch (error) {
    console.log(error);
    handleError(error);
  }
}

// CREATE FINISHED DRINK DATABASE
export async function createFinishedDrink({
  userId,
  drink,
  path,
}: FinishedDrinkParams) {
  try {
    await connectToDatabase();
    const findDrinkById = await Drink.findById(drink._id);
    if (!findDrinkById) {
      throw new Error("Unauthorized or drink not found");
    }

    const finishedDrink = await FinishedDrink.create({
      ...drink,
      category: drink.categoryId,
      organizer: userId,
    });
    revalidatePath(path);
    return JSON.parse(JSON.stringify(finishedDrink));
  } catch (error) {
    handleError(error);
  }
}

// GET ALL FINISHED DRINKS
export async function getAllFinishedDrinks({
  query,
  limit = 6,
  page,
  category,
}: GetAllFinishedDrinksParams) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { memberName: { $regex: query, $options: "i" } }
      : {};

    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;
    const conditions = {
      $and: [
        nameCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const drinksQuery = FinishedDrink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drinks = await populateDrink(drinksQuery);
    const drinksCount = await FinishedDrink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drinks)),
      totalPages: Math.ceil(drinksCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

//RESTORE A FINISHED DRINK
export async function restoreFinishedDrink({
  drink,
  path,
}: FinishedDrinkParams) {
  try {
    await connectToDatabase();
    const drinkToBeRestored = await FinishedDrink.findById(drink._id);

    if (!drinkToBeRestored) throw new Error("No such finished drink exists.");
    const restoreDrink = await FinishedDrink.findByIdAndUpdate(
      drink._id,
      { ...drink, category: drink.categoryId },
      { new: true }
    );
    setTimeout(() => {
      revalidatePath(path);
    }, 3000);

    return JSON.parse(JSON.stringify(restoreDrink));
  } catch (error) {
    handleError(error);
  }
}

//GET A FINISHED DRINK BY ID
export async function getFinishedDrinkById(drinkId: string) {
  try {
    await connectToDatabase();

    const finishedDrink = await populateDrink(FinishedDrink.findById(drinkId));

    if (!finishedDrink) throw new Error("Drink not found");

    return JSON.parse(JSON.stringify(finishedDrink));
  } catch (error) {
    handleError(error);
  }
}

// GET ONE DRINK BY ID
export async function getDrinkById(drinkId: string) {
  try {
    await connectToDatabase();

    const drink = await populateDrink(Drink.findById(drinkId));

    if (!drink) throw new Error("Drink not found");

    return JSON.parse(JSON.stringify(drink));
  } catch (error) {
    handleError(error);
  }
}

// UPDATE
export async function updateDrink({ drink, path }: UpdateDrinkParams) {
  try {
    await connectToDatabase();

    const drinkToUpdate = await Drink.findById(drink._id);
    if (!drinkToUpdate) {
      throw new Error("Unauthorized or drink not found");
    }

    const updatedDrink = await Drink.findByIdAndUpdate(
      drink._id,
      { ...drink, category: drink.categoryId },
      { new: true }
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedDrink));
  } catch (error) {
    handleError(error);
  }
}

// DELETE
export async function deletedDrink({ drinkId, path }: DeleteDrinkParams) {
  try {
    await connectToDatabase();

    const deletedDrink = await Drink.findByIdAndDelete(drinkId);
    if (deletedDrink) {
      setTimeout(() => {
        revalidatePath(path);
      }, 3000);
    }
  } catch (error) {
    handleError(error);
  }
}

// REMOVE A FINISHED DRINK
export async function removeFinishedDrink({
  drinkId,
  path,
}: DeleteDrinkParams) {
  try {
    await connectToDatabase();

    const removeFinishedDrink = await FinishedDrink.findByIdAndDelete(drinkId);
    if (removeFinishedDrink) {
      setTimeout(() => {
        revalidatePath(path);
      }, 3000);
    }
  } catch (error) {
    handleError(error);
  }
}

// GET ALL DRINKS
export async function getAllDrinks({
  query,
  drinkQuery,
  limit = 6,
  page,
  category,
}: GetAllDrinksParams) {
  try {
    await connectToDatabase();

    const nameCondition = query
      ? { memberName: { $regex: query, $options: "i" } }
      : {};

    const drinkNameCondition = drinkQuery
      ? { location: { $regex: drinkQuery, $options: "i" } }
      : {};
    
    const categoryCondition = category
      ? await getCategoryByName(category)
      : null;

    const conditions = {
      $and: [
        nameCondition,
        drinkNameCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const drinksQuery = Drink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drinks = await populateDrink(drinksQuery);
    const drinksCount = await Drink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drinks)),
      totalPages: Math.ceil(drinksCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET DRINK BY ORGANIZER
export async function getDrinksByOwner({
  userId,
  limit = 6,
  page,
}: GetAllDrinksByOwner) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const drinksQuery = Drink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drinks = await populateDrink(drinksQuery);
    const drinksCount = await Drink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drinks)),
      totalPages: Math.ceil(drinksCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

// GET RELATED DRINK: DRINK WITH SAME CATEGORY
export async function getRelatedDinksByCategory({
  categoryId,
  drinkId,
  limit = 3,
  page = 1,
}: GetRelatedDrinksByCategoryParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = {
      $and: [{ category: categoryId }, { _id: { $ne: drinkId } }],
    };

    const drinksQuery = Drink.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const drinks = await populateDrink(drinksQuery);
    const drinksCount = await Drink.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(drinks)),
      totalPages: Math.ceil(drinksCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}
