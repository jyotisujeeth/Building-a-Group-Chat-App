async function signup(e) {
    try{
        e.preventDefault();
        console.log(e.target.email.value);

        const signupDetails = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone:e.target.phone.value,
            password: e.target.password.value
            
        }
        console.log(signupDetails)
        const response  = await axios.post('http://localhost:5000/user/signup',signupDetails)
            if(response.status === 201){
                window.location.href = "../Login/login.html" // change the page on successful login
            } else {
                throw new Error('Failed to login')
            }
            
    }catch(err){
        document.body.innerHTML += `<div style="color:red;">${err} <div>`;
    }
}
