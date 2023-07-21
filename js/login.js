(function () {
  const $user = document.getElementById("login_email");
  const $password = document.getElementById("login_senha");
  const $form = document.getElementById("form-login");

  let data;

  fetch("../data.json")
    .then((response) => {
      return response.json();
    })
    .then((body) => {
      data = body.data;
      data = data.login;
    });

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (
      data.find(
        (user) =>
          user.email === $user.value && user.password === $password.value
      )
    ) {
      window.location.href = "/paginas/BibliotecaVirtual.html";
    } else {
      alert("Email e/ou senha invalidos!");
    }
  });
})();
