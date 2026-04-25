// تأكد إن السطر ده مكتوب مرة واحدة بس في أول الملف
if (typeof peer === 'undefined') {
    var peer = new Peer(); 
}

let myStream;
let currentCall;

// تشغيل الكاميرا
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
        myStream = stream;
        document.getElementById('my-video').srcObject = stream;
    }).catch(err => console.error("Camera error:", err));

// استقبال ID
peer.on('open', id => {
    document.getElementById('my-id').innerText = id;
});

// استقبال مكالمة
peer.on('call', call => {
    call.answer(myStream);
    call.on('stream', remoteStream => {
        document.getElementById('peer-video').srcObject = remoteStream;
    });
});

// دالة الاتصال
function callPeer() {
    const peerId = document.getElementById('peer-id-input').value;
    const call = peer.call(peerId, myStream);
    call.on('stream', remoteStream => {
        document.getElementById('peer-video').srcObject = remoteStream;
    });
}

// الدوال اللي كان طالع فيها خطأ (لازم تكون مكتوبة كدة بالظبط)
function toggleAudio(btn) {
    const track = myStream.getAudioTracks()[0];
    track.enabled = !track.enabled;
    btn.innerHTML = track.enabled ? '<i class="fas fa-microphone"></i>' : '<i class="fas fa-microphone-slash"></i>';
}

function toggleVideo(btn) {
    const track = myStream.getVideoTracks()[0];
    track.enabled = !track.enabled;
    btn.innerHTML = track.enabled ? '<i class="fas fa-video"></i>' : '<i class="fas fa-video-slash"></i>';
}

function endCall() {
    location.reload(); 
}
