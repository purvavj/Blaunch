import React, { useState } from "react";

type Props = {
  framework: "react" | "vue" | "vanilla";
  options: {
    typescript: boolean;
    tailwind: boolean;
    prettier: boolean;
  };
};

const LivePreview: React.FC<Props> = ({ framework, options }) => {
  const [activeFile, setActiveFile] = useState("index.html");

  const ext = options.typescript ? "ts" : "js";

  const fileContents: Record<string, string> = {
    "index.html": `<!DOCTYPE html>
<html>
  <head><title>Blaunch App</title></head>
  <body>
    <div id="app"></div>
    <script type="module" src="src/main.${ext}"></script>
  </body>
</html>`,

    [`src/main.${ext}`]:
      framework === "react"
        ? `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React!</h1>;

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);`
        : framework === "vue"
        ? `import { createApp } from 'vue'

const App = {
  template: '<h1>Hello from Vue!</h1>'
};

createApp(App).mount('#app');`
        : `document.getElementById("app").innerText = "Hello from Vanilla JS!";`,

    "package.json": JSON.stringify(
      {
        name: "blaunch-app",
        version: "1.0.0",
        scripts: { dev: "bun dev" },
        dependencies:
          framework === "react"
            ? { react: "^18.0.0", "react-dom": "^18.0.0" }
            : framework === "vue"
            ? { vue: "^3.0.0" }
            : {},
        devDependencies: options.typescript ? { typescript: "^5.0.0" } : {},
      },
      null,
      2
    ),

    ...(options.tailwind && {
      "tailwind.config.js": `module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  plugins: [],
};`,
    }),

    ...(options.prettier && {
      ".prettierrc": JSON.stringify(
        { semi: true, singleQuote: true },
        null,
        2
      ),
    }),
  };

  const files = Object.keys(fileContents);

  return (
    <>
  <h3 style={{ marginBottom: "1rem"}}>File Structure</h3>
  <div style={{ display: "flex", gap: "1rem" }}>
    <div style={{ flexShrink: 0 }}>
      {files.map((file) => (
        <div
          key={file}
          onClick={() => setActiveFile(file)}
          style={{
            padding: "0.5rem",
            cursor: "pointer",
            fontWeight: activeFile === file ? "bold" : "normal",
            color: activeFile === file ? "#a600ff" : "#ffffff",
          }}
        >
          {file}
        </div>
      ))}
    </div>
    <pre
      style={{
        background: "rgba(255,255,255,0.05)",
        padding: "1rem",
        borderRadius: "8px",
        overflowX: "auto",
        overflowY: "auto",
        maxHeight: "70vh",
        width: "100%",
        fontSize: "0.85rem",
        whiteSpace: "pre-wrap",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {fileContents[activeFile] || "// Select a file to preview"}
    </pre>
  </div>
</>
  );
};

export default LivePreview;
