# > wrapped by primate
class Dispatcher
  def initialize(js_dispatcher)
    @dispatcher = js_dispatcher
  end

  def get(name)
    @dispatcher.call("get", name).to_s
  end
end

class URL
  def initialize(js_url)
    @href = js_url["href"].to_s
    @hash = js_url["hash"].to_s
    @origin = js_url["origin"].to_s
  end

  def href
    @href
  end

  def origin
    @origin
  end

  def hash
    @hash
  end
end

class Request
  def initialize(js_request)
    @url = URL.new(js_request["url"])
    @query = Dispatcher.new(js_request["query"])
  end

  def url
    @url
  end

  def query
    @query
  end
end
# < wrapped by primate

def get(request)
  "GET, " + request.url.origin + request.url.hash
end

def post(request)
  "POST, " + request.url.origin + "/foo=" + request.query.get("foo") + request.url.hash
end

# > wrapped by primate on executing the POST route
def run_post(js_request)
  post(Request.new(js_request))
end
# < wrapped by primate on executing the POST route
