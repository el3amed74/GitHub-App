let userForm=document.querySelector("#userform");
let userName=document.querySelector("#username");
let langForm=document.querySelector("#langform");
let language=document.querySelector("#lang");
let searchTerm=document.querySelector(".search-term");
let reposContaner=document.querySelector(".repos");

userForm.addEventListener("submit",getUser);
langForm.addEventListener("submit",getLang);

function getUser(e){
    e.preventDefault();
    let user= userName.value.trim();
    if (user){
        reposContaner.innerHTML="";
        userName.value="";
        getRepos(user)
    }else{
        alert('Please enter a username');
    }    
}
function getLang(e){
    e.preventDefault();
    let lang= language.value.trim();
    if (lang){
        reposContaner.innerHTML="";
        language.value="";
        getLangRepos(lang);
    }else{
        alert('Please enter a language');
    }    
}
//get the repo from github api and display it in html page
function getRepos(user){
    let apiurl= "https://api.github.com/users/" + user + "/repos";
    fetch(apiurl)
    .then((res)=>res.json())
    .then(repo=> displayRepo(repo,user))
    .catch(err=>alert(err))
}

function getLangRepos(lang){
    let apiurl = 'https://api.github.com/search/repositories?q='+lang;
    fetch(apiurl)
    .then((res)=>res.json())
    .then(repo=> displayRepo(repo.items,lang))
    .catch(err=>alert(err))
}
function displayRepo(repos,user){
    console.log(repos)
    if(repos.length==0){
        reposContaner.innerHTML="NO REPOS...."
        return;
    }
    searchTerm.innerHTML=user;
    repos.forEach(repo => {
        reposContaner.innerHTML+= `
            <div  class='repo-item'>
                <span>${repo.owner.login}/${repo.name}</span>
                <a class="repolink" href="${repo.clone_url}" target="_blank">GitLink</a>
                
            </div>
        `
                
        
    });
}

const tapTransform = () => {
    let tapArray = document.querySelectorAll(".tabs li"),
        divArray = document.querySelectorAll(".left div");
    tapArray.forEach((taps) => {
        taps.addEventListener("click", (tap) => {
            tapArray.forEach((taps) => {
                taps.classList.remove("active");
            });
            tap.currentTarget.classList.add("active");
            divArray.forEach((div) => {
                div.style.display = "none";
            });
            document.querySelector(tap.currentTarget.dataset.cont).style.display = "flex";
        });
    });
}
tapTransform()