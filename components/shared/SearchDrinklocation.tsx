"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const SearchDrinkLocation = ({
  placeholder = "search drink location...",
}: {
  placeholder?: string;
}) => {
  const [drinkQuery, setDrinkQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";

      if (drinkQuery) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "drinkQuery",
          value: drinkQuery,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["drinkQuery"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [drinkQuery, searchParams, router]);

  return (
    <div className="flex justify-center min-h-[20px] border-2 w-full overflow-hidden rounded-full bg-gray-50 mx-3 px-6 py-2 my-1">
      <Image
        src="/assets/icons/search.svg"
        alt="search"
        width={24}
        height={24}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setDrinkQuery(e.target.value)}
        className=" border-0 bg-gray-50 outline-offset-0 placeholder:text-gray-500 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default SearchDrinkLocation;
