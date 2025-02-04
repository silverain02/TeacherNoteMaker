import { useState } from "react";
import useAnalyzeSyntax from "../apis/post/useAnalyzeSyntax";

const AnalyzeSyntaxComponent = () => {
  const [text, setText] = useState("");
  const { mutate, data, error } = useAnalyzeSyntax();

  const handleAnalyze = () => {
    mutate(text);
  };

  return (
    <div>
      <h1>Analyze Syntax</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to analyze"
      />
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Analysis Result</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AnalyzeSyntaxComponent;
