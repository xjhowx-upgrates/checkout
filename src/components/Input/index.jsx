import { forwardRef } from "react";
import S from "./styles.module.scss";
import { DateIcon, NameIcon, EmailIcon, LocationIcon } from "@/assets";

export const Input = forwardRef(({ errors, ...props }, ref) => {
  let { name } = props;
  const renderErrorMessage = () => {
    return errors[name]?.message || "";
  };

  return (
    <div className={S.relative}>
      <input
        {...props}
        htmlFor={props.name}
        type={props.type}
        name={props.name}
        className={`${S.input} ${props.newclass}`}
        placeholder={props.placeholder}
        ref={ref}
        autoComplete="off"
      />
      <button className={S.input__icon}>
        {name === "initialdate" && <DateIcon />}
        {name === "finaldate" && <DateIcon />}
        {name === "fullname" && <NameIcon />}
        {name === "email" && <EmailIcon />}
        {name === "origin" && <LocationIcon />}
        {name === "destiny" && <LocationIcon />}
      </button>
      <label id={props.name} className={S.label}>
        {props.label}
      </label>
      <p className="error__input">{renderErrorMessage()}</p>
    </div>
  );
});
