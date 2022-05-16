handleAdd = () => {
  let title = $(".title").val().trim();
  let content = $(".content").val().trim();
  let author = $(".author").val().trim();
  $.ajax({
    url: "/post",
    type: "POST",
    data: {
      title: title,
      author: author,
      content: content,
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
