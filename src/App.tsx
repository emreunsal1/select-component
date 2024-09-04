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
        options={options.map((item) => ({
          label: item.title,
          value: item.title,
        }))}
      ></SelectInput>
    </div>
  );
}

export default App;
