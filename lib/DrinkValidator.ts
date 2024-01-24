import * as z from "zod";

export const drinkFormSchema = z.object({
  title: z.string().min(3, {
    message: "Drink name must be at least 3 characters.",
  }),
  memberName: z
    .string()
    .min(3, {
      message: " Member Name must be at least 3 characters.",
    })
    .max(400, {
      message: " Member Name must be less than 400 characters.",
    }),
  location: z.string().min(3, {
    message: "Bar location must be at least 3 characters.",
  }),
  size: z.string().min(1, {
    message: "Size must be at least 1 character.",
  }),
  categoryId: z.string(),
  dateAdded: z.date(),
});
