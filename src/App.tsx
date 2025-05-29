import "./App.css";
import { useState } from "react";
import { generateProject } from "./generateProject";
import LivePreview from "./components/LivePreview";


function App() {
  const [framework, setFramework] = useState<"react" | "vue" | "vanilla">("react");
  const [options, setOptions] = useState({
    typescript: true,
    tailwind: false,
    prettier: false,
  });

  const toggleOption = (key: keyof typeof options) => {
    setOptions({ ...options, [key]: !options[key] });
  };

  const handleGenerate = () => {
    generateProject({ framework, ...options });
  };

  return (
  <>
    <video autoPlay muted loop playsInline className="background-video">
      <source src="/bg1.mp4" type="video/mp4" />
    </video>
    <div className="app-background" />    

    <img
      src="/logo.png"
      alt="Bun logo"
      className="bun-logo"
    />

    {/* Updated layout wrapper */}
    <main className="blaunch-container">
      {/* Left side: form */}
      <div className="form-pane">
        <h1>Blaunch</h1>
        <p>Instantly generate a Bun-powered frontend starter kit.</p>

        <section>
          <h3>Choose your framework:</h3>
          {["react", "vue", "vanilla"].map((fw) => (
            <label key={fw} style={{ display: "block", marginBottom: "0.5rem" }}>
              <input
                type="radio"
                name="framework"
                value={fw}
                checked={framework === fw}
                onChange={() => setFramework(fw as "react" | "vue" | "vanilla")}
              />
              {fw.charAt(0).toUpperCase() + fw.slice(1)}
            </label>
          ))}

          <h3>Optional tools:</h3>
          {["typescript", "tailwind", "prettier"].map((opt) => (
            <label key={opt} style={{ display: "block", marginBottom: "0.5rem" }}>
              <input
                type="checkbox"
                checked={options[opt as keyof typeof options]}
                onChange={() => toggleOption(opt as keyof typeof options)}
              />
              {opt.charAt(0).toUpperCase() + opt.slice(1)}
            </label>
          ))}

          <button onClick={handleGenerate}>Generate Project</button>
        </section>
      </div>

      {/* Right side: live preview */}
      <div className="preview-pane">
        <LivePreview framework={framework} options={options} />
      </div>
    </main>
  </>
  );
}

export default App;
