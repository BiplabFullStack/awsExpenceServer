


async function myLogInFunc(event) {
    event.preventDefault();
    try {

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        event.target.reset();  // after click submit all the input are empty.


        const myObj = { email, password }  //Create Object
        if (email && password) {
            const data = await axios.post('http://16.16.175.204:3000/login', myObj)
            if (data.status === 200) {
                alert("Login Successfully")
                localStorage.setItem('token', data.data.token)
                window.location.href = '../website/website.html';  // Go to the Expence Tracker Main page 
            }
            else {
                throw new Error(data.data.message)
            }
        } else {
             alert("Please enter both username and Password")
        }
    }
    catch (err) {
        console.log(JSON.stringify(err));
        alert("Invalid Username and Password")
        // document.body.innerHTML += `<div style ="color:red">${err.message}</div>`
    }

}


// ------------------------------------------   Forget Password -------------------------------------------------------

const forgetData = document.getElementById('forgotPassword')
forgetData.onclick = async () => {
    window.location.href = '../ForgetUserPassword/forgetPassword.html'  // Go to the forgot page 

}