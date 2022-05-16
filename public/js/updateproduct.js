handleUpdate = (e) => {
    console.log(e);
    let category = $(".category").val().trim();
    let productName = $(".productName").val().trim();
    let price = $(".content").val().trim();
    let quanlity = $(".quanlity").val().trim();

    $.ajax({
        url: `/product/${window.location.href.split("/")[6]}`,
        type: "PUT",
        data: {
            category, price, quanlity, productName
        },
    })
        .then((data) => {
            console.log(data);
            window.location.href = "/product/home";
        })
        .catch((err) => {
            console.log(err);
        });
};

$.ajax({
    url: `/product/${window.location.href.split("/")[6]}`,
    type: "GET",
})
    .then((data) => {
        $(".category").val(data.category);
        $(".productName").val(data.productName);
        $(".price").val(data.price);
        $(".quanlity").val(data.quanlity);
    })
    .catch((err) => {
        console.log(39, err);
    });
