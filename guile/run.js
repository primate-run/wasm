import Scheme from "./reflect.js";

const [message] = await Scheme.load_main("hello.wasm", {});
console.log(message);
