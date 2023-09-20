const users = document.getElementById('users');

users.addEventListener('click', async (event) => {
  if (event.target.classList.contains('update-button')) {
    event.preventDefault();

    const userId = event.target.closest('.user').dataset.userId;
    console.log(userId);

    const roleSelect = event.target.closest('form').querySelector('select[name="role"]');
    const selectedRole = roleSelect.value;
    console.log(selectedRole);

    const response = await fetch(`/api/users/${userId}/role`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ role: selectedRole })
    });

    if (response.ok) {
      alert('User role updated successfully');
      window.location.reload();
      console.log('User role updated successfully');
    } else {
      console.error('Failed to update user role');
    }
  } else if (event.target.classList.contains('delete-button')) {
    event.preventDefault();

    const userId = event.target.closest('.user').dataset.userId;

    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    if (response.ok) {
      alert('User deleted successfully');
      window.location.reload();
      console.log('User deleted successfully');
    } else {
      console.error('Failed to delete user');
    }
  }
});
