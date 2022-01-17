import React from "react";
export default function OutputBox({ state, input, results }) {
  return (
    <div
      className={
        state === "Uploading..." || state === "Processing..."
          ? "output__box progress"
          : state === "error"
          ? "output__box error"
          : "output__box"
      }
    >
      <div className="output__header">Compilation Status</div>
      <div className="output__state">{state != null && state}</div>
      {state === "error" && (
        <div className="error__box">
          <div className="error__box__header">Message</div>
          <div className="details__box">{results?.output}</div>

          <div className="execution__details">
            Check your code for errors & try again
          </div>
        </div>
      )}
      {state === "successful" && (
        <div className="result__box">
          <div className="input__details">
            <div className="header">Input</div>
            <div className="details__box">{input}</div>
          </div>

          <div className="output__details">
            <div className="header">Output</div>
            <div className="details__box">{results?.output}</div>
          </div>

          <div className="execution__details">
            Code executed in <span>{results?.time} ms</span> with{" "}
            <span>{results?.memory} bytes</span> of space.
          </div>
        </div>
      )}
    </div>
  );
}
