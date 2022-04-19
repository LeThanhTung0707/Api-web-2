const updateSettings = async (data, type) => {
  try {
    const url =
      type === 'password'
        ? '/api/v1/users/updateMyPassword'
        : '/api/v1/users/updateMe';
    const res = await axios({
      method: 'PATCH',
      url,
      data
    });
    if (res.data.status == 'success') {
      showAlert('success', 'Update successfully');
      setTimeout(() => {
        location.reload(true);
      }, 1500);
    }
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

if (document.querySelector('.form-user-data')) {
  document.querySelector('.form-user-data').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;

    updateSettings({ name, email }, 'data');
  });
}
if (document.querySelector('.form-user-settings')) {
  document
    .querySelector('.form-user-settings')
    .addEventListener('submit', e => {
      e.preventDefault();
      const passwordCurrent = document.getElementById('password-current').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('password-confirm').value;
      updateSettings(
        { passwordCurrent, password, passwordConfirm },
        'password'
      );
    });
}
