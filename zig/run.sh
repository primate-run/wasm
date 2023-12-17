zig build-exe -O ReleaseSmall -target wasm32-wasi --export=get index.zig
node run.js
