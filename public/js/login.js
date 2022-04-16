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
    if (res.data.status == 'success') {
      alert('Login successfully !');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    alert(error.response.data.message);
    document.querySelector('#password').value = '';
  }
}

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const email = document.getElementById('email').value;
  login(email, password);
});
