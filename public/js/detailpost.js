$.ajax({
  url: `/post/${window.location.href.split("/")[5]}`,
  type: "GET",
})
  .then((data) => {
    console.log(data);
    console.log(window.location.href.split("/"));
    $(".detailPost").append(
      `
        <tr>
            <td>${data.title}</td>
            <td>${data._id}</td>
            <td>${data.author.username}</td>
            <td>${data.author.password}</td>
            <td>${data.content}</td>
            <td><a href="/comment/home/${data._id}">List Comment</a></td>
        </tr>
      `
    );
  })
  .catch((err) => {
    console.log(err);
  });
