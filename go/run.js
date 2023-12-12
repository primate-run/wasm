import { Path } from "rcompat/fs";
import { serve } from "rcompat/http";

import Go from "./wasm_exec.js";
Go();

const cwd = await new Path(import.meta.url);
const { directory } = cwd;
const file = await directory.join("routes", "route.wasm").arrayBuffer();
const typedArray = new Uint8Array(file);

const go = new globalThis.Go();
await WebAssembly.instantiate(typedArray, {
  ...go.importObject,
  env: {}}).then(async result => {
    go.run(result.instance);
  serve(request => {
    const get = globalThis.Get;
    const sp = JSON.stringify(Object
      .fromEntries(new URL(request.url).searchParams.entries()));
    const response = get({
      url: new URL(request.url),
      search_params: sp,
      view: (component = "component", props) => JSON.stringify(({
        component,
        props,
      })),
    });
    const $response = typeof response === "object" ? JSON.stringify(response) : response;
    return new Response($response);
  }, {host: "0.0.0.0", port: 6161});
});
