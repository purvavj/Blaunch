// server.js
const PORT = 5173;

Bun.serve({
  port: PORT,
  async fetch(req) {
    const url = new URL(req.url);

    // Only re-bundle on POST /bundle
    if (url.pathname === "/bundle" && req.method === "POST") {
      const rawCode = await req.text();

      // Transpile/Bundle TSX/JS → plain JS
      const result = await Bun.build({
        stdin: {
          contents: rawCode,
          resolveDir: ".",
          loader: "tsx",
        },
        bundle: true,
        format: "esm",
        target: "browser",
      });

      return new Response(result.outputFiles[0].text, {
        headers: { "Content-Type": "application/javascript" },
      });
    }

    // Serve index.html
    if (url.pathname === "/") {
      return new Response(Bun.file("index.html"));
    }

    // Serve /public/* assets
    try {
      return new Response(Bun.file("public" + url.pathname));
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
});

console.log(`🚀 BunPlay server running on http://localhost:${PORT}`);
