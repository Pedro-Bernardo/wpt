
var pwn_div = document.createElement('div');
pwn_div.setAttribute("class", "a1234");
pwn_div.innerText = "PWNED" ;
top.document.body.append(pwn_div);

let test_data = top.document.body.getElementsByClassName("a1234")[0].innerText;
let uuid = new URLSearchParams(location.search).get("uuid")


let STASH_RESPONDER = atob(new URLSearchParams(location.search).get("stash"))
console.log("stash " + STASH_RESPONDER)

async function log_test(uuid, data, stash_responder){
    const ws = new WebSocket(stash_responder);
    ws.onopen = () => {
        ws.send(JSON.stringify({action: 'set', key: uuid, value: data}));
    };
}

log_test(uuid, test_data, STASH_RESPONDER)
