import * as z from "zod";

export const drinkFormSchema = z.object({
  title: z.string().min(3, {
    message: "Drink name must be at least 3 characters.",
  }),
  memberName: z
    .string()
    .min(5, {
      message: " Member Name must be at least 5 characters.",
    })
    .max(400, {
      message: " Member Name must be less than 400 characters.",
    }),
  categoryId: z.string(),
  dateAdded: z.date(),
});
