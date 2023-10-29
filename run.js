import { execSync } from "node:child_process";
import { Path } from "rcompat/fs";
import { serve } from "rcompat/http";

const cwd = await new Path(import.meta.url);
const { directory } = cwd;

const command = "zig";
const args = [
  "build-lib",
  "index.zig",
  "-target wasm32-freestanding",
  "-dynamic",
  "-rdynamic"];
const cmd = [command, ...args].join(" ");
execSync(cmd, directory.path);

const file = await directory.join("index.wasm").arrayBuffer();
const typedArray = new Uint8Array(file);

let memory, response;

const decode = (pointer, length) => {
  const slice = new Uint8Array(memory.buffer, pointer, length);
  return new TextDecoder().decode(slice);
};

await WebAssembly.instantiate(typedArray, {
  env: {
    respond_string: (pointer, length) => {
      response = decode(pointer, length);
    }
  }}).then(result => {
  memory = result.instance.exports.memory;
  const get = result.instance.exports.get;
  get();
  serve(() => {
    return new Response(response);
  }, {host: "0.0.0.0", port: 6161});
});
