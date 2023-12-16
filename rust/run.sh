cd routes
rustc --target wasm32-wasi route.rs
cd ..
node run.js
