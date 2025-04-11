import { useState, useRef, forwardRef } from "react";
import S from "./styles.module.scss";
import { AdultsIcon } from "@/assets";
import { ChildrenIcon } from "@/assets/icons/children";

export const Count = forwardRef(
  ({ title, setCounts, setValue, errors }, ref) => {
    const [count, setCount] = useState(0);
    const inputRef = useRef(null);

    const handleIncrement = (e) => {
      e.preventDefault();
      setCount((prevCount) => prevCount + 1);
      setCounts((prevCounts) =>
        prevCounts.map((c) =>
          c.title === title ? { ...c, count: c.count + 1 } : c,
        ),
      );
      if (title === "Adultos") {
        setValue("Adultos", count + 1);
      } else if (title === "Crianças") {
        setValue("Crianças", count + 1);
      }
    };

    const handleDecrement = (e) => {
      e.preventDefault();
      if (count > 0) {
        setCount((prevCount) => prevCount - 1);
        setCounts((prevCounts) =>
          prevCounts.map((c) =>
            c.title === title ? { ...c, count: c.count - 1 } : c,
          ),
        );
        if (title === "Adultos") {
          setValue("Adultos", count - 1);
        } else if (title === "Crianças") {
          setValue("Crianças", count - 1);
        }
      }
    };

    const handleInputChange = (e) => {
      const value = parseInt(e.target.value);
      setCount(value);
      setCounts((prevCounts) =>
        prevCounts.map((c) => (c.title === title ? { ...c, count: value } : c)),
      );
      if (title === "Adultos") {
        setValue("Adultos", value);
      } else if (title === "Crianças") {
        setValue("Crianças", value);
      }
    };

    return (
      <div className={S.count}>
        <button
          disabled={count > 0 ? false : true}
          className={`${S.count__button} ${count > 0 ? "" : "disabled"}`}
          onClick={handleDecrement}
        >
          -
        </button>
        <div className={`${S.count__card} ${errors[title] ? "error" : ""}`}>
          {title === "Adultos" ? <AdultsIcon /> : <ChildrenIcon />}
          <label htmlFor={title}>{title}</label>
          <input
            id={title}
            type="number"
            value={isNaN(count) ? "" : count}
            className={S.count__number}
            onChange={handleInputChange}
            inputMode="numeric"
            ref={inputRef}
            readOnly
          />
        </div>
        <button
          disabled={count < 50 ? false : true}
          className={`${S.count__button} ${count < 50 ? "" : "disabled"}`}
          title="Adicionar mais um"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
    );
  },
);
