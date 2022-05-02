let form = document.getElementById('github-form');

let usersOutput = document.getElementById('user-list');
let reposOutput = document.getElementById('repos-list');


//----------------------submit and GET then invoke render of data to DOM---------
form.addEventListener('submit', (e)=> {e.preventDefault();
    let searchText = document.getElementById('search');
    console.log(searchText.value);

    fetch (`https://api.github.com/search/users?q=${searchText.value}`,{
        headers:
        {
        Accept: "application/vnd.github.v3+json"
        },
        })
        .then(res=> res.json())
        .then(data=> {data['items'].forEach(i => renderName(i))
            console.log (data['items']
        )

    });
});



function renderName(index){
    let p = document.createElement('p');
    p.addEventListener('click', repoSearch(index.login));
    let br = document.createElement('br');
    let avatar = document.createElement('img');
    usersOutput.append(avatar);
    usersOutput.append(p);
    avatar.src=`${index.avatar_url}"  "`
    usersOutput.append(br);
    p.innerText=index.login;
    
}





//-------------------------------------------------------------



function repoSearch(login){
    fetch (`https://api.github.com/users/${login}/repos`)
    .then(res=> res.json())
    .then(data=> console.log (data));
}






/* User Search Endpoint (Links to an external site.)
You can search for users matching a certain name. For example, if we wanted to find all users named octocat, we would make a GET request to https://api.github.com/search/users?q=octocat. To view the response, you can copy and paste that URL into your browser.

This endpoint is rate limited. This means the API will stop returning data if you make more than 10 requests per minute (Links to an external site.). */