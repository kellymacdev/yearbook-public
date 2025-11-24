from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
import json
from django.core import paginator
import os
from django.conf import settings


from .models import User, Graduate


def index(request):
    all_grads = Graduate.objects.all().order_by('name')
    grads = []
    for grad in all_grads:
        if grad.name == "Megan Manley / Glover":
            grads.append((grad, f'photos/Headshots/Megan-Manley.jpg'))
        else:
            file_name = grad.name.replace(' ', '-')
            grads.append((grad, f'photos/Headshots/{file_name}.jpg'))
    user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
    if 'mobile' in user_agent or 'iphone' in user_agent or 'android' in user_agent:
        template_name = "network/index2-mobile.html"
    else:
        template_name = "network/index2.html"
    return render(request, template_name, {
        "graduates": grads
    })


@login_required
def profile(request, grad_id):
    if request.method == "GET":
        grad = Graduate.objects.get(pk=grad_id)
        gradname = grad.name.replace(' ', '-')
        if grad.name == "Lisha Govender":
            file_urls = None
        elif grad.name == "Megan Manley / Glover":
            folder_path = os.path.join(settings.BASE_DIR, 'network', 'static', 'photos', 'Megan-Manley')
            files = [f for f in os.listdir(folder_path) if
                     os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('.')]
            file_urls = [f'photos/Megan-Manley/{f}' for f in files]
        else:
            folder_path = os.path.join(settings.BASE_DIR, 'network', 'static', 'photos', f'{gradname}')
            files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('.') ]
            file_urls = [f'photos/{gradname}/{f}' for f in files]
        if grad.q9:
            if grad.spotify:
                song = grad.spotify
                song_description = None
            else:
                song_description = grad.q9
                song = None
        else:
            song = None
            song_description = None
        user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
        if 'mobile' in user_agent or 'iphone' in user_agent or 'android' in user_agent:
            template_name = "network/profile2_mobile.html"
        else:
            template_name = "network/profile2.html"
        return render(request, template_name, {
            "graduate": grad,
            "song": song,
            "song_description": song_description,
            "pics": file_urls
        })
    elif request.method == "POST":
        grads = list(Graduate.objects.all().order_by('name'))
        current_grad = Graduate.objects.get(pk=grad_id)
        current_index = grads.index(current_grad)
        count_grad = Graduate.objects.count()
        if "next" in request.POST:
            next_index = current_index + 1
            if next_index > count_grad-1:
                next_index = 0
            next_id = grads[next_index].pk
            return redirect('profile', next_id)
        elif "previous" in request.POST:
            prev_index = current_index - 1
            if prev_index < 0:
                prev_index = count_grad-1
            prev_id = grads[prev_index].pk
            return redirect('profile', prev_id)


@login_required
def memoriam(request, person):
    grads = Graduate.objects.all()
    mem_words = []
    
    for grad in grads:
        if grad.memoriam:
            mem_words.append([grad.memoriam,grad.name])
        list = mem_words
        folder_path = os.path.join(settings.BASE_DIR, 'network', 'static', 'Memoriam')
        files = sorted(
            [f for f in os.listdir(folder_path) if
             os.path.isfile(os.path.join(folder_path, f)) and not f.startswith('.')]
        )
        file_urls1 = [f'Memoriam/{f}' for f in files[0:7]]
    user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
    if 'mobile' in user_agent or 'iphone' in user_agent or 'android' in user_agent:
        template_name = "network/memoriam-mobile.html"
    else:
        template_name = "network/memoriam.html"

    return render(request, template_name, {
        "person": person.capitalize(),
        "memoriam_list": list,
        "imgs": file_urls1
    })

@login_required
def summary(request):
    grads = Graduate.objects.all()
    tot_babies = 0
    tot_jobs = 0
    tot_school = 0
    tot_countries = 0
    tot_tattoos = 0
    tot_married = 0
    i = 0
    j= 0
    k = 0
    l = 0
    m = 0
    for grad in grads:
        if grad.jobs is not None:
            i+=1
            tot_jobs += grad.jobs
        if grad.school_years is not None:
            j += 1
            tot_school += grad.school_years
        if grad.countries is not None:
            k+= 1
            tot_countries += grad.countries
        if grad.tattoos is not None:
            l+=1
            tot_tattoos += grad.tattoos
        if grad.babies is not None:
            m += 1
            tot_babies += grad.babies
        if grad.married=="True":
            tot_married += 1
    av_babies = tot_babies/m
    av_jobs = tot_jobs/i
    av_school = tot_school/j
    av_countries = tot_countries/k
    av_tattoos = tot_tattoos/l
    percentage_married = (tot_married/len(grads))*100
    most_babies = Graduate.objects.order_by('-babies').first()
    most_tattooes = Graduate.objects.order_by('-tattoos').first()
    most_countries = Graduate.objects.order_by('-countries').first()
    most_jobs = Graduate.objects.order_by('-jobs').first()
    most_school = Graduate.objects.order_by('-school_years').first()

    user_agent = request.META.get('HTTP_USER_AGENT', '').lower()
    if 'mobile' in user_agent or 'iphone' in user_agent or 'android' in user_agent:
        template_name = "network/summary2-mobile.html"
    else:
        template_name = "network/summary2.html"
    return render(request, template_name, {
        "grads": grads,
        "av_babies": round(av_babies,2),
        "av_jobs": round(av_jobs,2),
        "av_school": round(av_school,2),
        "av_countries": round(av_countries,2),
        "av_tattoos": round(av_tattoos,2),
        "tot_tattoos": tot_tattoos,
        "tot_babies": tot_babies,
        "percentage_married": round(percentage_married,2),
        "most_babies": most_babies,
        "most_tattooes": most_tattooes,
        "most_countries": most_countries,
        "most_jobs": most_jobs,
        "most_school": most_school
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        invite_code = request.POST.get("invite_code")  

        # Check invite code
        if invite_code != "0000":  
            return render(request, "network/register.html", {
                "message": "Invalid invite code."
            })



        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

