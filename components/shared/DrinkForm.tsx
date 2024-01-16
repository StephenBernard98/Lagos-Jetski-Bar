"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { drinkFormSchema } from "@/lib/DrinkValidator";
import * as z from "zod";
import { drinkDefaultValues } from "@/constants";
import Dropdown from "./Dropdown";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/navigation";
import {
  CreateDrink,
  updateDrink,
  createFinishedDrink,
} from "@/lib/actions/drink.actions";
import { IDrink } from "@/lib/mongodb/database/models/drink.model";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deletedDrink } from "@/lib/actions/drink.actions";
import { usePathname } from "next/navigation";

type DrinkFormProps = {
  userId: string;
  type: "Add" | "Update" | "Clear";
  drink?: IDrink;
  drinkId?: string;
};

const DrinkForm = ({ userId, type, drink, drinkId }: DrinkFormProps) => {
  const pathname = usePathname();
  const initialValues =
    drink && (type === "Update" || type === "Clear")
      ? {
          ...drink,
          dateAdded: new Date(drink.dateAdded),
        }
      : drinkDefaultValues;
  const router = useRouter();

  const form = useForm<z.infer<typeof drinkFormSchema>>({
    resolver: zodResolver(drinkFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof drinkFormSchema>) {
    if (type === "Add") {
      try {
        const newDrink = await CreateDrink({
          drink: { ...values },
          userId,
          path: "/",
        });

        if (newDrink) {
          form.reset();
          toast.success("Drink Added!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push(`/`);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Update") {
      if (!drinkId) {
        router.back();
        return;
      }

      try {
        const updatedDrink = await updateDrink({
          userId,
          drink: { ...values, _id: drinkId },
          path: "/",
        });

        if (updatedDrink) {
          form.reset();
          toast.success("Drink Updated!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push(`/`);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (type === "Clear") {
      if (!drinkId) {
        router.back();
        return;
      }

      try {
        const finishedDrink = await createFinishedDrink({
          userId,
          drink: { ...values, _id: drinkId, organizer: userId },
          path: "/finishedDrinks",
        });

        if (finishedDrink) {
          form.reset();
          toast.success("Drink Cleared!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            router.push(`/finishedDrinks`);
          }, 1000);
          await deletedDrink({ drinkId, path: pathname });
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5 mx-3"
      >
        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Drink Name" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className=" text-gray-500 w-full">
                <FormControl>
                  <Dropdown
                    onChangeHandler={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col gap-5 md:flex-row">
          <FormField
            control={form.control}
            name="memberName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl className="h-12">
                  <Input placeholder="Member Name" {...field} className="" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dateAdded"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="flex justify-center h-[48px] items-center md:flex-row w-full overflow-hidden rounded border-gray-200 border-[1.5px] px-3">
                    <Image
                      src="/assets/icons/calendar.svg"
                      alt="calendar"
                      width={24}
                      height={24}
                      className="filter-grey"
                    />
                    <p className="ml-3 whitespace-nowrap text-gray-600">
                      {" "}
                      Date Added:
                    </p>
                    <DatePicker
                      selected={field.value}
                      onChange={(date: Date) => field.onChange(date)}
                      showTimeSelect
                      timeInputLabel="Time:"
                      dateFormat="MM/dd/yyyy h:mm aa"
                      wrapperClassName="datePicker"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div>
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="button col-span-2 w-full"
          >
            {form.formState.isSubmitting ? "Submitting..." : `${type} Drink `}
          </Button>
          <ToastContainer />
        </div>
      </form>
    </Form>
  );
};

export default DrinkForm;
