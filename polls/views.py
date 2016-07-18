from django.db.models import F, Count
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.shortcuts import get_object_or_404, render
from django.views import generic

from .models import Question, Choice

class IndexView(generic.ListView):
	template_name = 'polls/index.html'
	context_object_name = 'lastest_question_list'

	def get_queryset(self):
		return Question.objects.order_by('-pub_date')[:5]

class DetailView(generic.DetailView):
	model = Question
	template_name = 'polls/detail.html'

class ResultsView(generic.DetailView):
	model = Question
	template_name = 'polls/results.html'

# def index(request):
# 	lastest_question_list = Question.objects.order_by('-pub_date')[:5]
# 	print lastest_question_list
# 	context = {
# 		'lastest_question_list': lastest_question_list
# 	}
# 	return render(request, 'polls/index.html', context)

# def detail(request, question_id):
# 	question = get_object_or_404(Question, pk=question_id);
# 	return render(request, 'polls/detail.html', {'question': question})

# def result(request, question_id):
# 	question = get_object_or_404(Question, pk=question_id)
# 	return render(request, 'polls/results.html', {'question': question})

def vote(request, question_id):
	question = get_object_or_404(Question, pk=question_id)
	try:
		selected_choice = question.choice_set.get(pk=request.POST['choice'])
	except (KeyError, Choice.DoesNotExist):
		return render(request, 'polls/detail.html', {
				'question': question,
				'error_message': "You didn't select a choice"
			})
	else:
		selected_choice.votes = F('votes') + 1
		selected_choice.save()
		return HttpResponseRedirect(reverse('polls:result', args=(question.id, )))