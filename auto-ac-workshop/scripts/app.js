// Example JavaScript for handling forms (like Sign In, Sign Up, etc.)
document.getElementById('signInForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Sign In:', { email, password });
});

document.getElementById('signUpForm')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Sign Up:', { name, email, password });
});
