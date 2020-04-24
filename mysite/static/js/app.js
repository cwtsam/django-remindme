
var remindmeBodyWelcome;
var remindmeBodyAddvoice
var remindmeBodyInviteOthers;
var remindmeHeader;
var remindmeBodyInvitee;
var views = [];

(function initiate(){
    remindmeBodyWelcome = document.getElementById("remindme-body-welcome");
    remindmeBodyAddvoice = document.getElementById("remindme-body-addvoice");
    remindmeBodyInviteOthers = document.getElementById("remindme-body-inviteothers");
    remindmeBodyInvitee = document.getElementById("remindme-body-invitee");
})();

function addVoice(){
    remindmeBodyWelcome.style.display = "none";
    remindmeBodyAddvoice.style.display = "block";
    views.push(remindmeBodyWelcome);
    views.push(remindmeBodyAddvoice);
}

function inviteOthers(){
    remindmeBodyAddvoice.style.display = "none";
    remindmeBodyInviteOthers.style.display = "block";
    views.push(remindmeBodyInviteOthers);
}

function inviteThisPerson(){
    remindmeBodyInviteOthers.style.display = "none";
    remindmeBodyInvitee.style.display = "block";
    views.push(remindmeBodyInvitee);
}

function recordVoice(){
    alert("now you will be redirected to record app");
}

function chatNow(){
    alert("now you will be redirected to chatting app");
}

function copyLink(){
    var copyText = "https://remindme.app/v214"; 
    navigator.clipboard.writeText(copyText).then(function(){
        console.log("copied");
        document.getElementById("link-copied").style.visibility = "visible";
    });
}

function goBack(){
    if(views != null){
        views.pop().style.display = "none";
        var last = views.pop();
        last.style.display = "block";
        views.push(last);
    }
}