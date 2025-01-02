import * as UI from "@ui";

const Toolbar = () => {
  return (
    <div className="flex space-between gap-2 p-2 bg-gray-100 border border-gray-300 rounded-lg shadow">
      <UI.ToggleGroup
        value={["bold"]}
        onChange={() => console.log("changed")}
        type="single"
        options={[
          { value: "bold", label: "Bold" },
          { value: "italic", label: "Italic" },
          { value: "underline", label: "Underline" },
        ]}
      />
    </div>
  );
};

export default Toolbar;
