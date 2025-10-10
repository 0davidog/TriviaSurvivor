// api.js module - make sure script type="module" when linked.

import { getEl } from "./ui.js";

/**
 * @function getCSRFToken()
 * Requires: `{% csrf_token %} <meta name="csrf-token" content="{{ csrf_token }}">` in base.html
 * @returns CSRF Token value
 * Used by: flagQuestion()
 */
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute("content");
}

/**
 * @async
 * @function fetchAuthStatus()
 * Fetches from 'class AuthStatusView(APIView)' in game/views.py
 * Requires 'path('api/auth-status/', AuthStatusView.as_view(), name='auth_status')' in game/urls.py
 * @returns [is_authenticated as a boolean, id if authenticated else None, username if authenticated else None]
 */
export async function fetchAuthStatus() {
    const res = await fetch('/api/auth-status/');
    return await res.json();
}

/**
 * @async 
 * @function fetchQuestions()
 * @param {*} genre  
 * Fetches from 'def get_filtered_questions(request)' in game/views.py
 * Uses 'class QuestionSerializer(serializers.ModelSerializer)' in game/serializers.py
 * Requires 'path('api/questions/', get_filtered_questions, name='get_filtered_questions')' in game/urls.py
 * Recieves question set filtered by genre param
 * @returns JSON data in random order
 */
export async function fetchQuestions(genre) {
    const res = await fetch(`/api/questions/?genre=${encodeURIComponent(genre)}`);
    const data = await res.json();
    return data.questions.sort(() => Math.random() - 0.5);
}

/**
 * @async
 * @function fetchCreature()
 * Fetches from 'def get_creature_name(request)' in game/views.py
 * Requires 'path('api/creature-name/', get_creature_name, name='get_creature_name')' in game/urls.py
 * @param {*} genre
 * Fetches creature name field from genre model instance matching param
 * @returns Creature name as JSON
 */
export async function fetchCreature(genre) {
    const res = await fetch(`/api/creature-name/?genre=${encodeURIComponent(genre)}`);
    return await res.json();
}

/**
 * @async
 * @function flag_question()
 * Fetches from 'class FlagViewSet(viewsets.ModelViewSet)' in game/views.py
 * Requires:
 * 'router = DefaultRouter()' in game.urls.py
 * 'router.register(r'flag_question', FlagViewSet)' in game.urls.py
 * 'path('api/', include(router.urls))' in game.urls.py
 * @param {*} question 
 * @param {*} comment 
 * @param {*} author
 * Related to 'class Flag(models.Model)' in data/models.py
 * POSTS question id, comment text and author as new Flag model instance.
 */
export async function flagQuestion(question, comment, author) {

    const flagModal = getEl("flag-modal");
    const menuBtn = getEl("menu-btn");
    const closeBtn = getEl("close-btn");

    const response = await fetch("/api/flag_question/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken(),
        },
        body: JSON.stringify({
            question: question,
            comment: comment,
            author: author
        }),
    });

    if (!response.ok) {
        console.error("Error submitting feedback");
        renderMessage("error", "Error submitting feedback");
    } else {
        console.log("Feedback submitted!");
        renderMessage("success", "Feedback submitted!");
    }
}

/**
 * @function renderMessage()
 * @param {*} level 
 * @param {*} text 
 * @returns 
 */
export function renderMessage(level, text) {
    console.log(level, text);
    const div = getEl("msg-container");
    let iconType = "";

    if (!div) {
        return;
    };

    if (level == 'success') {
        iconType = "fa-circle-check";
    } else if (level == "error") {
        iconType = "fa-triangle-exclamation";
    } else if (level == 'info') {
        iconType = "fa-cirlce-exclamation";
    } else {
        iconType = "fa-bug";
    }
    const msg = document.createElement("div");
    msg.className = `${level} alert alert-dismissible fade show text-center`;  // matches Django's "success", "error", etc.
    msg.innerHTML = `<i class="${level} fa-solid ${iconType}"></i> ${text}<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"><i class="${level} fa-regular fa-circle-xmark"></i></button>`;
    msg.role = "alert";
    div.appendChild(msg);
    console.log(msg)
}