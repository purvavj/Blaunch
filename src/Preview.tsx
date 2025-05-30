import React, { useEffect, useRef, useState } from "react";

type PreviewProps = {
  code: string;
  runTrigger: number;
};

const Preview: React.FC<PreviewProps> = ({ code, runTrigger }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!iframeRef.current) return;
    setError(null);

    // Inject raw HTML+JS into iframe
    const html = `<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 1rem;
        background: #1e1e1e;
        color: #fff;
        font-family: sans-serif;
      }
    </style>
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      try {
        ${code}
      } catch (e) {
        document.body.innerHTML =
          '<pre style="color:red;">' + e + '</pre>';
      }
    </script>
  </body>
</html>`;

    iframeRef.current.srcdoc = html;
  }, [runTrigger]); // only when you click “Run Code”

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <iframe
        ref={iframeRef}
        sandbox="allow-scripts"
        style={{
          flex: 1,
          border: "none",
          borderRadius: 8,
          background: "#1e1e1e",
        }}
        title="Live Preview"
      />
      {error && (
        <pre
          style={{
            marginTop: 8,
            color: "salmon",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
          }}
        >
          {error}
        </pre>
      )}
    </div>
  );
};

export default Preview;
