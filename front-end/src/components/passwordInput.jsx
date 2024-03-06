/* eslint-disable react/prop-types */
import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { Input } from "./ui/input";


const PasswordInput = ({ value, onChange, ...rest }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      return (
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            value={value}
            onChange={onChange}
            {...rest}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
          >
            {showPassword ? <VscEyeClosed size={20} color="#64748b" /> : <VscEye size={20} color="#64748b" />}
          </button>
        </div>
      );
};

export default PasswordInput;
