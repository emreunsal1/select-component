import SelectInput from "./components/selectInput";
import searchSvg from "./assets/search.svg";
import { useState } from "react";

const data = [
  {
    userId: 1,
    id: 1,
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    userId: 1,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
  {
    userId: 1,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit",
  },
];

function App() {
  const [selectedElement, setSelectedElement] = useState([]);
  const onSelectHandler = (selectedElements) => {
    setSelectedElement(selectedElements);
  };
  return (
    <div>
      <SelectInput
        description={"This is a hint text help a user"}
        placeholder={"placeHolder"}
        icon={searchSvg}
        title={"Team Member"}
        onChange={onSelectHandler}
        value={selectedElement}
        options={data.map((item) => ({
          value: item.id,
          label: item.title,
        }))}
      />
    </div>
  );
}

export default App;
