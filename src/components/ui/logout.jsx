/* eslint-disable react/prop-types */
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaUser } from "react-icons/fa";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IoIosLogOut } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "@/context/auth";

const Logout = ({ username }) => {
  const { signOut } = useContext(AuthContext);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="mt-1">
            <FaUser size={20} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex justify-center">
            {username}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="flex justify-center items-center gap-1 text-red-600 cursor-pointer">
            Sair
            <IoIosLogOut className="mt-0.5" color="#dc2626" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Logout;
