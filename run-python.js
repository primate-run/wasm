import { Path } from "rcompat/fs";
import { serve } from "rcompat/http";
import { loadPyodide as load } from "pyodide";

const cwd = await new Path(import.meta.url);
const { directory } = cwd;
const file = await directory.join("index.py").text();
const pyodide = await load({ indexURL: "./node_modules/pyodide" });

serve(request => {
  pyodide.runPython(file);

  const get = pyodide.globals.get("get");
  const response = get({
    url: new URL(request.url),
  });

  return new Response(response);
}, { host: "0.0.0.0", port: 6161 });
