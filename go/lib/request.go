package primate

type url struct {
  host string
  href string
}

type request struct {
  url url
}

func Hi(name string) string {
  return "test"
}
