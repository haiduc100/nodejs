const userID = window.localStorage.getItem("userid");
handleAdd = () => {
  window.location.href = "/post/create";
};

handleLogout = () => {
  document.cookie = "user" + "=; Path=/; Expires=Thu, 01-Jan-70 00:00:01 GMT;";

  window.location.href = "/user/login";
};
handleChangePassword = () => {
  window.location.href = "/user/change_password";
};
$.ajax({
  url: `/post/userpost/${userID}`,
  type: "GET",
})
  .then((post) => {
    $(".listPost").html("");
    post.map((value, index) => {
      $(".listPost").append(`
          <tr>
              <td>${index + 1}</td>
              <td>${value.title}</td>
              <td>${value.author.username}</td>
              <td>${value.content}</td>
              <td>
              <a href="${window.location.href}/update/${
        value._id
      }" class="btn btn-warning" >Edit</a>
              <a href="${window.location.href}/${
        value._id
      }"  class="btn btn-success">View</a>
              <button class="btn btn-danger" onclick="handleDelete('${
                value._id
              }')">Delete</button>
              </td>
          </tr>
          `);
    });
  })
  .catch((err) => {
    console.log(err);
  });
