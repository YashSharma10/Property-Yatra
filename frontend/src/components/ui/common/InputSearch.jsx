import { ArrowDown, Search } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
const InputSearch = () => {
  const [rotate, setRotate] = useState(false);
  const [showStatusBar, setShowStatusBar] = useState(false);
  const [showActivityBar, setShowActivityBar] = useState(false);
  const [showPanel, setShowPanel] = useState(false);
  return (
    <section>
      <div className="flex w-full max-w-md border items-center p-1 rounded-md transition-opacity duration-500">
        <span className="px-2 after:content-['|'] after:ml-1 after:text-brand block text-sm font-medium text-slate-700">
          Buy
        </span>
        <DropdownMenu onOpenChange={() => setRotate(!rotate)}>
          <DropdownMenuTrigger>
            <ArrowDown
              className={`${
                rotate ? "rotate-180 transition-all" : "rotate-0 transition-all"
              }`}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-44 mt-4">
            <DropdownMenuLabel>Residential</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Buy
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Rent
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Pg
            </DropdownMenuCheckboxItem>
            <DropdownMenuLabel>Commercial</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={showStatusBar}
              onCheckedChange={setShowStatusBar}
            >
              Buy
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showActivityBar}
              onCheckedChange={setShowActivityBar}
            >
              Rent
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={showPanel}
              onCheckedChange={setShowPanel}
            >
              Pg
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <input
          className="w-full outline-none p-1"
          type="text"
          placeholder="Enter Locality / Project / Society / Landmark"
        />
        <button type="submit" className="p-1">
          <Search className="text-brand" />
        </button>
      </div>
    </section>
  );
};

export default InputSearch;
