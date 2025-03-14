// CustomizationForm.tsx
import React from "react";

interface CustomizationFormProps {
  widgetColor: string;
  setWidgetColor: React.Dispatch<React.SetStateAction<string>>;
  widgetPosition: string;
  setWidgetPosition: React.Dispatch<React.SetStateAction<string>>;
  widgetMessage: string;
  setWidgetMessage: React.Dispatch<React.SetStateAction<string>>;
}

const CustomizationForm: React.FC<CustomizationFormProps> = ({
  widgetColor,
  setWidgetColor,
  widgetPosition,
  setWidgetPosition,
  widgetMessage,
  setWidgetMessage,
}) => {
  return (
    <div className=" bg-gradient-to-t flex flex-col items-center gap-4  from-blue-800/20 to-purple-900/10  border-teal-100/10 p-5 rounded-xl border">
      <div className="flex flex-row gap-4 w-full">
        <label htmlFor="widgetColor">Widget Color</label>
        <input
          type="color"
          id="widgetColor"
          value={widgetColor}
          className="rounded-full bg-black"
          onChange={(e) => setWidgetColor(e.target.value)}
        />
      </div>

      <div className="flex flex-row gap-4 w-full">
        <label htmlFor="widgetPosition">Widget Position</label>
        <select
          id="widgetPosition"
          value={widgetPosition}
          className="bg-teal-700/30 rounded-lg px-4 py-1"
          onChange={(e) => setWidgetPosition(e.target.value)}
        >
          <option value="bottom-right">Bottom-right</option>
          <option value="bottom-left">Bottom-left</option>
          <option value="top-right">Top-right</option>
          <option value="top-left">Top-left</option>
        </select>
      </div>

      <div className="flex flex-row gap-4 w-full">
        <label htmlFor="widgetMessage" className="whitespace-nowrap">
          Welcome Message
        </label>
        <input
          type="text"
          id="widgetMessage"
          value={widgetMessage}
          className="bg-teal-700/30 rounded-lg px-4 py-1 w-full "
          onChange={(e) => setWidgetMessage(e.target.value)}
        />
      </div>
    </div>
  );
};

export default CustomizationForm;
