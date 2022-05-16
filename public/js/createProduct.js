handleAdd = () => {
  let category = $(".category").val().trim();
  let productName = $(".productName").val().trim();
  let price = $(".price").val().trim();
  let quantity = $(".quantity").val().trim();
  $.ajax({
    url: '/product',
    type: "POST",
    data: {category: category, productName: productName, price: price, quantity: quantity}
  }).then((data) => {
    window.location.href = '/product/home'
  }).catch((error) => {
    console.log(error)
  })
}
