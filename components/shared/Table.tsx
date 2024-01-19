import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Pagination from "./Pagination";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { IFinishedDrink } from "@/lib/mongodb/database/models/finished.model";

type TableProps = {
  data: IFinishedDrink[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Drinks_Added" | "All_Drinks";
};

const Table = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: TableProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-col mt-[16rem] md:mt-[12rem]  items-center ml-[32rem] mr-14 md:ml-[22rem] md:mr-14 lg:mx-1 gap-3">
          <section className="overflow-x-auto">
            <table className="w-full border-collapse border-t">
              <thead>
                <tr className=" border-b text-gray-500">
                  <th className="max-w-[20px] py-3 text-start">No:</th>
                  <th className="min-w-[150px] py-3 pr-4 text-start">
                    Drink Name
                  </th>
                  <th className="min-w-[150px] py-3 text-start">Member</th>
                  <th className="min-w-[100px] py-3 text-start">Staff</th>
                  <th className="min-w-[200px] py-3 text-start">Date & Time</th>
                </tr>
              </thead>
              <tbody>
                {data.map((drink, index) => (
                  <tr
                    key={drink._id}
                    className="border-b"
                    style={{ boxSizing: "border-box" }}
                  >
                    <td className="min-w-[100px] py-4 text-primary-500">
                      {index + 1} {/* Adjust index to start from 1 */}
                    </td>
                    <td className="min-w-[230px] flex-1 py-4 pr-4">
                      {drink.title}
                    </td>
                    <td className="min-w-[200px] py-4">{drink.memberName}</td>
                    <td className="min-w-[150px] py-4 text-start">
                      {drink.organizer.username}
                    </td>
                    <td className="min-w-[150px] ml-5 py-4">
                      {formatDateTime(drink.createdAt).dateTime}
                    </td>
                    <td className="min-w-[100px] py-4">
                      <Link href={`/drinks/${drink._id}/restore`}>
                        <Button variant={"default"}>Restore</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="flex justify-center min-h-[200px] mt-[15.5rem] md:mt-[11rem] flex-col gap-3 rounded-[14px] bg-gray-200 py-10 max-w-[1000px] mx-3 mb-3 lg:mx-auto items-center">
          <Image
            src="/assets/images/sorry.png"
            alt="no-list"
            width={230}
            height={230}
          />
          <h3 className="text-xl md:font-bold">{emptyTitle}</h3>
          <p className="text-lg font-semibold">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
};

export default Table;
