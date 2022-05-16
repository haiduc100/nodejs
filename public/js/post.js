let totalData;

renderListButton = (total) => {
  let limit = $("#limit").val();
  let totalButton = Math.ceil(totalData / limit);
  $(".buttonList").html("");
  for (let i = 1; i <= total; i++) {
    if (totalButton > 2) {
      $(".next").attr("onclick", " changePage(2)");
    }
    $(".next").attr("onclick", " ");

    $(".buttonList").append(`
    <button onclick="changePage(${i})">${i}</button>
    `);
  }
};
$.ajax({
  url: "/post",
  type: "GET",
})
  .then((data) => {
    totalData = data.length;
    let total = Math.ceil(totalData / 3);
    renderListButton(total);
  })
  .catch((err) => {
    console.log(err);
  });

changePage = (page) => {
  let limit = $("#limit").val();
  let skip = (page - 1) * limit;
  let totalButton = Math.ceil(totalData / limit);

  renderListPost(skip, limit);
  $(".next").attr("onclick", `changePage(${page + 1})`);
  $(".prev").attr("onclick", `changePage(${page - 1})`);
  if (page === totalButton) {
    $(".next").attr("onclick", "");
  } else if (page === 1) {
    $(".prev").attr("onclick", "");
  }
};
renderListPost = (skip, limit) => {
  $.ajax({
    url: `/post/pagination?limit=${limit}&skip=${skip}`,
    type: "GET",
  })
    .then((data) => {
      $(".listPost").html("");
      data.map((value, index) => {
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
      handleDelete = (id) => {
        $.ajax({
          url: `/post/${id}`,
          type: "DELETE",
        })
          .then(() => {
            window.location.reload();
          })
          .catch((err) => {
            console.log(err);
          });
      };
    })
    .catch((err) => {
      console.log(err);
    });
};
renderListPost(0, 3);

handleAdd = () => {
  window.location.href = "/post/create";
};

changeView = () => {
  let limit = $("#limit").val();
  let totalButton = Math.ceil(totalData / limit);
  renderListButton(totalButton);
  renderListPost(0, limit);
};

handleFind = () => {
  let username = $("#filter").val().trim();
  console.log(username);
  $.ajax({
    url: `/post/${username}`,
    type: "GET",
  })
    .then((post) => {
      if (post) {
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
      } else {
        $(".listPost").append(`
          <tr>
            <td>Empty</td>
          </tr>
        `);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
