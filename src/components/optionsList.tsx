import React, { useEffect, useState } from "react";
import CheckIcon from "../assets/check.svg";

interface Option {
  label: string;
  value: string;
  isActive?: boolean;
}

interface OptionsListProps {
  options: Option[];
  isVisible: boolean;
  value: Option;
  onSelectHandler: (option: Option) => void;
}

const OptionsList: React.FC<OptionsListProps> = ({
  options,
  isVisible,
  value,
  mode,
  onSelectHandler,
}) => {
  const [newOptions, setNewOptions] = useState(options);
  useEffect(() => {
    let mappingOptions = [];
    if (mode == "single") {
      mappingOptions = options.map((option) => {
        option.isActive = false;
        if (value.label == option.label) {
          option.isActive = true;
        }
        return option;
      });
      setNewOptions(mappingOptions);
      return;
    }

    mappingOptions = options.map((option) => {
      if (value.some((item) => item.value === option.value)) {
        option.isActive = true;
        return option;
      }
      option.isActive = false;
      return option;
    });
    setNewOptions(mappingOptions);
  }, [value, options]);

  if (!isVisible) {
    return null;
  }

  const itemClickHandler = (option: Option) => {
    delete option.isActive;
    onSelectHandler(option);
  };

  return (
    <div className="options-list">
      {newOptions &&
        newOptions.map((option) => (
          <div
            className={option.isActive ? "option-item active" : "option-item"}
            onClick={() => itemClickHandler(option)}
            id={option.value}
            key={option.value}
          >
            <div className="text">{option.label}</div>
            {option.isActive && (
              <div className="active-icon">
                <img src={CheckIcon} alt="Check Icon" />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default OptionsList;
