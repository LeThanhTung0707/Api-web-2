const login = async (email, password) => {
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
      showAlert('success', 'Login successfully !');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
    document.querySelector('#password').value = '';
  }
};
const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/users/logout'
    });
    showAlert('success', 'Log Out successfully ! ');
    setTimeout(() => {
      if (location.pathname.startsWith('/me')) return location.assign('/');
      if (res.data.status == 'success') location.reload(true);
    }, 2000);
  } catch (error) {
    showAlert('error', 'Error happen ! Please try again !');
  }
};

const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm
      }
    });
    showAlert('success', 'Sign Up Successfully ! ');
    setTimeout(() => {
      location.assign('/');
    }, 1500);
  } catch (error) {
    showAlert('error', error.message);
  }
};

if (document.querySelector('.form--login')) {
  document.querySelector('.form--login').addEventListener('submit', e => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    login(email, password);
  });
}
if (document.querySelector('.nav__el--logout')) {
  document.querySelector('.nav__el--logout').addEventListener('click', e => {
    e.preventDefault();
    logout();
  });
}
if (document.querySelector('.form--signup')) {
  document.querySelector('.form--signup').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const password = document.getElementById('password').value;
    const email = document.getElementById('email').value;
    signup(name, email, password, passwordConfirm);
  });
}
