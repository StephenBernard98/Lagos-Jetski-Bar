import { IDrink } from "@/lib/mongodb/database/models/drink.model";
import { formatDateTime } from "@/lib/utils";
import Pagination from "./Pagination";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";

type CollectionProps = {
  data: IDrink[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  urlParamName,
}: CollectionProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isAdmin = sessionClaims?.metadata.role === "admin";

  const calculateTimeDifference = (date1: Date, date2: Date) => {
    const oneMinute = 60 * 1000; // milliseconds
    const oneHour = oneMinute * 60;
    const oneDay = oneHour * 24;
    const oneMonth = oneDay * 30;

    const diffMilliseconds = Math.abs(date1.getTime() - date2.getTime());

    const months = Math.floor(diffMilliseconds / oneMonth);
    const days = Math.floor((diffMilliseconds % oneMonth) / oneDay);
    const hours = Math.floor((diffMilliseconds % oneDay) / oneHour);
    const minutes = Math.round((diffMilliseconds % oneHour) / oneMinute);

    return { months, days, hours, minutes };
  };

  return (
    <div>
      {data.length > 0 ? (
        <div className="flex flex-col mt-[18rem] md:mt-[12rem] items-center ml-[39rem] mr-14 md:ml-[33rem] md:mr-14 lg:mx-1 gap-3">
          <section className="overflow-x-auto">
            <table className="w-full border-collapse border-t">
              <thead>
                <tr className=" border-b text-gray-500">
                  <th className="max-w-[20px] py-3 text-start">No:</th>
                  <th className="min-w-[130px] py-3 pr-4 text-start">
                    Drink Name
                  </th>
                  <th className="min-w-[130px] py-3 text-start">Member</th>
                  <th className="min-w-[90px] py-3 text-start">Staff</th>
                  <th className="min-w-[280px] py-3 text-start">Date & Time</th>
                  <th className="min-w-[90px] py-3 text-start">Location</th>
                  <th className="min-w-[70px] py-3 text-start">Size</th>
                </tr>
              </thead>
              <tbody>
                {data.map((drink, index) => {
                  const currentDate = new Date();
                  const createdAtDate = new Date(drink.dateAdded);
                  const timeDifference = calculateTimeDifference(
                    currentDate,
                    createdAtDate
                  );

                  let timeAgo = "";

                  if (timeDifference.months > 0) {
                    timeAgo = `${timeDifference.months} month${
                      timeDifference.months > 1 ? "s" : ""
                    } ago`;
                  } else if (timeDifference.days > 0) {
                    timeAgo = `${timeDifference.days} day${
                      timeDifference.days > 1 ? "s" : ""
                    } ago`;
                  } else if (timeDifference.hours > 0) {
                    timeAgo = `${timeDifference.hours} hour${
                      timeDifference.hours > 1 ? "s" : ""
                    } ago`;
                  } else if (timeDifference.minutes === 60) {
                    timeAgo = "one hour ago";
                  } else {
                    timeAgo = `${timeDifference.minutes} minute${
                      timeDifference.minutes > 1 ? "s" : ""
                    } ago`;
                  }
                  return (
                    <tr
                      key={drink._id}
                      className="border-b"
                      style={{ boxSizing: "border-box" }}
                    >
                      <td className="min-w-[70px] py-4 text-primary-500">
                        {index + 1}
                      </td>
                      <td className="min-w-[200px] flex-1 py-4 pr-4">
                        {drink.title}
                      </td>
                      <td className="min-w-[180px] py-4">{drink.memberName}</td>
                      <td className="min-w-[110px] py-4 text-start">
                        {drink.organizer.username}
                      </td>
                      <td className="min-w-[360px] ml-5 py-4">
                        {`${
                          formatDateTime(drink.dateAdded).dateTime
                        } (${timeAgo})`}
                      </td>

                      <td className="min-w-[70px] flex-1 py-4 pr-4">
                        {drink.location}
                      </td>
                      <td className="min-w-[70px] flex-1 py-4 pr-4">
                        {drink.size}
                      </td>
                      <td className="min-w-[100px] py-4">
                        {userId &&
                          (userId === drink.organizer?._id || isAdmin) &&
                          (() => {
                            const sixMonthsAgo = new Date();
                            sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
                            return isAdmin ||
                              new Date(drink.dateAdded) >= sixMonthsAgo ? (
                              <Link href={`/drinks/${drink._id}/update`}>
                                <Button variant={"outline"}>Edit</Button>
                              </Link>
                            ) :
                            null;
                          })()}
                      </td>

                      <td className="max-w-[80px] py-4">
                        {userId && (
                          <Link href={`/drinks/${drink._id}/finished`}>
                            <Button variant={"default"}>Finish</Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
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
        <div className="flex justify-center min-h-[200px] flex-col gap-7 rounded bg-gray-200 py-10 lg:max-w-[1000px] my-5 lg:mx-auto mx-2 items-center">
          <Image
            src="/assets/images/sorry.png"
            alt="no-list"
            width={230}
            height={230}
            className="mt-28 md:mt-10"
          />
          <h3 className="text-xl md:font-bold">{emptyTitle}</h3>
          <p className="text-lg font-semibold">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
};

export default Collection;
