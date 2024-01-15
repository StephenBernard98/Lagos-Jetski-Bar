import DrinkForm from "@/components/shared/DrinkForm";
import { getDrinkById } from "@/lib/actions/drink.actions";
import { auth } from "@clerk/nextjs";

type UpdateDrinkProps = {
  params: {
    id: string;
  };
};

const updateDrinks = async ({ params: { id } }: UpdateDrinkProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const drink = await getDrinkById(id);

  return (
    <>
      <section className="py-1">
        <h3 className=" text-center mt-[7rem] font-extrabold bg-slate-300 rounded p-7 mx-3 text-2xl">
          Update Drink
        </h3>
      </section>
      <div className="wrapper my-8 ">
        <DrinkForm
          userId={userId}
          type="Update"
          drink={drink}
          drinkId={drink._id}
        />
      </div>
    </>
  );
};

export default updateDrinks;
