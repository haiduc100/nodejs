const unique = (value, index, self) => {
    return self.indexOf(value) === index
}

const listCategory = [];
const checkedCate = [];
console.log(6, listCategory)

find = async () => {
    try {
        const max = $('.max').val();
        const min = $('.min').val();
        console.log(min, max)
        $.ajax({
            url: `/product/findCategory?category=${checkedCate.join(",")}&min=${min}&max=${max}`,
            type: "GET"
        }).then((data) => {
            console.log(data)
        }).catch((e) => {
            console.log(e);
        })
    } catch (e) {
        console.log(e);

    }
}
$.ajax({
    url: "/product",
    type: "GET"
}).then((data) => {
    console.log(data)
    data.map((value, index) => {
        listCategory.push(value.category)
        $(".listProduct").append(
            `
      <tr>
        <td>${index + 1}</td>
        <td>${value.category}</td>
        <td>${value.productName}</td>
        <td>${value.price}</td>
        <td>${value.quantity}</td>
        <td>
        <a href="/product/update/${
                value._id
            }" class="btn btn-warning" >Edit</a>
        <a href="/product/detail/${
                value._id
            }"  class="btn btn-success">View</a>
        <button class="btn btn-danger" onclick="handleDelete('${
                value._id
            }')">Delete</button>
        </td>
        </tr>
      `
        )

        handleDelete = (id) => {
            $.ajax({
                url: `/product/${id}`,
                type: 'DELETE',
            })
                .then(() => {
                    window.location.reload();
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    })
    const uniqueCategory = listCategory.filter(unique);
    uniqueCategory.map((value) => {
        $(".listCheckBox").append(
            `
        <input class="checkBox" type="checkbox" id="${value}" name="${value}" value="${value}">
        <lable for="${value}" >${value}</lable>
      `
        )
    })

    $(".checkBox").on("change", function () {
        let checkedValue = $(this).val();

        if ($(this).prop('checked')) {
            checkedCate.push(checkedValue)
        } else {
            let index = checkedCate.indexOf(checkedValue);
            checkedCate.splice(index, 1);
        }
        console.log(65, checkedCate)
        console.log(66, checkedCate.join(","))
    })
})

addProduct = () => {
    window.location.href = '/product/create'
}

handleFilter = () => {
    let category = $('.filterCate').val().trim();
    window.location.href = `/product/category/${category}`

    console.log(category)
}