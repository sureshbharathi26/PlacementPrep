import React from "react";
import Select from "react-select";
import "../components/Navbar2.css";

const Navbar2 = ({
  userLanguage,
  setUserLanguage,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const languages = [
    { value: "c", label: "C", name: "C" },
    { value: "cpp", label: "C++", name: "C++" },
    { value: "python", label: "Python", name: "Python" },
    { value: "java", label: "Java", name: "Java" },
    {
      value: "javascript",
      label: "JavaScript (Node.js 12.14.0)",
      name: "JavaScript (Node.js 12.14.0)",
    },
  ];
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: "#007bff", color: "#fff" }}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <h4 className="text-white mb-0">CodeLab</h4>
          <Select
            options={languages}
            value={languages.find((lang) => lang.value === userLanguage)}
            onChange={(e) => setUserLanguage(e.value)}
            placeholder="Select Language"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#ffffff",
                borderColor: "#0056b3",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#333",
              }),
            }}
          />
          <Select
            options={themes}
            value={themes.find((theme) => theme.value === userTheme)}
            onChange={(e) => setUserTheme(e.value)}
            placeholder="Select Theme"
            styles={{
              control: (base) => ({
                ...base,
                backgroundColor: "#ffffff",
                borderColor: "#0056b3",
              }),
              singleValue: (base) => ({
                ...base,
                color: "#333",
              }),
            }}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <label className="text-white mb-0">Font Size</label>
          <input
            type="range"
            min="16"
            max="30"
            value={fontSize}
            step="1"
            onChange={(e) => setFontSize(e.target.value)}
            className="form-range"
            style={{ width: "150px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
