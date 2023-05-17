const signup = document.getElementById('signup');
signup.addEventListener('submit', onSubmit);

async function onSubmit(e) {
    try {
        e.preventDefault();
    
    let signupObject = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        number: document.getElementById('number').value
        
    }
    console.log(signupObject)
    const response =  await axios
        .post('http://localhost:3000/user/signup', signupObject)
        if(response.status === 201){
            window.location.href = "../Login/login.html" // change the page on successful login
        } else {
            throw new Error('Failed to login')
        }
        
}catch(err){
    document.body.innerHTML += `<div style="color:red;">${err} <div>`;
}
}