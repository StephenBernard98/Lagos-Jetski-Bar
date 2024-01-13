import DrinksForm from "@/components/shared/DrinkForm";
import { auth } from "@clerk/nextjs";

const AddDrinks = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="py-1 max-w-[1250px] mx-auto">
        <h3 className=" text-center font-extrabold bg-slate-300 rounded mx-5 p-7 text-2xl">
          Add Drink
        </h3>
      </section>
      <div className="my-8 ">
        <DrinksForm userId={userId} type="Add" />
      </div>
    </>
  );
};

export default AddDrinks;
