import React from "react";

interface Option {
  label: string;
  value: string;
}

interface OptionsListProps {
  options: Option[];
  isVisible: boolean;
  onChangeHandler: (option: Option) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  isVisible,
  onChangeHandler,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <div className="options-list">
      {options.map((option) => (
        <div
          className="option-item"
          onClick={() => onChangeHandler(option)}
          id={option.value}
          key={option.value}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

export default OptionsList;
