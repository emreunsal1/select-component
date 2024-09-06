
# SelectInput React Component

## Overview
The SelectInput component is a highly customizable React dropdown select input. It supports both single and multiple selection modes and offers advanced features like custom option rendering and dynamic filtering.

Features
- Selection Modes: Supports single and multiple selection.
- Custom Rendering: Ability to provide a custom rendering function for options.
- Dynamic Filtering: Filter options based on user input.
- Unique IDs: Each instance of the component is assigned a unique ID to avoid conflicts.


## Installation

Install my-project with npm

```bash
  git clone https://github.com/emreunsal1/select-component.git
  cd select-component

```
    
## Usage/Examples

```javascript
import React, { useState } from "react";
import SelectInput from "./path/to/SelectInput";
import { SelectInputOption } from "./path/to/types";

const options: SelectInputOption[] = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

function App() {
  const [selectedValue, setSelectedValue] = useState<SelectInputOption | SelectInputOption[] | null>(null);

  const handleChange = (option: SelectInputOption | SelectInputOption[]) => {
    setSelectedValue(option);
  };

  return (
    <SelectInput
      title="Select an Option"
      description="Choose one or more options"
      placeholder="Select..."
      options={options}
      mode="multiple" // or "single"
      onChange={handleChange}
      value={selectedValue}
    />
  );
}

export default App;

```
## Component Props
- title (string): The title of the select input.
- description (string): Additional description or information for the select input.
- placeholder (string): Placeholder text for the input field.
- options (SelectInputOption[]): Array of options to display in the dropdown.
- mode (string): Selection mode, either "single" or "multiple".
- onChange (function): Callback function to handle value changes.
- optionRender (function): Optional custom rendering function for options.
- value (SelectInputOption | SelectInputOption[]): Current selected value(s).
- icon (string): Optional icon to display in the select input.
- style (React.CSSProperties): Inline styles for the select input container.



## Custom Option Rendering
You can provide a custom rendering function for options using the optionRender prop. Here’s an example:

```javascript
<SelectInput
  title="Custom Render Example"
  options={options}
  optionRender={() => (
    <>
      <div>Custom Rendered Option 1</div>
      <div>Custom Rendered Option 2</div>
    </>
  )}
/>
```

## Handling Option Clicks
To handle clicks on options, use the onChange callback:

```javascript
<SelectInput
  title="Custom Render Example"
  options={options}
  optionRender={() => (
    <>
      <div>Custom Rendered Option 1</div>
      <div>Custom Rendered Option 2</div>
    </>
  )}
/>
```

## Development
### Running the Development Server
To start the development server and see live changes:

```javascript
npm run build
```

### Running the Development Server
To build the project for production deployment:

```javascript
npm run build
```

