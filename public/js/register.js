handleRegister = () => {
    let username = $(".username").val().trim();
    let password = $(".password").val().trim();
    let role = $(".role").val().trim();

    $.ajax({
        url: "/user/register",
        type: "POST",
        data: {username, password, role},
    })
        .then((data) => {
            if (data.status === 400) {
                alert(data.message);
            } else {
                window.location.href = "/user/login";
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
