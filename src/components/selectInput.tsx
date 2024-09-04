import classnames from "classnames";
import { useState, useMemo, useEffect } from "react";
import Tag from "./tag";
import OptionsList from "./optionsList";
import Chevron from "../assets/chevron-down.svg";
import { SelectInputOption, SelectInputProps } from "../types";

const onClickOutside = (element, callback) => {
  document.addEventListener("click", (e) => {
    if (!element.contains(e.target)) callback();
  });
};

function SelectInput({
  title,
  description,
  placeholder,
  options,
  mode = "single",
  onChange,
  optionRender: OptionRender,
  value,
  icon,
  style,
}: SelectInputProps) {
  const [inputValue, setInputValue] = useState("");
  const [showList, setShowList] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const optionsShouldRender = inputValue.length ? filteredOptions : options;

  const onItemClickHandler = (data: SelectInputOption) => {
    if (mode === "single") {
      setShowList(false);
      onChange(data);
    } else if (mode === "multiple") {
      const input = document.getElementById("input");
      input?.focus();
      const isExistValue = (value as SelectInputOption[]).some(
        (item) => item.value === data.value
      );
      if (isExistValue) {
        const filteredValue = (value as SelectInputOption[]).filter(
          (item) => item.value !== data.value
        );
        onChange(filteredValue);
      } else {
        onChange([...(value as SelectInputOption[]), data]);
      }
    }
  };

  useEffect(() => {
    const input = document.querySelector("#input");
    if (input) {
      if (showList) {
        (input as any).focus();
      }
    }
  }, [showList]);

  useEffect(() => {
    const inputbody = document.querySelector(".input-body");
    onClickOutside(inputbody, () => {
      setShowList(false);
    });
  }, []);

  return (
    <div className="select" style={style}>
      <div className="title">{title}</div>
      <div className="input-body">
        <div
          onClick={() => setShowList(true)}
          className={classnames("input-container", {
            active: showList || (value as SelectInputOption[]).length,
          })}
        >
          {icon && (
            <div className="icon">
              <img src={icon} alt="icon" />
            </div>
          )}
          {mode === "multiple" && (value as SelectInputOption[]).length > 0 && (
            <div className="tags">
              {(value as SelectInputOption[]).map((item) => (
                <Tag
                  key={item.value}
                  data={item}
                  onClick={onItemClickHandler}
                />
              ))}
            </div>
          )}
          <div className="input-wrapper">
            {mode === "single" && !OptionRender && (
              <div className="single-input-wrapper">
                <input
                  id="input"
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    (value as SelectInputOption).label || placeholder
                  }
                />
              </div>
            )}

            {mode === "single" && OptionRender && (
              <div className="single-input-wrapper">
                <OptionRender
                  label={(value as SelectInputOption).label}
                  value={(value as SelectInputOption).value}
                />
              </div>
            )}

            {mode === "multiple" && (
              <input
                id="input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
              />
            )}
          </div>
          <div
            className={classnames("show-icon", {
              active: showList,
            })}
            onClick={() => setShowList(!showList)}
          >
            <img id="opened-icon" src={Chevron} alt="dropdown" />
          </div>
        </div>
        <OptionsList
          value={value}
          options={optionsShouldRender}
          isVisible={showList}
          optionRender={OptionRender}
          onItemClickHandler={onItemClickHandler}
        />
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

SelectInput.Option = Option;

export default SelectInput;
