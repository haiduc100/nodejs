$.ajax({
  url: `/comment/${window.location.href.split("/")[5]}`,
  type: "GET",
})
  .then((data) => {
    console.log(data);
    console.log(window.location.href.split("/")[5]);
    data.map((value, index) => {
      $(".listComment").append(
        `
          <tr>
            <td>${index + 1}</td>
            <td>${value.content}</td>
            <td>${value.idUser.username}</td>
            <td>
            <a class="btn btn-success" >View</a>
            <a class="btn btn-warning" href="/comment/update/${
              value._id
            }">Update</a>
            <button class="btn btn-danger" onclick="handleDelete('${
              value._id
            }')">Delete</button>
            </td>
          </tr>
        `
      );
    });
    handleDelete = (id) => {
      console.log(id);

      $.ajax({
        url: `/comment/${id}`,
        type: "DELETE",
      })
        .then((data) => {
          if (data.status === 400) {
            console.log(data);
          } else {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  })
  .catch((err) => {
    console.log(err);
  });
