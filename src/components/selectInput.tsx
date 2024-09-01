import { useState } from "react";
import Chevron from "../assets/chevron-down.svg";
import Tag from "./tag";
import OptionsList from "./optionsList";

function SelectInput({
  title,
  description,
  placeholder,
  options,
  mode,
  onChange,
  value,
  icon,
  style,
}) {
  const [inputValue, setInputValue] = useState("");
  const [isShowList, setIsShowList] = useState(false);

  const filteredOptions = options.filter((item) =>
    item.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  const optionsShouldRender = inputValue.length ? filteredOptions : options;

  const onChangeHandler = (data) => {
    const isExistValue = value.some((item) => item.value === data.value);
    if (isExistValue) {
      const filteredValue = value.filter((item) => item.value !== data.value);
      onChange(filteredValue);
    } else {
      onChange([...value, data]);
    }
  };

  return (
    <div className="select" style={style}>
      <div className="title">{title}</div>
      <div className="input-body">
        {icon && (
          <div className="icon">
            <img src={icon} alt="icon" />
          </div>
        )}
        <div className="tags">
          {value.map((item) => (
            <Tag key={item.value} data={item} onClick={onChangeHandler} />
          ))}
        </div>
        <div
          className="input-wrapper"
          onClick={() => setIsShowList(!isShowList)}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className="show-icon">
          <img src={Chevron} alt="dropdown" />
        </div>
      </div>
      <div className="description">{description}</div>

      <OptionsList
        options={optionsShouldRender}
        isVisible={isShowList}
        onChangeHandler={onChangeHandler}
      />
    </div>
  );
}

export default SelectInput;
