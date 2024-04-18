import { redirect } from "next/navigation";
import { checkRole } from "@/lib/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs";
import { setRole } from "./_actions";

export default async function AdminDashboard(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const query = params.searchParams.search;

  const users = query ? await clerkClient.users.getUserList({ query }) : [];

  return (
    <>
      <div className=" bg-slate-300 flex justify-center my-2 rounded mx-5 items-center h-full">
        <h3 className=" text-center font-extrabold p-7 text-2xl">
          Admin Dashboard
        </h3>
      </div>

      <SearchUsers />

      {users.map((user) => {
        return (
          <div key={user.id} className="flex justify-between items-center m-3">
            <div>
              {user.firstName} {user.lastName}
            </div>
            <div>
              {
                user.emailAddresses.find(
                  (email) => email.id === user.primaryEmailAddressId
                )?.emailAddress
              }
            </div>
            <div>{user.publicMetadata.role as string}</div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="admin" name="role" />
                <button
                  className="bg-slate-800 rounded text-white px-6 py-2 "
                  type="submit"
                >
                  Make Admin
                </button>
              </form>
            </div>
            <div>
              <form action={setRole}>
                <input type="hidden" value={user.id} name="id" />
                <input type="hidden" value="moderator" name="role" />
                <button
                  className="bg-green-600 rounded text-white px-6 py-2 "
                  type="submit"
                >
                  Make Moderator
                </button>
              </form>
            </div>
          </div>
        );
      })}
    </>
  );
}
