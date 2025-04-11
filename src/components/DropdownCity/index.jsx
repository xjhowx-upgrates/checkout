import { useState, useRef, forwardRef, useEffect } from "react";
import { Input } from "../Input";
import axios from "axios";
import S from "./styles.module.scss";

export const DropdownCity = forwardRef((props, ref) => {
  const { setValue, errors } = props;
  const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);
    setValue(props.registername, value);

    if (value.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.teleport.org/api/cities/?search=${value}&limit=5`,
      );
      const cities = response.data._embedded["city:search-results"].map(
        (city) => city.matching_full_name,
      );
      setSuggestions(cities);
      setShowDropdown(true);
    } catch (error) {
      console.error(error);
      setSuggestions([]);
      setShowDropdown(false);
    }
  };

  const handleSelectOption = (selectedCity) => {
    setInputValue(selectedCity);
    setValue(props.registername, selectedCity);
    setShowDropdown(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();

      if (dropdownRef.current) {
        const currentIndex = suggestions.findIndex(
          (city) => city === inputValue,
        );
        const newIndex =
          (currentIndex +
            (event.key === "ArrowUp" ? -1 : 1) +
            suggestions.length) %
          suggestions.length;

        setInputValue(suggestions[newIndex]);
        dropdownRef.current.children[newIndex].focus();
      }
    } else if (event.key === "Enter") {
      const selectedCity = event.target.textContent;
      handleSelectOption(selectedCity);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <Input
        placeholder="Insira a Cidade"
        type="text"
        name={props.registername}
        value={inputValue}
        label={props.label}
        onChange={handleInputChange}
        ref={dropdownRef}
        newclass={`${errors[props.registername] ? "error" : ""} `}
        errors={errors}
      />
      {showDropdown && (
        <ul
          className={S.dropdown}
          role="listbox"
          aria-label="Sugestões"
          ref={dropdownRef}
        >
          {suggestions?.map((city, index) => (
            <li
              key={index}
              tabIndex="0"
              aria-selected={city === inputValue}
              onClick={() => handleSelectOption(city)}
              onKeyDown={handleKeyDown}
            >
              {city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
