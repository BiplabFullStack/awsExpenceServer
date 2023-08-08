window.addEventListener('DOMContentLoaded', async() => {

    const dropdown = document.getElementById('groups');
    const token = localStorage.getItem('token')
    const groups = await axios.get(`http://localhost:8000/show-all-groups`,{ headers: { Authorization: token } })
    groups.data.groups.forEach((group) => {
        console.log(group);
        const option = document.createElement('option')
        option.value = group.groupname;
        option.textContent = group.groupname;
        option.style.color ='green'
        dropdown.appendChild(option)
    })
})

// When Click the perticular group
async function groupsYouPresent(event){
    const group = document.getElementById('groups').value;
    localStorage.setItem('groupname', group);
    window.location.href = '../groupchat/groupchat.html';
}

function redirectSignup(){
    console.log("I am Biplab");
    window.location.href ='../signUp/signUp.html'
}
function redirectlogin(){
    window.location.href = '../login/login.html'
}

function redirectcreategroup(){
    window.location.href = '../creategroup/creategroup.html'
}