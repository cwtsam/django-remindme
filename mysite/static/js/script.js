var form = document.getElementById('chat-box');
var submit = document.getElementById('chat-submit');
var input = document.getElementById('chat-user');
var container = document.getElementById('dialogue-container');
var keywords = [];
var reply;
var audioPlayer = document.getElementById('audio-player');

window.onload=function(){
	form = document.getElementById('chat-box');
    submit = document.getElementById('chat-submit');
    input = document.getElementById('chat-user');
    container = document.getElementById('dialogue-container');
    keywords = [];
    reply;
	audioPlayer = document.getElementById('audio-player');
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        create_bubble_user();
	});
}
//somehow we need to load first or not it will return an error (null)

function create_bubble_user() {
	if (input.value != '') {
		keywords = input.value.toLowerCase()
			.replace(/[^\w\s]|_/g, '')
			.replace(/\s+/g, ' ').split(' ');
		var div = document.createElement('DIV');
		var para = document.createElement('SPAN');
		var txt = document.createTextNode(input.value);
		div.setAttribute('class', 'dialogue dialogue-user');
		para.appendChild(txt);
		div.appendChild(para);
		container.appendChild(div);

		count_childs();

		setTimeout(function() {
			create_bubble_bot(reply);
			audioPlayer.setAttribute('src',"/media/remindme.wav");
			audioPlayer.load();
			audioPlayer.play();
		}, 500);
		
		var message = {
			'text': input.value,
			'user': true,
			'chat_bot': false, // gets the text, and indicates that its from user
		};
		console.log(message['text']);
		
		fetch("/get-response/", { // fetch response to get json string?
			body: JSON.stringify({'message': message['text']}), // message that you typed
			cache: 'no-cache', 
			credentials: 'same-origin', // indicates that it's not csrf attack?
			headers: {
				'user-agent': 'Mozilla/4.0 MDN Example', // specifying that browser should be this
				'content-type': 'application/json' // specifying this is JSON request
			},
			method: 'POST',
			mode: 'cors', 
			redirect: 'follow',
			referrer: 'no-referrer',
			}) // once fetch request has been completed, it will go to .then requests
			.then(response => response.json()).then((json) => {
				reply = json['message']['text'];
			})
		input.value = '';
	}
}

function create_bubble_bot(str) {
  var div = document.createElement('DIV');
  var para = document.createElement('SPAN');
  var txt = document.createTextNode(str);
  div.setAttribute('class', 'dialogue dialogue-bot');
  para.appendChild(txt);
  div.appendChild(para);
  container.appendChild(div);
  count_childs();
}

function count_childs() {
	var convolength = 10
	var children = container.children;
	if (children.length > convolength) {
		while (children.length > convolength) {
		container.removeChild(container.firstChild);
		}
	}
	if (children.length > 3) {
		var transparency = 1;
		for (var i = children.length - 5; i >= 0; i--) {
		transparency -= 0.15;
		children[i].style.opacity = transparency;
		}
	}
}

