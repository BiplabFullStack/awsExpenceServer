
window.addEventListener('DOMContentLoaded',()=> {
    const createGroupBtn = document.getElementById("create-group-btn");
    createGroupBtn.addEventListener('click',createGroup)
    async function createGroup(e) {
        e.preventDefault();
        try{
        const groupname = document.getElementById('group-name').value.trim();
        //console.log(groupname);
        document.getElementById('group-name').value = '';
        const token = localStorage.getItem("token");
        const groupName = await axios.post(`http://localhost:8000/create-group`,{groupname},{headers: { Authorization: token }})
        //console.log(groupName.data.creategroup.groupname);
        if(groupName.status == 201){
          localStorage.setItem('groupname', groupName.data.creategroup.groupname)
          alert("Group created successfully")
          window.location.href = '../groupchat/groupchat.html'
        }
        if(groupName.status == 200){
          alert("This Group-name already created ")
        }
        
        if(!groupName){
          alert("Please enter a valid group name");
        }
        }
        catch(err){
          console.log(err.message);
          alert("Something went Wrong")
        }
      }
  })