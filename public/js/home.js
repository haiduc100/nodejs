$.ajax({
  url: "http://localhost:4000/user",
  type: "GET",
})
  .then((data) => {
    data.map((value, index) => {
      $(".listUser").append(
        `
        <tr>
        <td>${index + 1}</td>
        <td>${value.username}</td>
        <td>${value.password}</td>
        </tr>
      `
      );
    });
  })
  .catch((err) => {
    console.error(err);
  });

addUser = () => {
  let username = $(".username").val().trim();
  let password = $(".password").val().trim();
  console.log(username, password);

  $.ajax({
    url: "/user",
    type: "POST",
    data: {
      username: username,
      password: password,
    },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
};

changepass = () => {
  let username = $(".username").val();
  let password = $(".password").val();
  let newpassword = $(".newpassword").val();

  $.ajax({
    url: "/user/6259db1e9cae588aef3ccc00",
    method: "PUT",
    data: { username: username, password: password, newpassword: newpassword },
  })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
