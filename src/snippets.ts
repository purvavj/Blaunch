export function getSnippet(
  framework: "react" | "vanilla",
  language: "typescript" | "javascript"
): string {
  if (framework === "react" && language === "typescript") {
    return `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React + TypeScript!</h1>;

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);`;
  }
  if (framework === "react" && language === "javascript") {
    return `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React + JavaScript!</h1>;

ReactDOM.createRoot(document.getElementById("app")).render(<App />);`;
  }
  if (framework === "vanilla" && language === "typescript") {
    return `const message: string = "Hello from Vanilla TypeScript!";
document.getElementById("app")!.innerText = message;`;
  }
  // vanilla + javascript
  return `document.getElementById("app").innerText = "Hello from Vanilla JavaScript!";`;
}
