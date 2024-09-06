import SelectInput from "./components/selectInput";
import searchSvg from "./assets/search.svg";
import { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  APIResponse,
  ExampleData,
  SelectInputOption,
  SelectInputProps,
} from "./types";
import CheckIcon from "./assets/check.svg";

function App() {
  const [singleElement, setSingleElement] = useState([]);
  const [singleRenderElement, setSingleRenderElement] = useState([]);
  const [multipleElement, setMultipleElement] = useState([]);
  const [multipleRenderElement, setMultipleRenderElement] = useState([]);

  const { data: options = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.data),
  });

  const exampleData = [
    {
      id: 1,
      name: "Olivia Rhye",
      username: "olivia",
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      id: 2,
      name: "Phoenix Baker",
      username: "phoenix",
      avatar:
        "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=",
    },
    {
      id: 3,
      name: "Olivia Rhye",
      username: "olivia",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&s",
      selected: true,
    },
    {
      id: 4,
      name: "Lana Steiner",
      username: "lana",
      avatar:
        "https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/7d2a57d4-23ee-4ccf-b34c-bd6ddbb1f4a8/width=450/00000-3694828998-A%20professional%20profile%20photo%20for%20linkedin%20of%20%20man,%20%20business%20clothing,%20at%20office,%20bokeh%20background,%20deep%20of%20field,%20kkw-ph1%20_lora.jpeg",
    },
    {
      id: 5,
      name: "Demi Wilkinson",
      username: "demi",
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
    {
      id: 6,
      name: "Candice Wu",
      username: "candice",
      avatar:
        "https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?b=1&s=612x612&w=0&k=20&c=hEPh7-WEAqHTHdQtPrfEN9-yYCiPGKvD32VZ5lcL6SU=",
    },
    {
      id: 7,
      name: "Natali Craig",
      username: "natali",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC8kiSH5ZSAcVoj3tAQQDoP_ux0sSricMyUg&s",
    },
    {
      id: 8,
      name: "Drew Cano",
      username: "drew",
      avatar:
        "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg",
    },
  ];
  return (
    <div className="app-example-wrapper">
      <h1>Select Component Example</h1>
      <div className="row">
        <SelectInput
          description="This is a hint text help a user"
          placeholder="placeHolder"
          icon={searchSvg}
          title="Options render Single"
          onChange={(data) => setSingleRenderElement(data)}
          value={singleRenderElement}
          mode="single"
          options={exampleData.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          optionRender={() =>
            exampleData.map((option: ExampleData) => (
              <div
                className="render-option"
                key={option.id}
                value={(option as ExampleData).id}
                label={option.name}
                image={option.avatar}
              >
                <div className="option-content">
                  <div className="option-image">
                    <img src={option.avatar}></img>
                  </div>
                  {option.name} <span>@{option.username}</span>
                </div>
                <div className="active-icon">
                  <img src={CheckIcon} alt="Check Icon" />
                </div>
              </div>
            ))
          }
        ></SelectInput>
      </div>
      <div className="row">
        <SelectInput
          description="This is a hint text help a user"
          placeholder="placeHolder"
          icon={searchSvg}
          title="Options render Multiple"
          onChange={(data) => setMultipleRenderElement(data)}
          value={multipleRenderElement}
          mode="multiple"
          options={exampleData.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          optionRender={() =>
            exampleData.map((option: ExampleData) => (
              <div
                className="render-option"
                key={option.id}
                value={(option as ExampleData).id}
                label={option.name}
                image={option.avatar}
              >
                <div className="option-content">
                  <div className="option-image">
                    <img src={option.avatar}></img>
                  </div>
                  {option.name} <span>@{option.username}</span>
                </div>
                <div className="active-icon">
                  <img src={CheckIcon} alt="Check Icon" />
                </div>
              </div>
            ))
          }
        ></SelectInput>
      </div>
      <div className="row">
        <SelectInput
          description="This is a hint text help a user"
          placeholder="placeHolder"
          icon={searchSvg}
          title="Options single"
          onChange={(data) => setSingleElement(data)}
          value={singleElement}
          mode="single"
          options={options.map((item: APIResponse) => ({
            label: item.title,
            value: item.id,
          }))}
        ></SelectInput>
      </div>
      <div className="row">
        <SelectInput
          description="This is a hint text help a user"
          placeholder="placeHolder"
          icon={searchSvg}
          title="Options Multiple"
          onChange={(data) => setMultipleElement(data)}
          value={multipleElement}
          mode="multiple"
          options={options.map((item: APIResponse) => ({
            label: item.title,
            value: item.id,
          }))}
        ></SelectInput>
      </div>
    </div>
  );
}

export default App;
