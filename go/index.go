package main
 
import "syscall/js"
 
func Get(this js.Value, args[] js.Value) interface{} {
  return args[0].Get("url").Get("href");
}
 
func main() {
  c := make(chan bool)
  js.Global().Set("Get", js.FuncOf(Get))
  <-c
}

