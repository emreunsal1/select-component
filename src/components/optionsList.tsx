import React from "react";
import CheckIcon from "../assets/check.svg";
import { SelectInputOption, SelectInputProps } from "../types";

interface Option extends SelectInputOption {
  isActive?: boolean;
}

interface OptionsListProps {
  options: Option[];
  isVisible: boolean;
  value: Option | Option[];
  optionRender: SelectInputProps["optionRender"];
  onItemClickHandler: (option: Option) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  isVisible,
  value,
  optionRender: OptionRender,
  onItemClickHandler,
}) => {
  if (!isVisible) {
    return null;
  }

  const itemClickHandler = (option: Option) => {
    onItemClickHandler(option);
  };

  if (OptionRender) {
    return (
      <div className="options-list">
        {options.map((option) => (
          <div
            className="option-list-custom-item"
            onClick={() => onItemClickHandler(option)}
          >
            <OptionRender
              label={option.label}
              value={option.value}
            ></OptionRender>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="options-list">
      {options.map((option) => (
        <OptionListItem
          value={value}
          key={option.value}
          option={option}
          onClick={() => itemClickHandler(option)}
        />
      ))}
    </div>
  );
};

const OptionListItem = ({
  option,
  value,
  onClick,
}: {
  value: Option | Option[];
  option: Option;
  onClick: (data: Option) => void;
}) => {
  const calculateIsActive = () => {
    if (Array.isArray(value)) {
      return value.some((_item) => option.value === _item.value);
    }
    return value.value === option.value;
  };

  const isActive = calculateIsActive();

  return (
    <div
      className={isActive ? "option-item active" : "option-item"}
      onClick={() => onClick(option)}
      key={option.value}
    >
      <div className="text">{option.label}</div>
      {isActive && (
        <div className="active-icon">
          <img src={CheckIcon} alt="Check Icon" />
        </div>
      )}
    </div>
  );
};

export default OptionsList;
