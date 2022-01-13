// SUPPORTED LANGUAGES
const supported_languages = [
  {
    option: "JavaScript",
    value: "javascript",
  },
  {
    option: "C",
    value: "c",
  },
  {
    option: "C++",
    value: "cpp",
  },
  {
    option: "Java",
    value: "java",
  },
  {
    option: "Python",
    value: "python",
  },
];

// Playground Sample Codes in Base64
const playground_samples = {
  java: "aW1wb3J0IGphdmEuaW8uKjsKaW1wb3J0IGphdmEudXRpbC4qOwppbXBvcnQgamF2YS50ZXh0Lio7CmltcG9ydCBqYXZhLm1hdGguKjsKaW1wb3J0IGphdmEudXRpbC5yZWdleC4qOwoKcHVibGljIGNsYXNzIE1haW4gewoKIHB1YmxpYyBzdGF0aWMgdm9pZCBtYWluKFN0cmluZ1tdIGFyZ3MpIHsKICAgICAgLy8gWW91ciBDb2RlIEhlcmUgIAogICAgICBTeXN0ZW0ub3V0LnByaW50bG4oIkhlbGxvIFdvcmxkIik7CiAgICB9Cn0=",

  cpp: "I2luY2x1ZGUgPGNtYXRoPgojaW5jbHVkZSA8Y3N0ZGlvPgojaW5jbHVkZSA8dmVjdG9yPgojaW5jbHVkZSA8aW9zdHJlYW0+CiNpbmNsdWRlIDxhbGdvcml0aG0+CnVzaW5nIG5hbWVzcGFjZSBzdGQ7CgppbnQgbWFpbigpIHsKICAvL1lvdXIgQ29kZSBIZXJlCiAgY291dDw8IkhlbGxvIENvZGVyUmFuayEiOwogIHJldHVybiAwOwp9",

  python: "IyBZb3VyIENvZGUgSGVyZQpwcmludCgiSGVsbG8gQ29kZXJSYW5rIik=",

  javascript: "Y29uc29sZS5sb2coJ0hlbGxvIFdvcmxkIScp",

  c: "I2luY2x1ZGUgPHN0ZGlvLmg+CmludCBtYWluKCkKewogICAgcHJpbnRmKCJIZWxsbyBXb3JsZCIpOwoKICAgIHJldHVybiAwOwp9",
};

export { supported_languages, playground_samples };
