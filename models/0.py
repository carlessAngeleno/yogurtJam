if request.env.http_origin:
    response.headers['Access-Control-Allow-Origin'] = request.env.http_origin
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Max-Age'] = 86400
if request.env.request_method == 'OPTIONS':
    if request.env.http_access_control_request_method:
         response.headers['Access-Control-Allow-Methods'] = request.env.http_access_control_request_method
    if request.env.http_access_control_request_headers:
         response.headers['Access-Control-Allow-Headers'] = request.env.http_access_control_request_headers
    raise HTTP(200) # not sure about this line