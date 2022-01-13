import React from "react";
import io from "socket.io-client";
import { useEffect, useRef } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import "xterm/css/xterm.css";
import "./terminal.css";

const TerminalEditor = () => {
  const terminalContainer = useRef(null);
  useEffect(() => {
    const socket = io.connect("http://localhost:4000");
    const term = new Terminal({ cursorBlink: true });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(terminalContainer.current);
    fitAddon.fit();
    socket.on("connect", function () {
      term.write("\r\n*** Connected to backend***\r\n");

      // Browser -> Backend
      term.onData((data) => {
        socket.emit("data", data);
      });

      // Backend -> Browser
      socket.on("data", function (data) {
        term.write(data);
      });

      socket.on("disconnect", function () {
        term.write("\r\n*** Disconnected from backend***\r\n");
      });
    });
  }, []);

  return (
    <div>
      <div id="terminal-container" ref={terminalContainer}></div>
    </div>
  );
};

export default TerminalEditor;
