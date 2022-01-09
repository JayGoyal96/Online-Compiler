import { useState, useEffect } from 'react';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/dracula.css';
import CodeMirror from '@uiw/react-codemirror';
import { submitCodeToJudge } from './helpers/judge';
import { playground_samples } from './helpers/constants';
import CustomInput from './components/CustomInput';
import EditorHeader from './components/EditorHeader';
import OutputBox from './components/OutputBox';

function App() {
  const [selectedLang, setSelectedLang] = useState('java');
  const [code, setCode] = useState(
    window.atob(playground_samples[selectedLang])
  );
  const [customInput, setCustomInput] = useState('');
  const [outputState, setOutputState] = useState(null);
  const [outputData, setOutputData] = useState(null);
  useEffect(() => {
    setCode(window.atob(playground_samples[selectedLang]));
  }, [selectedLang]);

  const runCode = async () => {
    console.log('Running Code');
    setOutputState('Uploading...');

    setTimeout(() => setOutputState('Processing...'), 1000);

    const response = await submitCodeToJudge({
      code: code,
      language: selectedLang,
      input: customInput,
    });

    console.log(response);

    if (response.type === 'ok') {
      setOutputState('successful');
      setOutputData({
        memory: response.memory,
        time: response.time,
        output: response.output,
      });
    } else if (response.type === 'error') {
      setOutputState('error');
      setOutputData({
        output: response.output,
      });
    } else if (response.type === 'compilation_error') {
      setOutputState('error');
      setOutputData({
        output: response.output,
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className='bg-gray-900'>
        <p className="text-left text-white">Online Complier</p>
      </div>
      <div className="bg-gray-800">
        <EditorHeader
          selectedLang={selectedLang}
          onChange={(e) => setSelectedLang(e)}
        />
        <CodeMirror
          value={code}
          options={{
            theme: 'dracula',
            keyMap: 'sublime',
            mode: `${selectedLang}`,
          }}
          onChange={(editor, data, value) => {
            setCode(editor.getValue());
          }}
          className="w-96 h-80 overflow-visible"
        />
        <div className="flex justify-between">
          <CustomInput
            value={customInput}
            onChange={(e) => setCustomInput(e)}
          />
          <button onClick={runCode} className="run__code__btn">
            Run Code
          </button>
        </div>
        {outputState != null && (
          <OutputBox
            input={customInput}
            state={outputState}
            results={outputData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
