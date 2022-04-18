"use strict";
console.log('connected');

//  DOM Elements 
const searchBtn = document.querySelector('.search__btn');
const searchInput = document.querySelector('.search__input');
const userImg = document.querySelector('.result-card__profile-img');
const FullNameElm = document.querySelector('.result-card__full-name');
const usernameElm = document.querySelector('.result-card__username');
const repoElm = document.querySelector('.result-card__repo');
const followersElm = document.querySelector('.result-card__followers');
const followingElm = document.querySelector('.result-card__following');
const bioElm = document.querySelector('.result-card__bio');



const API_URL = "https://api.github.com/users/";

// Find EventListener
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();

    if (!searchInput.value) {
        searchInput.classList.add('search__input--alert');
        searchInput.focus();
        searchBtn.blur();
        setTimeout(() => searchInput.classList.remove('search__input--alert'), 950);
    } else {
        fetch(API_URL + searchInput.value).then(response => {
            console.log(response);
            if (!response.ok) {
                displayNotFound();
            } else {
                return response.json();
            }
        })
            .then(data => {
                displayResult(data)
            })
            .catch(error => console.log('catched'));
        searchInput.value = '';
    }
});


function displayNotFound() {
    if (document.querySelector('.result')) {
        document.querySelector('.result').remove();
    }
    const html = `<section class="result bg-alert hidden">
<div class="container">
<div class="result-card">
    <h1 class="title">User Not Found!</h1>
</div>
</div>
</section>`;
    document.querySelector('.search').insertAdjacentHTML("afterend", html);
    document.querySelector('.result').classList.remove('hidden');
    searchBtn.blur();
}



function displayResult(data) {
    const { login: username, name: fullname, avatar_url, bio, following, followers, public_repos, hirable } = data;
    if (document.querySelector('.result')) {
        document.querySelector('.result').remove();
    }
    const html = `
    <section class="result hidden">
    <div class="container">
        <div class="result-card">
            <img class="result-card__profile-img" src="${avatar_url}" alt="user avatar">
            <div class="result-card__content">
                <h2 class="result-card__full-name">${fullname}</h2>
                <p class="result-card__username">${'@' + username}</p>
                <div class="result-card__footer">
                <p><span class="result-card__repo">${public_repos}</span> Repo</p>
                <p><span class="result-card__followers">${followers}</span> Followers</p>
                <p><span class="result-card__following">${following}</span> Following</p>
                </div>
                <p class="result-card__bio">${bio ?? ''}</p>
                </div>
                </div>
                </div>
                </section>
                `;
    document.querySelector('.search').insertAdjacentHTML("afterend", html);
    document.querySelector('.result').classList.remove('hidden');
    searchBtn.blur();
}




// // Display Func
// function display(data) {
//     const { login, name: namee, avatar_url, bio, following, followers, public_repos, hirable } = data;
//     userImg.src = avatar_url;
//     FullNameElm.innerHTML = namee;
//     usernameElm.innerHTML = `@${login}`;
//     repoElm.innerHTML = public_repos;
//     followersElm.innerHTML = followers;
//     followingElm.innerHTML = following;
//     bioElm.innerHTML = bio;
//     document.querySelector('.result').classList.remove('hidden');
// }


// function render (data) {
//     const arr = [{ login, name: namee, avatar_url, bio, following, followers, public_repos, hirable }] = [data];
//     console.log(arr);
// }

