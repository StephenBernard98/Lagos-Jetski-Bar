import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import { getAllDrinks } from "@/lib/actions/drink.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const drinks = await getAllDrinks({
    query: searchText,
    category,
    page,
    limit: 10,
  });

  return (
    <main className="mt-[5rem] md:mt-[7rem]">
      <div className=" flex flex-col md:flex-row mx-2 justify-between items-center">
        <Search />
        <CategoryFilter />
      </div>
      <Collection
        data={drinks?.data}
        emptyTitle="No Drinks Found"
        emptyStateSubtext="Click Add Drink to start a list"
        collectionType="All_Drinks"
        limit={10}
        page={page}
        totalPages={drinks?.totalPages}
      />
    </main>
  );
}
