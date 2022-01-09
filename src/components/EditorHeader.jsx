import React from 'react';

import { supported_languages } from '../helpers/constants';

export default function EditorHeader({ selectedLang, onChange }) {
  return (
    <div className="container justify-between flex">
      <p className='text-white'>Language</p>
      <select value={selectedLang} onChange={(e) => onChange(e.target.value)}>
        {supported_languages.map((lang, index) => (
          <option key={index} value={lang.value}>
            {lang.option}
          </option>
        ))}
      </select>
    </div>
  );
}
