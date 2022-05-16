$.ajax({
  url: "/user",
  type: "GET",
})
  .then((data) => {
    sum = data.length;
    node = Math.ceil(sum / 5);
    for (let i = 1; i <= node; i++) {
      let btn = `
        <button>${i}</button>
        `;
      $("body").append(btn);
    }
  })
  .catch((err) => {
    console.log(err);
  });

$.ajax({
  url: "/user/page?page=1&qual=5",
  type: "GET",
})
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
