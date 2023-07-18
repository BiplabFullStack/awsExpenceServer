async function mySignUpFunc(event) {
    try {
        event.preventDefault();
        //Collect all the i/p data
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        event.target.reset();

        const myObj = {
            name,
            email,
            password
        }

         if (name && email && password) {

        const postdata = await axios.post("http://localhost:3000/postdata", myObj)

            if(postdata.status === 201){
                alert("Successfully Create your Profile")
                window.location.href = '../SignIn/signIn.html';  // Go to the Signin page 
                
            }

            else{
                throw new Error(postdata.data.message)
                
            }
        } else {
            alert('Enter All the things please');
        }
    }
    catch (err) {
        console.log(JSON.stringify(err));
    }
}