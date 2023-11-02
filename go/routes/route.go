/// {{{ start of primate wrapper, prefix
package main
import "syscall/js"
// }}} end

import "github.com/primatejs/bindings/go/primate";

func Get(request primate.Request) interface{} {
  return request.Url.Href;
}

// {{{ start primate wrapper, postfix
func main() {
  c := make(chan bool)
  js.Global().Set("Get", js.FuncOf(primate.MakeRequest(Get)))
  <-c
}
// }}} end
