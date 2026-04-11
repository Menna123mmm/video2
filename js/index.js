const peer = new Peer();

let myStream;
let currentCall;

// Access camera
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
.then(stream => {
    myStream = stream;
    document.getElementById('my-video').srcObject = stream;
});

// Show ID
peer.on('open', id => {
    document.getElementById('my-id').innerText = id;
});

// Receive call
peer.on('call', call => {
    currentCall = call;
    call.answer(myStream);

    call.on('stream', remoteStream => {
        document.getElementById('peer-video').srcObject = remoteStream;
    });
});

// Call peer
function callPeer() {
    const peerId = document.getElementById('peer-id').value;
    const call = peer.call(peerId, myStream);
    currentCall = call;

    call.on('stream', remoteStream => {
        document.getElementById('peer-video').srcObject = remoteStream;
    });
}

// End call
function endCall() {
    if (currentCall) {
        currentCall.close();
        document.getElementById('peer-video').srcObject = null;
    }
}