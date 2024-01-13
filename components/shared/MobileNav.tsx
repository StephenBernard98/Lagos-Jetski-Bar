import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { CiMenuFries } from "react-icons/ci";
import { Separator } from "@/components/ui/separator";
import NavItems from "./NavItems";

const MobileNav = () => {
  const bgUrl =
    "https://static.wixstatic.com/media/de2077_4eb980951e5943e48c517476982927fc~mv2.jpg/v1/crop/x_173,y_0,w_934,h_853/fill/w_380,h_347,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/ee25a114-e871-4b82-967a-f8b401bd63e2.jpg";
  return (
    <nav className="">
      <Sheet>
        <SheetTrigger className="align-middle cursor-pointer text-white">
          <CiMenuFries size={25} />
        </SheetTrigger>
        <SheetContent
          className="flex flex-col gap-6 md:hidden bg-black/80"
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            objectFit: "contain",
          }}
        >
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
