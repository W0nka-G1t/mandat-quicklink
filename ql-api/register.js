document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById('registerForm');

  if (!form) {
    console.error("Form not found!");
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    const username = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    console.log(username, password);
  });
});
