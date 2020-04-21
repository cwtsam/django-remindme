from django.shortcuts import render
from django.http import HttpResponse
import json
from django.views.decorators.csrf import csrf_exempt

from chatterbot import ChatBot

chatbot = ChatBot('Norman')

def home(request, template_name="home.html"):
	context = {'title': 'RemindMe'}
	return render(request, template_name, context) ## allow rendering of the home page

@csrf_exempt
def get_response(request):
    response = {'status': None}

    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        message = data['message'] # message from user
        chat_response = chatbot.get_response(message).text # chatterbox response to message
        response['message'] = {'text': chat_response, 'user': False, 'chat_bot': True}
        response['status'] = 'ok'
    else:
        response['error'] = 'no post data found'
    return HttpResponse(json.dumps(response), content_type="application/json")