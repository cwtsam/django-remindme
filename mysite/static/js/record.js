var audioPlayer2;
var countDownValue;
var recordWelcome;
var recordName;
var recordChecklist;
var recordMain;
var recordDone;

(function activate(){
    audioPlayer2 = document.getElementById('audio-player2');
    countDownValue = document.getElementById('count-down-value');
    recordWelcome =  document.getElementById('record-welcome');
    recordName = document.getElementById('record-name');
    recordChecklist = document.getElementById('record-checklist');
    recordMain = document.getElementById('record-main');
    recordDone = document.getElementById('record-done');
})();

function giveName(){
  recordWelcome.style.display = "none";
  recordName.style.display = "block";
}

var voiceName;
function showChecklist(){
  voiceName = document.getElementById("name-input").value;
  recordName.style.display = "none";
  recordChecklist.style.display = "block";
}

function startRecordMain(){
  recordChecklist.style.display = "none";
  recordMain.style.display = "block";
}

var mediaRecorder;
var elapsedTime = 0;
var intervalFuction;
function startRecording(){
    document.getElementById("button-record").style.display = "none";
    document.getElementById("button-stop").style.display = "inline";
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        elapsedTime = 0;
        intervalFuction = window.setInterval(updateTimer, 1000);
        mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });
        mediaRecorder.addEventListener("stop", onRecordingStop);

      })
      .catch(function(err) {
        document.getElementById("button-record").style.display = "inline";
        document.getElementById("button-stop").style.display = "none";
        console.log('No mic for you!')
    });
}

function playRecording(){
  audioPlayer2.setAttribute("src", recordedClipUrl); 
  audioPlayer2.play();
}

function submitRecording(){
  console.log(audioChunks.length);
  console.log(audioBlob);
  document.getElementById("confirmation-note").innerHTML = "Voice: <b>" + voiceName + "</b> will be created. An email will be sent when the voice is ready";
  recordMain.style.display = "none";
  recordDone.style.display = "block";
  // // Approach 1
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", '/server', true); // change /server to actual endpoint
  // xhr.send(audioBlob);

  // // Approach 2
  //   var fd = new FormData();
  //   fd.append('fname', 'test.wav');
  //   fd.append('data', audioBlob);
  //   $.ajax({
  //       type: 'POST',
  //       url: '/upload',
  //       data: fd,
  //       processData: false,
  //       contentType: false
  //   }).done(function(data) {
  //       console.log(data);
  //   });
}

function openRemindMeHome(){
  alert("going to remind me home");
}

function updateTimer(){
    elapsedTime++;
    countDownValue.innerHTML = elapsedTime.toString() + " s";
}

var audioChunks = [];
var recordedClipUrl;
var audioBlob;
function onRecordingStop(){
  document.getElementById("final-controls").style.display = "inline";
  document.getElementById("controls").style.display = "none";
  console.log(audioChunks.length);
  audioBlob = new Blob(audioChunks);
  audioBlob.type = "audio/ogg";
  recordedClipUrl = URL.createObjectURL(audioBlob);
 
}

function stopRecording(){
    document.getElementById("button-record").style.display = "inline";
    document.getElementById("button-stop").style.display = "none";
    mediaRecorder.stop();
    mediaRecorder.stream.getAudioTracks().forEach(function(track){track.stop();});
    window.clearInterval(intervalFuction);  
}

var readCount = 0;
function markChecklist(elementID){
  if(document.getElementById(elementID).checked){
    readCount++;
  } else {
    readCount--;
  }
  if(readCount == 5){
    document.getElementById("record-screen-button").disabled = false;
    document.getElementById("record-screen-button").classList.remove("inactive");
  } else {
    document.getElementById("record-screen-button").disabled = true;
    document.getElementById("record-screen-button").classList.add("inactive");
  }
}


function validateName(){
  var inputvalue = document.getElementById("name-input").value;
  console.log(inputvalue);
  if(inputvalue != ""){
    document.getElementById("show-checklist-button").disabled = false;
    document.getElementById("show-checklist-button").classList.remove("inactive");
  } else {
    document.getElementById("show-checklist-button").disabled = true;
    document.getElementById("show-checklist-button").classList.add("inactive");
  }
}

function recordAgain(){
  document.getElementById("final-controls").style.display = "none";
  document.getElementById("controls").style.display = "inline";
  startRecording();
}