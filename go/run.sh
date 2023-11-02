cd routes
GOOS=js GOARCH=wasm go build -o route.wasm route.go
cd ..
node run.js
