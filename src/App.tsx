import { useState, useEffect } from "react";
import Editor from "./Editor";
import Preview from "./Preview";
import { getSnippet } from "./snippets";
import "./App.css";

function App() {
  // form state
  const [framework, setFramework] = useState<"react" | "vanilla">("react");
  const [language, setLanguage] = useState<"typescript" | "javascript">(
    "typescript"
  );

  // code in the editor
  const [code, setCode] = useState<string>("");

  // bump to re-run preview
  const [runTrigger, setRunTrigger] = useState(0);

  // reset snippet on framework/language change
  useEffect(() => {
    setCode(getSnippet(framework, language));
  }, [framework, language]);

  return (
    <>
      {/* Background video */}
      <video autoPlay muted loop playsInline className="background-video">
        <source src="/bg1.mp4" type="video/mp4" />
      </video>
      <div className="app-background" />

      {/* Neon Bun logo */}
      <img src="/logo.png" alt="Bun logo" className="bun-logo" />

      {/* Two-column layout */}
      <main className="bunplay-layout-horizontal">
        {/* LEFT: form + editor + run */}
        <div className="left-stack">
          <div className="form-header compact">
            <h1>BunPlay</h1>
            <p>A playground for beginners learning React and JavaScript.</p>

            {/* Framework selector */}
            <div className="field-group">
              <h3>Select a framework:</h3>
              <div className="inline-options">
                {(["react", "vanilla"] as const).map((fw) => (
                  <label key={fw}>
                    <input
                      type="radio"
                      name="framework"
                      value={fw}
                      checked={framework === fw}
                      onChange={() => setFramework(fw)}
                    />
                    {fw[0].toUpperCase() + fw.slice(1)}
                  </label>
                ))}
              </div>
            </div>

            {/* Language selector */}
            <div className="field-group">
              <h3>Language:</h3>
              <div className="inline-options">
                {(["typescript", "javascript"] as const).map((lang) => (
                  <label key={lang}>
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={language === lang}
                      onChange={() => setLanguage(lang)}
                    />
                    {lang[0].toUpperCase() + lang.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Code editor */}
          <Editor code={code} setCode={setCode} />

          {/* Run button */}
          <button
            className="run-button"
            onClick={() => setRunTrigger((n) => n + 1)}
          >
            Run Code
          </button>
        </div>

        {/* RIGHT: live preview */}
        <div className="right-pane">
          <h3 style={{ marginBottom: "0.5rem" }}>Preview:</h3>
          <Preview code={code} runTrigger={runTrigger} />
        </div>
      </main>
    </>
  );
}

export default App;
