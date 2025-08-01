# Install binaryen

`pacman -S binaryen` | `brew install binaryen`

# Install sdk

`curl -s "https://get.sdkman.io" | bash`
`source "$HOME/.sdkman/bin/sdkman-init.sh"`

# Install java

sdk install java 25.ea.31-graal (as of this time)

# Compile to .class

javac Primate.java

# Compile to .wasm
native-image --tool:svm-wasm Primate
