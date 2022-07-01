const selectForm= document.querySelector('.wrapper');
const fetchButton = document.getElementById('fetch');
const userName = document.getElementById('userName');
const password = document.getElementById('password');


const cardTitle = document.getElementById('card-title');
const cardDesc = document.getElementById('card-desc');
const cardGistLink = document.getElementById('card-btn');


// function for gist list view 
function gistList(datas){
    let containerDiv = document.createElement('div')
    containerDiv.className = 'container mt-5';
    datas.map(item=>{
        let row = document.createElement('div');
        row.className = 'row';
        let card = document.createElement('div');
        card.className = 'card';
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        let h5= document.createElement('h5');
        let p = document.createElement('p');
        let a = document.createElement('a');
        h5.className = 'card-title';
        p.className = 'card-text';
        a.className = 'btn';
        h5.innerText = item.description;
        p.innerText = `File name of gist : ${Object.keys(item.files)[0]}`;
        a.setAttribute('href',`${item.html_url}`)
        a.innerText = 'Open Gist Link'
        cardBody.appendChild(h5);
        cardBody.appendChild(p);
        cardBody.appendChild(a);
        card.appendChild(cardBody);
        row.appendChild(card);
        containerDiv.appendChild(row);
    })
    document.body.appendChild(containerDiv)
    // Card Section 
    const cardContainer = document.querySelector('.container')
    cardContainer.style.display = 'block';
}


// function for get api data
function getAPIResponse(userName,token){

    const myHeaders = {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    };
    const apiUrl = `https://api.github.com/gists`;
    fetch(apiUrl,{
        'method':'GET',
        'headers':myHeaders
    })
    .then(response =>{
        if(response.status == 200){
           return response.json();
        }else{
            console.log(response);
        }
    })
    .then(data=>{
        gistList(data);
       
    })

}
if(localStorage.getItem('username') && localStorage.getItem('token')){
    getAPIResponse(localStorage.getItem('username'),localStorage.getItem('token'));
    selectForm.style.display ='none';
    
}


fetchButton.addEventListener('click',event =>{
    event.preventDefault()
    if(!localStorage.getItem('username') && !localStorage.getItem('token')){
        localStorage.setItem('username',userName.value);
        localStorage.setItem('token',password.value);
        console.log(localStorage.getItem('username'));
        console.log(localStorage.getItem('token'));
    }
    getAPIResponse(localStorage.getItem('username'),localStorage.getItem('token'));
    selectForm.style.display = 'none';

});

