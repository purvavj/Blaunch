import JSZip from "jszip";
import { saveAs } from "file-saver";

type Options = {
  framework: "react" | "vue" | "vanilla";
  typescript: boolean;
  tailwind: boolean;
  prettier: boolean;
};

export async function generateProject(options: Options) {
  const zip = new JSZip();
  const ext = options.typescript ? "ts" : "js";

  // Basic folder structure
  zip.file("index.html", `<!DOCTYPE html>
<html>
<head>
  <title>My BunPlay App</title>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="src/main.${ext}"></script>
</body>
</html>`);

  zip.file(`src/main.${ext}`, getMainFile(options.framework, ext));
  zip.file("package.json", JSON.stringify(getPackageJson(options), null, 2));

  if (options.tailwind) {
    zip.file("tailwind.config.js", `module.exports = { content: ["./src/**/*.{js,ts,jsx,tsx}"], theme: {}, plugins: [], }`);
  }

  if (options.prettier) {
    zip.file(".prettierrc", JSON.stringify({ semi: true, singleQuote: true }, null, 2));
  }

  const blob = await zip.generateAsync({ type: "blob" });
  saveAs(blob, "blaunch-starter.zip");
}

function getMainFile(framework: string, ext: string): string {
  if (framework === "react") {
    return `import React from "react";
import ReactDOM from "react-dom/client";

const App = () => <h1>Hello from React!</h1>;

ReactDOM.createRoot(document.getElementById("app")!).render(<App />);`;
  }

  if (framework === "vue") {
    return `import { createApp } from 'vue'

const App = {
  template: '<h1>Hello from Vue!</h1>'
};

createApp(App).mount('#app');`;
  }

  // Vanilla
  return `document.getElementById("app").innerText = "Hello from Vanilla JS!";`;
}

function getPackageJson({ framework, typescript }: Options) {
  const base = {
    name: "blaunch-app",
    version: "1.0.0",
    scripts: {
      dev: "bun dev",
    },
    dependencies: {},
    devDependencies: {},
  };

  if (framework === "react") {
    base.dependencies = {
      react: "^18.0.0",
      "react-dom": "^18.0.0",
    };
  } else if (framework === "vue") {
    base.dependencies = {
      vue: "^3.0.0",
    };
  }

  if (typescript) {
    base.devDependencies = {
      typescript: "^5.0.0",
    };
  }

  return base;
}
