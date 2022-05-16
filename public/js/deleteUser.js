deleteUser = () => {
  let username = $("#username").val().trim();
  let password = $("#password").val().trim();
  let idUser = window.location.href.split("/")[5];
  $.ajax({
    url: ` /user/${idUser}`,
    method: "delete",
    data: { username: username, password: password },
  })
    .then((data) => {
      console.log(data);
      window.location.href = "/home";
    })
    .catch((err) => {
      console.log(err);
    });
};
