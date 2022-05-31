// (async function() {
//     let [recvChannel, sendChannel] = channel();
//     recvChannel.connect();
//     let message = await recvChannel.nextMessage();
//     console.log(message)
//     console.log(top.document.getElementsByClassName("1234")[0].text)
//     console.log(sendChannel)
//     sendChannel.send(top.document.getElementsByClassName("1234")[0].text)
//     // channels[1].postMesasge(top.document.getElementsByClassName("1234")[0].text)

// })()


let test_data = top.document.getElementsByClassName("1234")[0].text;
console.log(test_data)
fetch(`log.py?uuid=${uuid}&data=${test_data}`)
    .then(res => {
    if (res.status == 200) {
        return res
    } else {
        throw new Error(res.status);
    }
    });


// (async function() {
//     channel = await start_global_channel();
//     console.log("channel")
//     console.log(channel)
//     let msg = await channel.channel.nextMessage()
//     console.log(msg)
//     console.log("AAAA")
// })()

// let remote = new RemoteGlobal()
// remote.connect()
// console.log(remote)
// let msg = remote.recvChannel.nextMessage()

// msg.then(function(mesg){
//     console.log(mesg)
// })


// let [recvChannel, sendChannel] = channel();
// recvChannel.connect();
// recvChannel.nextMessage().then(function(message){
//     console.log(message)
// });

// console.log(top.document.getElementsByClassName("1234")[0].text)
// console.log(sendChannel)
// sendChannel.send(top.document.getElementsByClassName("1234")[0].text)


// channels = start_global_channel();
// console.log(channels)
// console.log("IFRAME RAN")

// top.document.getElementsByClassName("1234")[0].text