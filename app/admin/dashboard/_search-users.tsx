"use client";

import { usePathname, useRouter } from "next/navigation";

export const SearchUsers = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          const queryTerm = formData.get("search") as string;
          router.push(pathname + "?search=" + queryTerm);
        }}
      >
        <div className="flex justify-center items-center h-full">
          <label htmlFor="search" className="text-center text-xl w-full my-4">
            Search staff List
          </label>
        </div>
        <div className=" mx-3">
          <input
            id="search"
            name="search"
            type="text"
            className="border-1 bg-gray-200 border-gray-300 border-2 p-2 rounded full  w-full"
          />
          <div className="flex justify-center items-center w-full">
            <button
              className="bg-slate-800  m-3 rounded text-white px-6 py-2 "
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
