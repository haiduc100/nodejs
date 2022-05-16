renderListButton = (totalPages, hasNextPage, hasPrevPage) => {
  $(".buttonList").html("");
  for (let i = 1; i <= totalPages; i++) {
    $(".buttonList").append(`
        <button onclick="changePage(${i},${hasNextPage},${hasPrevPage})">${i}</button>
    `);
  }
  console.log(totalPages)
  if (totalPages >= 2) {
    $(".next").attr("onclick", "changePage(2)");
  } else {
    $(".next").attr("onclick", "");
  }
}

let changePage = (page, hasNextPage, hasPrevPage) => {

  renderListProduct(page);
  $(".next").attr("onclick", `changePage(${page + 1})`);
  if (page == 1) {
    $(".prev").attr("onclick", ``);
  } else {
    $(".prev").attr("onclick", `changePage(${page - 1})`);
  }
  console.log(hasNextPage);
  console.log(hasPrevPage)
  if (hasNextPage === false) {
    $(".next").attr("onclick", "");
  } else if (hasPrevPage === false) {
    $(".prev").attr("onclick", "");

  }
}

renderListProduct = (page) => {
  const category = window.location.href.split("/")[5];
  $.ajax({
    url: `/product/category?limit=2&page=${page}`,
    type: "POST",
    data: {
      category: category
    }
  }).then((data) => {
    console.log(data)

    $('.listProduct').html("");
    data.data.docs.map((value, index) => {
      $(".listProduct").append(
        `
      <tr>
        <td>${index + 1}</td>
        <td>${value.category}</td>
        <td>${value.productName}</td>
        <td>${value.price}</td>
        <td>${value.quantity}</td>
        </tr>
      `
      )
    })
    renderListButton(data.data.totalPages, data.data.hasNextPage, data.data.hasPrevPage);

  }).catch((error) => {
    console.log(error)
  })
}

renderListProduct(1);




