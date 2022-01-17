import React from "react";

export default function CustomInput({ value, onChange }) {
  return (
    <div className="compiler__custom__input block">
      <p className="text-white">Custom Input</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-black"
      ></textarea>
    </div>
  );
}
