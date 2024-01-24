import { SearchParamProps } from "@/types";
import Search from "@/components/shared/Search";
import Table from "@/components/shared/Table"
import { getAllFinishedDrinks } from "@/lib/actions/drink.actions";
import CategoryFilter from "@/components/shared/CategoryFilter";

const AllFinishedDrinks = async ({ searchParams }: SearchParamProps) => {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const drinks = await getAllFinishedDrinks({
    query: searchText,
    category,
    page,
    limit: 10,
  });

  return (
    <div className="mt-[5rem] md:mt-[11rem]">
      <div className="fixed top-20 left-0 w-full bg-white flex justify-between items-center overflow-x-auto my-2">
        <Search />
        <CategoryFilter />
      </div>
      <Table
        data={drinks?.data}
        emptyTitle="No Drinks Found"
        emptyStateSubtext="Click Add Drink to start a list"
        collectionType="All_Drinks"
        limit={10}
        page={page}
        totalPages={drinks?.totalPages}
      />
    </div>
  );
};

export default AllFinishedDrinks;
