import { Path } from "rcompat/fs";
import { DefaultRubyVM } from "./node.esm.js";

const bin = await new Path("./ruby.wasm").arrayBuffer();
const get = await new Path("./index.rb").text();
const module = await WebAssembly.compile(bin);
const { vm } = await DefaultRubyVM(module);
const t = await vm.eval(`
  ${get}
`);
const url = new URL("https://primatejs.com?foo=bar#test");
const request = {
  url: new URL("https://primatejs.com#test"),
  query: {
    get(name) {
      return url.searchParams.get(name);
    }
  },
};

console.log(t.call("run_post", vm.wrap(request)).toString());
