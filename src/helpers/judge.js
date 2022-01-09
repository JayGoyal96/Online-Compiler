const languageToJudgeID = (lang) => {
  switch (lang) {
    case "cpp":
      return 52;

    case "java":
      return 62;

    case "c":
      return 50;

    case "python":
      return 71;

    case "js":
      return 63;

    default:
      break;
  }
};

const submitCodeToJudge = async ({ code, input, language }) => {
  const response = await fetch(
    "https://judge0-extra.p.rapidapi.com/submissions",
    {
      method: "POST",
      headers: {
        "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
        "x-rapidapi-key": "e8abaa0200msh59a32d40ecc9995p18b3fejsn889f45871e5c",
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        source_code: code,
        stdin: input,
        language_id: languageToJudgeID(language),
      }),
    }
  );

  const jsonResponse = await response.json();

  console.log(jsonResponse);
  let jsonGetSolution = {
    status: { description: "Queue" },
    stderr: null,
    compile_output: null,
  };

  while (
    jsonGetSolution.status.description !== "Accepted" &&
    jsonGetSolution.stderr == null &&
    jsonGetSolution.compile_output == null
  ) {
    if (jsonResponse.token) {
      let url = `https://judge0-ce.p.rapidapi.com/submissions/${jsonResponse.token}?base64_encoded=true`;
      const getSolution = await fetch(url, {
        method: "GET",
        headers: {
          "x-rapidapi-host": "judge0-ce.p.rapidapi.com",
          "x-rapidapi-key":
            "e8abaa0200msh59a32d40ecc9995p18b3fejsn889f45871e5c", // Get yours for free at https://rapidapi.com/hermanzdosilovic/api/judge0
          "content-type": "application/json",
        },
      });

      jsonGetSolution = await getSolution.json();
    }
  }

  // @STATUS:accepted
  if (jsonGetSolution.stdout) {
    const _output = atob(jsonGetSolution.stdout);
    const _time = jsonGetSolution.time;
    const _memory = jsonGetSolution.memory;

    return {
      type: "ok",
      output: _output,
      time: _time,
      memory: _memory,
    };
  }

  // @STATUS:error
  else if (jsonGetSolution.stderr) {
    const _output = atob(jsonGetSolution.stderr);

    return {
      type: "error",
      output: _output,
    };
  }

  // @STATUS:compilation-error
  else {
    const _output = atob(jsonGetSolution.compile_output);

    return {
      type: "compilation_error",
      output: _output,
    };
  }
};
export { submitCodeToJudge };
