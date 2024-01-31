
const url = 'https://api.github.com/users';
const main = document.getElementById('Information')
// let user = 'marcelocant'
let text = ''

function getUser(user) {

    fetch(`${url}/${user}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            text = `<h1>${data.name} has ${data.public_repos} public repositories on GitHub as: ${data.login}</h1>`
            main.innerHTML = text
        })
        .catch((error) => console.error('Erro: ', error.message || error))
    }

function getRepos(user) {
    document.getElementById("repos").innerHTML = ""
    fetch(`${url}/${user}/repos`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        }
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            for(let i = 0;i<data.length;i++){
                let createdDate = data[i].created_at.slice(0,10)
                let updatedDate = data[i].updated_at.slice(0,10)
                document.getElementById("repos").innerHTML += `
                <div id=${i} class="repoInfo">
                    <div class="repoName">
                        <a target="__blank" href=${data[i].html_url}><h3>${data[i].name}</h3></a>
                    </div>
                    <div class="repoDetails">
                        <p>Created on: ${createdDate}</p>
                        <p>Updated on: ${updatedDate}</p>
                    </div>
                </div>`
            }

        })
        .catch((error) => console.error('Erro: ', error.message || error))

}

const userInput = document.getElementById('username')
userInput.setAttribute('size',userInput.getAttribute('placeholder').length);
userInput.addEventListener('focusout', function(event){
    getUser(event.target.value)
    getRepos(event.target.value)
})
