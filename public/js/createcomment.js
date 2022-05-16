handleAdd = () => {
  let idPost = $(".idPost").val().trim();
  let idUser = $(".idUser").val().trim();
  let content = $(".content").val().trim();
  $.ajax({
    url: "/comment/",
    type: "POST",
    data: {
      idPost: idPost,
      idUser: idUser,
      content: content,
    },
  })
    .then(() => {
      window.location.href = `/comment/home/${idPost}`;
    })
    .catch((error) => {
      console.log(error);
    });
};
