import { Path } from "rcompat/fs";
import { WASI } from "wasi";
import { argv, env } from 'node:process';
import { serve } from "rcompat/http";

const cwd = await new Path(import.meta.url);
const { directory } = cwd;
const file = await directory.join("index.wasm").arrayBuffer();
const wasm = new Uint8Array(file);

const wasi = new WASI({ version: 'preview1' });
const { instance } = await WebAssembly.instantiate(wasm, wasi.getImportObject());
wasi.start(instance);

const { get, memory } = instance.exports;

serve(_ => {
  const buffer = new Uint8Array(memory.buffer, get());

  let i = 0;
  let response = "";
  while (true) {
    response += String.fromCharCode(buffer[i]);
    i++;

    if (buffer[i] === 0) {
      break;
    }
  }
  return new Response(response);
}, {host: "0.0.0.0", port: 6161});
