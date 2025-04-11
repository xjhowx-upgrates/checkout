import { useState, useEffect, useRef } from "react";
import {
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
  differenceInCalendarDays,
} from "date-fns";
import { DayPicker, Row, useInput } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { Input } from "../Input";
import "react-day-picker/dist/style.css";
import S from "./styles.module.scss";

export const DatePicker = ({ datei, datef, setValue, errors }) => {
  const [selectedRange, setSelectedRange] = useState();
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const { inputProps } = useInput({
    defaultSelected: new Date(),
    format: "dd/MM/yyyy",
    required: true,
  });

  const handleFromChange = (e) => {
    setFromValue(e.target.value);
    const date = parse(e.target.value, "dd/MM/yyyy", new Date());
    if (!isValid(date)) {
      return setSelectedRange({ from: undefined, to: undefined });
    }
    if (selectedRange?.to && isAfter(date, selectedRange.to)) {
      setSelectedRange({ from: selectedRange.to, to: date });
    } else {
      setSelectedRange({ from: date, to: selectedRange?.to });
    }
    setValue("initialdate", e.target.value);
  };

  const handleInputFocus = () => {
    if (!showDatePicker) {
      setShowDatePicker(true);
    }
  };

  const handleToChange = (e) => {
    setToValue(e.target.value);
    const date = parse(e.target.value, "dd/MM/yyyy", new Date());

    if (!isValid(date)) {
      return setSelectedRange({ from: selectedRange?.from, to: undefined });
    }

    if (selectedRange?.from && isBefore(date, selectedRange.from)) {
      setSelectedRange({ from: date, to: selectedRange.from });
    } else {
      setSelectedRange({ from: selectedRange?.from, to: date });
    }
    setValue("finaldate", e.target.value);
  };

  const handleRangeSelect = (range) => {
    setSelectedRange(range);
    if (range?.from) {
      setFromValue(format(range.from, "dd/MM/yyyy"));
      setValue("initialdate", format(range.from, "dd/MM/yyyy"));
    } else {
      setFromValue("");
    }
    if (range?.to) {
      setToValue(format(range.to, "dd/MM/yyyy"));
      setValue("finaldate", format(range.to, "dd/MM/yyyy"));
    } else {
      setToValue("");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(e.target) &&
        !e.target.classList.contains("dateinput")
      ) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function isPastDate(date) {
    return differenceInCalendarDays(date, new Date()) < 0;
  }

  function OnlyFutureRow(props) {
    const isPastRow = props.dates.every(isPastDate);
    if (isPastRow) return <></>;
    return <Row {...props} />;
  }

  return (
    <>
      <Input
        {...inputProps}
        placeholder="DD/MM/YYYY"
        label="Data de Ida"
        type="text"
        name="initialdate"
        value={fromValue}
        onChange={handleFromChange}
        onFocus={handleInputFocus}
        newclass={`dateinput ${errors.initialdate ? "error" : ""} `}
        {...datei}
        errors={errors}
      />
      <Input
        {...inputProps}
        placeholder="DD/MM/YYYY"
        label="Data de Volta"
        type="text"
        value={toValue}
        name="finaldate"
        onChange={handleToChange}
        onFocus={handleInputFocus}
        newclass={`dateinput ${errors.initialdate ? "error" : ""} `}
        {...datef}
        errors={errors}
      />
      {showDatePicker && (
        <div className={S.datepicker} ref={datePickerRef}>
          <DayPicker
            fromDate={new Date()}
            components={{ Row: OnlyFutureRow }}
            hidden={isPastDate}
            mode="range"
            selected={selectedRange}
            onSelect={handleRangeSelect}
            showOutsideDays
            locale={ptBR}
            data-testid="daypicker"
          />
        </div>
      )}
    </>
  );
};
