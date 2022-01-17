import { useState, useEffect } from "react";
import { submitCodeToJudge } from "./helpers/judge";
import { playground_samples } from "./helpers/constants";
import CustomInput from "./components/CustomInput";
import EditorHeader from "./components/EditorHeader";
import OutputBox from "./components/OutputBox";
import Editor from "@monaco-editor/react";
import Loader from "./components/Loader";
import "./App.css";

function App() {
  const [selectedLang, setSelectedLang] = useState("java");
  const [code, setCode] = useState(
    window.atob(playground_samples[selectedLang])
  );
  const [customInput, setCustomInput] = useState("");
  const [outputState, setOutputState] = useState(null);
  const [outputData, setOutputData] = useState(null);

  useEffect(() => {
    setCode(window.atob(playground_samples[selectedLang]));
  }, [selectedLang]);

  const runCode = async () => {
    setOutputState("Uploading...");
    setTimeout(() => setOutputState("Processing..."), 1000);
    const response = await submitCodeToJudge({
      code: code,
      language: selectedLang,
      input: customInput,
    });
    if (response.type === "ok") {
      setOutputState("successful");
      setOutputData({
        memory: response.memory,
        time: response.time,
        output: response.output,
      });
    } else if (response.type === "error") {
      setOutputState("error");
      setOutputData({
        output: response.output,
      });
    } else if (response.type === "compilation_error") {
      setOutputState("error");
      setOutputData({
        output: response.output,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <p className="text-left text-white">Online Complier</p>
      </div>
      <div>
        <EditorHeader
          selectedLang={selectedLang}
          onChange={(e) => setSelectedLang(e)}
        />
        <Editor
          height="80vh"
          defaultLanguage={selectedLang}
          theme="vs-dark"
          defaultValue={code}
          onChange={(value) => {
            setCode(value);
          }}
          language={selectedLang}
          value={code}
          loading={<Loader />}
          options={{
            scrollBeyondLastLine: false,
          }}
        />
        <div className="flex justify-between text-white">
          <CustomInput
            value={customInput}
            onChange={(e) => setCustomInput(e)}
          />
          <button onClick={runCode} className="run__code__btn">
            Run Code
          </button>
        </div>
      </div>
      {outputState != null && (
        <OutputBox
          input={customInput}
          state={outputState}
          results={outputData}
        />
      )}
    </div>
  );
}

export default App;
