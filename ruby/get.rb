# > wrapped by primate
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
  end

  def url
    @url
  end
end
# < wrapped by primate

def get(request)
  "GET, " + request.url.origin + request.url.hash
end

def post(request)
  "POST, " + request.url.origin + request.url.hash
end

# > wrapped by primate on executing the POST route
def run_post(js_request)
  post(Request.new(js_request))
end
# < wrapped by primate on executing the POST route
