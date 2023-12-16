import { Path } from "rcompat/fs";
import { WASI } from "wasi";
import { serve } from "rcompat/http";

const cwd = await new Path(import.meta.url);
const { directory } = cwd;
const file = await directory.join("routes", "route.wasm").arrayBuffer();
const typedArray = new Uint8Array(file);

const wasi = new WASI({ version: "preview1" });
const { instance } = await WebAssembly.instantiate(typedArray, wasi.getImportObject());
wasi.start(instance);

const { get, get_len, memory } = instance.exports;

serve(_ => {
  const buffer = new Uint8Array(memory.buffer, get(), get_len());
  return new Response(String.fromCharCode(...buffer));
}, {host: "0.0.0.0", port: 6161});
