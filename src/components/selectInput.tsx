/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useEffect, useId } from "react";
import classnames from "classnames";
import Tag from "./tag";
import OptionsList from "./optionsList";
import Chevron from "../assets/chevron-down.svg";
import { SelectInputOption, SelectInputProps } from "../types";

const onClickOutside = (element: HTMLElement, callback: () => void) => {
  const handleClickOutside = (e: MouseEvent) => {
    if (!element.contains(e.target as Node)) {
      callback();
    }
  };
  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
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
  const inputId = useId();

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [inputValue, options]);

  const optionsShouldRender = inputValue.length ? filteredOptions : options;

  const onItemClickHandler = (data: SelectInputOption) => {
    if (mode === "single" && !OptionRender) {
      setShowList(false);
      onChange(data);
    } else if (mode === "multiple" && !OptionRender) {
      const input = document.getElementById(inputId);
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
    } else if (OptionRender && mode === "single") {
      onChange(data);
    } else if (mode === "multiple" && OptionRender) {
      const input = document.getElementById(inputId);
      input?.focus();
      const isExistValue = (value as SelectInputOption[]).some(
        (item) => item["data-value"] === data.value
      );
      if (isExistValue) {
        const filteredValue = (value as SelectInputOption[]).filter(
          (item) => item["data-value"] !== data.value
        );
        onChange(filteredValue);
      } else {
        onChange([...(value as SelectInputOption[]), data]);
      }
    }
  };

  const handleOptionClick = (option: SelectInputOption) => {
    const input = document.getElementById(inputId);
    input?.focus();
    onItemClickHandler(option);
  };

  const renderElement = () => {
    if (OptionRender) {
      if (inputValue.length && mode === "multiple") {
        return OptionRender().map((item) => {
          const label = (item.props as any)["data-label"].toLowerCase();
          const isMatch = label.includes(inputValue.toLowerCase());

          if (isMatch) {
            const isActive =
              (item.props as any).value === (value as SelectInputOption).value;
            return React.cloneElement(item, {
              onClick: (event: { stopPropagation: () => void }) => {
                handleOptionClick(item.props);
                event.stopPropagation();
              },
              className: classnames(item.props.className, { active: isActive }),
            });
          }
          return null;
        });
      } else {
        return OptionRender().map((item) => {
          const isActive =
            (item.props as any)["data-value"] ===
            (value as SelectInputOption).value;
          return React.cloneElement(item, {
            onClick: (event: { stopPropagation: () => void }) => {
              handleOptionClick(item.props);
              event.stopPropagation();
            },
            className: classnames(item.props.className, { active: isActive }),
          });
        });
      }
    }
    return null;
  };

  const renderSelectedElement = () => {
    if (OptionRender) {
      return (OptionRender() as React.ReactElement[]).map((item) => {
        const isActive =
          (item.props as any)["data-value"] ===
          (value as SelectInputOption)["data-value"];
        if (isActive) {
          return React.cloneElement(item, {
            onClick: (event: { stopPropagation: () => void }) => {
              handleOptionClick(item.props);
              event.stopPropagation();
              setShowList(!showList);
            },
            className: classnames(item.props.className),
          });
        }
      });
    }
  };

  useEffect(() => {
    const input = document.getElementById(`${inputId}`);
    const handleFocus = () => {
      setShowList(true);
    };
    input?.addEventListener("focus", handleFocus);
  }, [inputId]);

  useEffect(() => {
    const input = document.getElementById(`${inputId}`);
    const inputBody = document.querySelector(
      `.input-body[data-id="${inputId}"]`
    );

    const handleClickOutside = () => setShowList(false);
    if (mode === "single" && OptionRender) {
      input?.classList.add("hidden");
    }
    if (inputBody) {
      const removeListener = onClickOutside(
        inputBody as HTMLElement,
        handleClickOutside
      );
      return () => removeListener();
    }
  }, [inputId, mode, OptionRender]);

  return (
    <div className={classnames("select", { active: showList })} style={style}>
      <div className="title">{title}</div>
      <div className="input-body" data-id={inputId}>
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
          {mode === "multiple" &&
            (value as SelectInputOption[]).length > 0 &&
            !OptionRender && (
              <div className="tags">
                {(value as SelectInputOption[]).map((item) => (
                  <Tag
                    key={item.value}
                    data={item as any}
                    onClick={onItemClickHandler as () => void}
                  />
                ))}
              </div>
            )}
          {mode === "multiple" &&
            (value as SelectInputOption[]).length > 0 &&
            OptionRender && (
              <div className="tags">
                {(value as SelectInputOption[]).map((item) => (
                  <Tag
                    key={(item as any)["data-value"]}
                    data={{
                      label: item["data-label"] as string,
                      image: item["data-image"] as string,
                    }}
                    onClick={onItemClickHandler as () => void}
                  />
                ))}
              </div>
            )}
          <div className="input-wrapper">
            {mode === "single" && !OptionRender && (
              <div className="single-input-wrapper">
                <input
                  id={inputId}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    (value as SelectInputOption)?.label || placeholder
                  }
                />
              </div>
            )}

            {mode === "single" && OptionRender && (
              <div className="single-input-wrapper">
                <input
                  id={inputId}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    (value as SelectInputOption)?.label || placeholder
                  }
                />
                <span id="renderElementPlace">{renderSelectedElement()}</span>
              </div>
            )}

            {mode === "multiple" && (
              <input
                id={inputId}
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
            onClick={(e) => {
              e.stopPropagation();
              setShowList(!showList);
            }}
          >
            <img id="opened-icon" src={Chevron} alt="dropdown" />
          </div>
        </div>
        <OptionsList
          value={value}
          options={optionsShouldRender}
          isVisible={showList}
          optionRender={OptionRender ? (renderElement as any) : null}
          onItemClickHandler={onItemClickHandler}
        />
      </div>
      <div className="description">{description}</div>
    </div>
  );
}

SelectInput.Option = Option;

export default SelectInput;
