/* eslint-disable react/prop-types */
import LogoDev from "@/assets/logo.svg?react";
import Nome from "@/assets/nome.svg?react";
import LogoDark from "@/assets/logoDark.svg?react";
import NomeDark from "@/assets/nomeDark.svg?react";
import { Link } from "react-router-dom";

const Logo = ({ theme }) => {
    return (
        <>
            {theme === "dark" || theme === "system" ? (
          <Link to="/">
            <div className="flex items-center mt-1">
              <LogoDev className="w-7 h-auto ml-2" />
              <Nome className="w-[152px] h-12" />
            </div>
          </Link>
        ) : (
          <Link to="/">
            <div className="flex items-center mt-1">
              <LogoDark className="w-7 h-auto ml-2" />
              <NomeDark className="w-[152px] h-12" />
            </div>
          </Link>
        )}
        </>
    );
}
 
export default Logo;