from wptserve.utils import isomorphic_decode, isomorphic_encode
from urllib.parse import parse_qs
from urllib.parse import urlparse


def main(request, response):
    global logs
    parsed_url = urlparse(request.url)

    # if request.method == u"GET":
    #     uuid = parse_qs(parsed_url.query)['uuid'][0]
    #     print("UUID", uuid)
    #     # get from map
    #     response.headers.append(b"Content-Type", b"text/html; charset=utf-8")
    #     response.headers.append(b"Content-Security-Policy", b"default-src *")
    #     response.headers.append(b"Access-Control-Allow-Origin", b"*")
    #     if uuid in logs:
    #         print("RESPONDING")
    #         response.status = 200 
    #         response.content = logs[uuid]
    #     else:
    #         response.status = 400 # Bad Request
    #         print("AM AI RETURNING 400?")

    if request.method == u"POST":
        print("SHOULD BE HERE")
        
        uuid = request.body.split(b"&")[0].split(b"=")[1]
        data = request.body.split(b"&")[1].split(b"=")[1]
        request.server.stash.put(uuid, data)
        response.status = 200 


    

    return