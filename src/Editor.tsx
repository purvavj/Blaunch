import React from "react";

type EditorProps = {
  code: string;
  setCode: (newCode: string) => void;
};

const Editor: React.FC<EditorProps> = ({ code, setCode }) => {
  return (
    <div>
      <h3 style={{ color: "#fff", marginBottom: "0.5rem" }}>Your Code:</h3>
      <textarea
        className="editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
      />
    </div>
  );
};

export default Editor;
