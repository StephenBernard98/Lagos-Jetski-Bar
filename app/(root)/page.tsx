import Collection from "@/components/shared/Collection";
import { getAllDrinks } from "@/lib/actions/drink.actions";
import { connectToDatabase } from "@/lib/mongodb/database";
import { handleError } from "@/lib/utils";
import { User } from "@clerk/nextjs/server";


export default async function Home() {
  const bgImg = "/assets/images/ljr_home_bg.jpeg";
  const bgImg2 = "/assets/images/sorry.png";

  const drinks = await getAllDrinks({
    query: "",
    category: "",
    page: 1,
    limit: 10,
  });

  try {
    await connectToDatabase();
  } catch (error) {
    handleError(error);
  }

  return (
    <main
      className="mt-[7rem]"
      // style={{
      //   backgroundImage: `url('${bgImg}')`,
      //   backgroundRepeat: "no-repeat",
      //   backgroundSize: "cover",
      //   objectFit: "contain",
      // }}
    >
      <Collection
        data={drinks?.data}
        emptyTitle="No Drinks Found"
        emptyStateSubtext="Click Add Drink to start a list"
        collectionType="All_Drinks"
        limit={6}
        page={1}
        totalPages={drinks?.totalPages}
      />
    </main>
  );
}
