async function login(email, password) {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/login',
      data: {
        email,
        password
      }
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  login(email, password);
});
