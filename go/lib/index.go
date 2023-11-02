package primate

import "syscall/js"
 
func MakeRequest(fn func(Request) interface{}) func (js.Value, [] js.Value) interface{} {
    return func(this js.Value, args[] js.Value) interface{} {
      _url := args[0].Get("url")
      _href := _url.Get("href").String();
      req := Request{
        Url: URL{"host", _href},
      }
      return fn(req)
    }
}

type URL struct {
  Host string
  Href string
}

type Request struct {
  Url URL
}

/*func main() {
  c := make(chan bool)
  js.Global().Set("Get", js.FuncOf(Get))
  <-c
}*/
