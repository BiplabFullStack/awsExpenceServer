async function forgetPassword(event){
    try{
    event.preventDefault();
    const email = document.getElementById('email').value;  // Collect user input email from forget password page
    event.target.reset();

    const obj ={email}

    const password =await axios.post('http://16.16.175.204:3000/password/forgotpassword',obj)
    
    if(password.status === 201){
        alert(password.data.message)
        window.location.href = '../SignIn/signIn.html'  //Go to the  Signin page
    }
    else{
        alert("Enter Valid Email")
        
    }
}
catch(err){
    console.log(err.message);
}
}