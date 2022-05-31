from wptserve.utils import isomorphic_decode, isomorphic_encode
from urllib.parse import parse_qs
from urllib.parse import urlparse

# élève.
utf8_subdomain = b"Domain=\xC3\xA9\x6C\xC3\xA8\x76\x65."

resp = """
<!DOCTYPE html>
<html>
<body>
	{}
</body>
</html>					
"""

def main(request, response):
	parsed_req = parse_qs(urlparse(request.url).query)
	frame_cnt = int(parsed_req['frm'][0])

	response.status = 200
	response.content = resp.format(frame_cnt * "<iframe src='about:blank'></iframe>\n")

	return		
