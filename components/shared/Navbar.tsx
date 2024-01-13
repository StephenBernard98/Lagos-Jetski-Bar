import Image from "next/image";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import MobileNav from "./MobileNav";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="max-w-[1250px] mx-auto w-full">
      <div className="flex justify-between mx-1 my-3 p-2 bg-slate-800 items-center">
        <Link href="/">
          <Image
            src="/assets/images/ljr_logo.png"
            alt="logo"
            width={70}
            height={70}
          />
        </Link>

        <div>
          <SignedIn>
            <nav className="md:flex justify-between hidden w-full items-center">
              <NavItems />
            </nav>
          </SignedIn>
        </div>

        <div className="mr-3 flex ">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <div className="ml-5 md:hidden">
              <MobileNav />
            </div>
          </SignedIn>
          <SignedOut>
            <Button asChild className="rounded font-semibold bg-blue-500 px-7">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
