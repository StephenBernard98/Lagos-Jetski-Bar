import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { CiMenuFries } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  return (
    <nav className="">
      <Sheet>
        <SheetTrigger className="align-middle cursor-pointer text-white">
          <CiMenuFries size={25} />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden">
          <Image
            src="/assets/images/ljr_logo.png"
            alt="logo"
            width={70}
            height={70}
          />
          <Separator className="border border-gray-50" />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
