package primate

import "syscall/js"

type t_request func(Request) interface{} 
type t_response func(js.Value, []js.Value) interface{}

func make_url(url js.Value) URL {
  return URL{
    url.Get("host").String(),
    url.Get("href").String(),
  };
}
 
func MakeRequest(route t_request) t_response {
  return func(this js.Value, args[] js.Value) interface{} {
    js_request := args[0];
    go_request := Request{
      make_url(js_request.Get("url")),
    }

    return route(go_request)
  }
}

type URL struct {
  Host string
  Href string
}

type Request struct {
  Url URL
}
