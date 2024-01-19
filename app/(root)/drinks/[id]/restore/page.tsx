import DrinkForm from "@/components/shared/DrinkForm";
import { getFinishedDrinkById } from "@/lib/actions/drink.actions";
import { auth } from "@clerk/nextjs";

type RestoreDrinkProps = {
  params: {
    id: string;
  };
};

const RestoreDrinks = async ({ params: { id } }: RestoreDrinkProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const drink = await getFinishedDrinkById(id);
  return (
    <>
      <section className="py-1">
        <h3 className=" text-center mt-[7rem] font-extrabold bg-slate-300 rounded p-7 mx-3 text-2xl">
          Restore Drink
        </h3>
      </section>
      <div className="wrapper my-8 ">
        <DrinkForm
          userId={userId}
          type="Restore"
          drink={drink}
          drinkId={drink._id}
        />
      </div>
    </>
  );
};

export default RestoreDrinks;
