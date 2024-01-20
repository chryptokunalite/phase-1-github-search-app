document.addEventListener('DOMContentLoaded', function (event){

//GET REFERENCES TO HTML ELEMENTS
const form = document.getElementById('github-form'); 
const searchInput = document.getElementById('search'); 
const userList = document.getElementById('user-list'); 
const reposList = document.getElementById('repos-list'); 

//ADD SUBMIT EVENT LISTENER TO FORM TO SEARCH FOR USERS AND DISPLAY INFO ON DOM
form.addEventListener('submit', function (event){
    event.preventDefault(); 

//ENSURE THAT NO WHITE SPACE IN SEARCH INPUT AFFECTS THE REQUEST
    const searchValue = searchInput.value.trim(); 
//IF THERE IS NO SEARCH INPUT GET RID OF PREVIOUS USER INFO
    if (searchValue !== ''){
        userList.innerHTML = '';
        reposList.innerHTML = '';
//CALL FUNCTION TO SEARCH FOR USERS USING FETCH GET REQUEST
        searchUsers(searchValue);
    }
})
//FETCH OF USER INFO IS INSIDE OF A FUNCTION "searchUsers" AND ONCE USER INFO IS RETURNED FUNCTION "displayUsers" IS CALLED TO CHANGE DOM
function searchUsers(username){
    const userSearchEndpoint = `https://api.github.com/search/users?q=${username}`; 

    fetch(userSearchEndpoint, {
        headers: {
            'Accept': 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.items);
        displayUsers(data.items);
    })
}
//DISPLAY USER INFO TO DOM
function displayUsers(users){
    users.forEach(user => {
        //DISPLAY USER NAME/LOGIN
        const userLogin = document.createElement('li'); 
        userLogin.textContent = user.login
        userList.append(userLogin);
        //DISPLAY USER ID
        const userId = document.createElement('li');
        userId.textContent = user.id
        userList.append(userId);
        //DISPLAY USER AVATAR
        const madeAvatar = document.createElement('img'); 
        madeAvatar.src = user.avatar_url 
        userList.append(madeAvatar)
        //ADD EVENT LISTENER TO USER THAT WILL ATTACH REPO INFORMATION TO EACH USER USING "getUserRepos" FUNCTION
        userLogin.addEventListener('click', function(event){
            getUserRepos(user.login);
        })
       }); 
    }
//DEFINE "getUserRepos" FUNCTION 
function getUserRepos(username){
    const userReposEndpoint = `https://api.github.com/users/${username}/repos`; 

    fetch(userReposEndpoint, {
        headers: {
            'Accept' : 'application/vnd.github.v3+json'
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log(typeof(data))
        displayRepos(data);
    })
}
// DEFINE "displayRepos" FUNCTION 
function displayRepos(repos){
    reposList.innerHTML = ''; 

    repos.forEach(repo => {
        const li = document.createElement('li'); 
        li.textContent = repo.name; 
        reposList.appendChild(li);
    })
}


})


