import SelectInput from "./components/selectInput";
import searchSvg from "./assets/search.svg";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  const [selectedElement, setSelectedElement] = useState([]);
  const [singleElement, setSingleElement] = useState([]);

  const onSelectHandlerMultiple = (selectedElements) => {
    setSelectedElement(selectedElements);
  };
  const onSelectHandlerSingle = (element) => {
    setSingleElement(element);
  };
  const { data: options = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data),
  });
  return (
    <div style={{ width: "100%" }}>
      <SelectInput
        description={"This is a hint text help a user"}
        placeholder={"placeHolder"}
        icon={searchSvg}
        title={"Team Member"}
        onChange={onSelectHandlerMultiple}
        value={selectedElement}
        mode={"multiple"}
      >
        {options.map((item) => (
          <SelectInput.Option key={item.id} value={item.id} label={item.title}>
            <div
              className={`render-option`}
              onClick={() => onSelectHandlerMultiple(item)}
            >
              <div className="option-image">
                <img src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"></img>
              </div>
              <div className="option-text">{item.title}</div>
            </div>
          </SelectInput.Option>
        ))}
      </SelectInput>
    </div>
  );
}

export default App;
