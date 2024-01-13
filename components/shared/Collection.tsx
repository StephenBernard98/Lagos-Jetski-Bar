import { IDrink } from "@/lib/mongodb/database/models/drink.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
// import Pagination from "./Pagination";
import Image from "next/image";

type CollectionProps = {
  data: IDrink[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Drinks_Added" | "All_Drinks";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const drinkData = data;
    // const isDrinkCreator = userId === drinkData.staff._id.toString();

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <section className="wrapper overflow-x-auto">
            <table className="w-full border-collapse border-t">
              <thead>
                <tr className="p-medium-14 border-b text-grey-500">
                  <th className="min-w-[250px] py-3 text-left">No:</th>
                  <th className="min-w-[200px] flex-1 py-3 pr-4 text-left">
                    Drink Name
                  </th>
                  <th className="min-w-[150px] py-3 text-left">Member</th>
                  <th className="min-w-[100px] py-3 text-left">Date</th>
                  <th className="min-w-[100px] py-3 text-right">Staff</th>
                  <th className="min-w-[100px] py-3 text-right">Edit</th>
                  <th className="min-w-[100px] py-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((drink, index) => (
                  <tr
                    key={drink._id}
                    className="p-regular-14 lg:p-regular-16 border-b"
                    style={{ boxSizing: "border-box" }}
                  >
                    <td className="min-w-[250px] py-4 text-primary-500">
                      {index + 1} {/* Adjust index to start from 1 */}
                    </td>
                    <td className="min-w-[200px] flex-1 py-4 pr-4">
                      {drink.title}
                    </td>
                    <td className="min-w-[150px] py-4">{drink.memberName}</td>
                    <td className="min-w-[100px] py-4">
                      {formatDateTime(drink.createdAt).dateTime}
                    </td>
                    <td className="min-w-[100px] py-4 text-right">
                      {/* {drink.staff.username} */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* {totalPages > 1 && (
            // <Pagination
            //   urlParamName={urlParamName}
            //   page={page}
            //   totalPages={totalPages}
            // />
          )} */}
        </div>
      ) : (
                  <div className="flex justify-center min-h-[200px] flex-col gap-3 rounded-[14px] bg-gray-200 py-10 max-w-[1000px] mx-auto items-center">
                      <Image src="/assets/images/sorry.png" alt='no-list' width={230} height={230}/>
          <h3 className="text-xl md:font-bold">{emptyTitle}</h3>
          <p className="text-lg font-semibold">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
