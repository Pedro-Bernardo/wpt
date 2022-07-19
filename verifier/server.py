from wptserve.utils import isomorphic_decode, isomorphic_encode
from urllib.parse import parse_qs
from urllib.parse import urlparse
import json


GLOBALS = {'uuid' : "", "stash" : ""}

def update_globals(parsed_req):
    global GLOBALS

    for g in GLOBALS.keys():
        if g in parsed_req:
            GLOBALS[g] = parsed_req[g][0]

"""
TODO:
1. get response
2. create filename (method.proto.domain.port.corr)
  - filter the domain until ".test"
3. parse content by "\n\n" to separate the header from the body (should work, if not, adapt the verifier)
4. split each header by ":" and add response header
"""

def caulculate_filename(request):
    query = parse_qs(urlparse(request.url).query)

    domain = request.url_parts.netloc.split(":")[0]
    port = int(request.url_parts.netloc.split(":")[1])
    scheme = request.url_parts.scheme
    resource = None
    correlator = None
    try :
      correlator = query['corr'][0]
      resource = query['res'][0]
    except:
      pass

    filename = f"{request.method}.{scheme}.{domain}.{port}.{correlator}_{resource}"

    return filename

def build_response(response, headers, body):
  headers = json.loads(headers)

  response.code = int(headers['code'])

  for k in headers['headers']:
    if headers['headers'][k]:
      response.headers.append(k.encode(), headers['headers'][k].encode())
  
  response.content = body
  
  # lines = resp.split("\n")

  # code = int(lines[0].split(" ")[1])

  # head, body = resp.split("\n\n")

  # if len(head) > 1:
  #   head = head.split("\n")[1:]
  
  # for l in head:
  #   key, value = l.split(":")[0], "".join(l.split(":")[1:]) # in case there are more :'s, like in a url for example
  #   response.headers.append(key.encode(), value.encode())

  # response.code = code
  # response.content = body

  print("[+]", response, response.headers, response.code, response.content)
  return response

def main(request, response):
    filename = caulculate_filename(request)
    headers = None
    body = None
    with open(f"verifier/responses/{filename}.headers", "r") as f:
      headers = f.read()

    with open(f"verifier/responses/{filename}.body", "r") as f:
      body = f.read()

    build_response(response, headers, body)

    return

