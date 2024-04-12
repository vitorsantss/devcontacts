import { useTheme } from "@/contexts/ThemeContext";
import { ModeToggle } from "@/components/ModeToggle";
import Logo from "./Logo";
import CreateContact from "./Contact/CreateContact";


const Header = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between mt-2 items-center">
      <Logo theme={theme} />
      <div className="flex gap-8 items-center">
      <CreateContact />
      <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
