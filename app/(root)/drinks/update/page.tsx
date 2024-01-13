import DrinkForm from "@/components/shared/DrinkForm";
import { auth } from "@clerk/nextjs";

const updateDrinks = () => {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  return (
    <>
      <section className="py-1">
        <h3 className=" text-center font-extrabold bg-slate-300 rounded p-7 mx-3 text-2xl">
          Update Drink
        </h3>
      </section>
      <div className="wrapper my-8 ">
        <DrinkForm userId={userId} type="Update" />
      </div>
    </>
  );
};

export default updateDrinks;
