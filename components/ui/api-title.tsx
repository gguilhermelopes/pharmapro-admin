import { Laptop2 } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import Heading from "@/components/ui/heading";

const ApiTitle = () => {
  return (
    <>
      <div className="my-2 flex gap-2 items-end">
        <Heading title="API" description="Para desenvolvedores" />
        <Laptop2 className="w-5 h-5" />
      </div>
      <Separator />
    </>
  );
};

export default ApiTitle;
