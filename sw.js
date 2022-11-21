console.log("HI FROM SW")

var logs = {requests: {}, responses: {}}

addEventListener('message', event => {
  // event is an ExtendableMessageEvent object
  console.log(`The client sent me a message: ${event.data}`, "sending", logs, event.source);

  console.log("stringify", JSON.stringify(logs))
  event.source.postMessage(JSON.stringify(logs));
  // event.source.postMessage("temporary");

  logs = {requests: {}, responses: {}}
});


self.addEventListener('fetch', (event) => {
    console.log("EVENT", event)

	event.respondWith((async () => {
		// return fetch(event.request).then((response) => {console.log(event.request.url, response); return response})})())

		try{
			console.log('[Service Worker] Fetching resource: ' + event.request.url);
			let event_ts = Date.now()
			return fetch(event.request).then(async (response) => {
				console.log('[Service Worker] Saving response to ' + event.request.url, event.request);
				logs.requests[event_ts] = {"url": event.request.url, "headers" : event.request.headers, "method" : event.request.method, "bodyUsed": event.request.bodyUsed, "body": event.request.body, 'ts': Date.now()}
				try{
					// if (!response.url.endsWith(".js")){ // ?? is this ok???
					let bodies = response.body.tee()
					// response.body = bodies[0]
					let content = await (await bodies[1].getReader().read())
					content = new TextDecoder().decode(content.value)

					logs.responses[event_ts] = {"url": response.url, "headers" : response.headers, "method" : response.method, "bodyUsed": response.bodyUsed, "body": content, "redirected": response.redirected, "status": response.status, "ts":Date.now()}

					let new_resp = new Response(bodies[0], {status:response.status, statusText: response.statusText, headers: response.headers})
					Object.defineProperty(new_resp, "type", { value: response.type });
					Object.defineProperty(new_resp, "url", { value: response.url });
					Object.defineProperty(new_resp, "bodyUsed", { value: response.bodyUsed });
					console.log(response, new_resp)

					return new_resp

				}catch(error){
					console.log("DIED 2", error)
				}
			})
		} catch (error) {
			console.log("DIED", error)
		}})())
    // event.respondWith((async () => {
    //     try{
    //     console.log('[Service Worker] Fetching resource: ' + event.request.url);
    //     let resp = fetch(event.request).then((response) => {
    //         console.log('[Service Worker] Saving response to ' + event.request.url, event.request, response);
    //         logs.requests[event.timeStamp] = event.request
    //         logs.responses[event.timeStamp] = response.clone()
    //         console.log(logs.responses[event.timeStamp])
    //         return response
    //         })
    //     } catch (error) {
    //         console.log("DIED", error)
    //     }
    //     })()
    // )
});
        
