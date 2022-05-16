changepass = () => {
  let username = $("#username").val().trim();
  let password = $("#password").val().trim();
  let newpassword = $("#newpassword").val().trim();
  let idUser = document.cookie.split("=")[1];
  console.log(idUser);
  $.ajax({
    url: `/user/${idUser}`,
    method: "PUT",
    data: { username: username, password: password, newpassword: newpassword },
  })
    .then((data) => {
      console.log(data);
      if (data.status === 400) {
        alert(data.message);
      } else {
        window.location.href = "/user/login";
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
