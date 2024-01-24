import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import Search from "@/components/shared/Search";
import SearchDrinkLocation from "@/components/shared/SearchDrinklocation";
import { getAllDrinks } from "@/lib/actions/drink.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const drinkLocation = (searchParams?.drinkQuery as string) || "";
  const category = (searchParams?.category as string) || "";

  const drinks = await getAllDrinks({
    query: searchText,
    drinkQuery: drinkLocation,
    category,
    page,
    limit: 10,
  });

  return (
    <main className="mt-[5rem] md:mt-[11rem]">
      <div className="fixed top-20 left-0 w-full bg-white flex justify-between items-center overflow-x-auto ">
        <div className="flex my-3 flex-col md:flex-row items-center w-full justify-center">
          <Search />
          <SearchDrinkLocation />
          <CategoryFilter />
        </div>
      </div>
      <Collection
        data={drinks?.data}
        emptyTitle="No Drinks Found"
        emptyStateSubtext="Click Add Drink to start a List"
        limit={10}
        page={page}
        totalPages={drinks?.totalPages}
      />
    </main>
  );
}
