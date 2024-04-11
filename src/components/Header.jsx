import { useTheme } from "@/contexts/ThemeContext";
import { ModeToggle } from "@/components/ModeToggle";
import Logo from "./Logo";


const Header = () => {
  const { theme } = useTheme();

  return (
    <div className="flex justify-between mt-2 items-center">
      <Logo theme={theme} />
      <ModeToggle />
    </div>
  );
};

export default Header;
