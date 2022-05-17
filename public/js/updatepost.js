handleUpdate = (e) => {
  //  $(".title").val()=
  // $(".author").val();
  // $(".content").val();
  console.log(e);
  let title = $(".title").val().trim();
  let author = $(".author").val().trim();
  let content = $(".content").val().trim();

  $.ajax({
    url: `/post/${window.location.href.split("/")[6]}`,
    type: "PUT",
    data: {
      title: title,
      content: content,
      author: author,
    },
  })
    .then((data) => {
      console.log(data);
      window.location.href = "/post/home";
    })
    .catch((err) => {
      console.log(err);
    });
};

$.ajax({
  url: `/post/findpost/${window.location.href.split("/")[6]}`,
  type: "GET",
})
  .then((data) => {
    $(".title").val(data.title);
    $(".author").val(data.author._id);
    $(".content").val(data.content);
  })
  .catch((err) => {
    console.log(39, err);
  });
