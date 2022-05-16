handleLogin = () => {
  console.log($(".username").val());
  console.log($(".password").val());
  $.ajax({
    url: "/user/login",
    type: "POST",
    data: {
      user: $(".username").val().trim(),
      pass: $(".password").val().trim(),
    },
  })
    .then((data) => {
      console.log(data);
      $(".noti").html("");
      $(".noti").append(data.message);
      console.log(16, data.userid);
      if (data.status == 200) {
        window.localStorage.setItem("userid", data.userid);

        window.location.href = "/post/user";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
