import { useState, useEffect, Children, cloneElement, useMemo } from "react";
import Chevron from "../assets/chevron-down.svg";
import Tag from "./tag";
import OptionsList from "./optionsList";
import Check from "../assets/check.svg";

function Option({ value, label, children, className, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`option-item ${className || ""}`}
      data-value={value}
      data-label={label}
    >
      {children || label}
      <div className="active-icon">
        <img src={Check} />
      </div>
    </div>
  );
}

function SelectInput({
  title,
  description,
  placeholder,
  options,
  children,
  mode = "single",
  onChange,
  value,
  icon,
  style,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isShowList, setIsShowList] = useState(false);
  const [selectedCustomElement, setSelectedCustomElement] = useState(null);

  const isSingleModeWithChildren = mode === "single" && children;

  const filteredOptions = useMemo(() => {
    if (children) {
      return Children.toArray(children).filter((child) =>
        child.props.label.toLowerCase().includes(inputValue.toLowerCase())
      );
    }
    return options.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, children, options]);

  const optionsShouldRender = inputValue.length
    ? filteredOptions
    : Children.toArray(children);

  const onChangeHandler = (data) => {
    if (isSingleModeWithChildren) {
      setSelectedCustomElement(cloneElement(data, { className: "active" }));
      onChange({ label: data.props.label, value: data.props.value });
      setIsShowList(false);
      setTimeout(() => {
        document.querySelector(".active-icon")?.classList.add("hidden");
      }, 0);
    } else if (mode === "single" && !children) {
      setIsShowList(false);
      onChange(data);
    } else if (mode === "multiple" && children) {
      const isExistValue = value.some((item) => item.value === data.value);
      if (isExistValue) {
        const filteredValue = value.filter((item) => item.value !== data.value);
        onChange(filteredValue);
      } else {
        onChange([
          ...value,
          { label: data.props.label, value: data.props.value },
        ]);
      }
    } else if (mode === "multiple") {
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
    if (isSingleModeWithChildren) {
      const input = document.getElementById("input");
      setIsShowList(true);
      input?.classList.remove("hidden");
      input?.focus();
      document.querySelector(".active-icon")?.classList.remove("hidden");
    }
    if (mode == "multiple") {
      const input = document.getElementById("input");
      setIsShowList(true);
      input?.focus();
    }
  };

  // addEventListener("click", (event) => {
  //   const select = document.querySelector(".select");
  //   const renderOption = document.querySelector(".render-option");
  //   if (children) {
  //     if (
  //       !select?.contains(event.target) ||
  //       renderOption?.contains(event.target)
  //     ) {
  //       return setIsShowList(false);
  //     }
  //     return;
  //   }
  //   if (!select?.contains(event.target)) {
  //     return setIsShowList(false);
  //   }

  //   document.getElementById("input")?.focus();
  // });

  return (
    <div className="select" style={style}>
      <div className="title">{title}</div>
      <div className="input-body">
        <div
          className={
            isShowList || selectedCustomElement || value.length
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
                <Tag key={item.value} data={item} onClick={onChangeHandler} />
              ))}
            </div>
          )}
          <div className="input-wrapper">
            {isSingleModeWithChildren && (
              <div className="children-input-wrapper">
                <input
                  id="input"
                  className={
                    selectedCustomElement && !isShowList ? "hidden" : ""
                  }
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={placeholder}
                />
                {selectedCustomElement && !isShowList && (
                  <span className="selected-custom-element">
                    {selectedCustomElement}
                  </span>
                )}
              </div>
            )}
            {mode === "single" && !children && (
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
          <div className="show-icon">
            <img src={Chevron} alt="dropdown" />
          </div>
        </div>
        {isShowList && (
          <div className="children options-list">
            {Children.map(optionsShouldRender, (child) =>
              cloneElement(child, {
                onClick: () => onChangeHandler(child),
                className:
                  selectedCustomElement?.props?.value == child.props.value &&
                  "active",
              })
            )}
          </div>
        )}
        {!Children.toArray(children) && (
          <OptionsList
            value={value}
            mode={mode}
            options={optionsShouldRender}
            isVisible={isShowList}
            onChangeHandler={onChangeHandler}
          />
        )}
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

SelectInput.Option = Option;

export default SelectInput;
