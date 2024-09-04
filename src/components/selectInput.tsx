import { useState, useMemo, useEffect } from "react";
import Chevron from "../assets/chevron-down.svg";
import Tag from "./tag";
import OptionsList from "./optionsList";

function SelectInput({
  title,
  description,
  placeholder,
  options,
  mode = "single",
  onChange,
  value,
  icon,
  style,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isShowList, setIsShowList] = useState(false);

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const optionsShouldRender = inputValue.length ? filteredOptions : options;

  const onSelectHandler = (data) => {
    if (mode === "single") {
      onChange(data);
    } else if (mode === "multiple") {
      const input = document.getElementById("input");
      input?.focus();
      const isExistValue = value.some((item) => item.value === data.value);
      if (isExistValue) {
        const filteredValue = value.filter((item) => item.value !== data.value);
        onChange(filteredValue);
      } else {
        onChange([...value, data]);
      }
    }
  };

  const inputWrapperOnClickHandler = () => {
    // burada custom render kısmı koşulu eklenecek
    // if (mode) {
    //   const input = document.getElementById("input");
    //   setIsShowList(true);
    //   input?.focus();
    // }
  };

  useEffect(() => {
    if (document.getElementById("input")) {
      const input = document.getElementById("input");
      if (mode == "single") {
        input.addEventListener("blur", () => {
          setTimeout(() => {
            setIsShowList(false);
          }, 10);
        });
      }
      input.addEventListener("focus", () => {
        setIsShowList(true);
      });
    }
  }, []);

  return (
    <div className="select" style={style}>
      <div className="title">{title}</div>
      <div className="input-body">
        <div
          className={
            isShowList || value.length
              ? "input-container active"
              : "input-container"
          }
          onClick={inputWrapperOnClickHandler}
        >
          {icon && (
            <div className="icon">
              <img src={icon} alt="icon" />
            </div>
          )}
          {mode === "multiple" && value.length > 0 && (
            <div className="tags">
              {value.map((item) => (
                <Tag key={item.value} data={item} onClick={onSelectHandler} />
              ))}
            </div>
          )}
          <div className="input-wrapper">
            {mode === "single" && (
              <div className="single-input-wrapper">
                <input
                  id="input"
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={value?.label || placeholder}
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
            className={`show-icon ${isShowList && "active"}`}
            onClick={() => setIsShowList(!isShowList)}
          >
            <img id="opened-icon" src={Chevron} alt="dropdown" />
          </div>
        </div>
        {
          <OptionsList
            value={value}
            mode={mode}
            options={optionsShouldRender}
            isVisible={isShowList}
            onSelectHandler={onSelectHandler}
          />
        }
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

SelectInput.Option = Option;

export default SelectInput;
