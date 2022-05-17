update = async () => {
    try {
        const link = window.location.href.split("/")[4];
        console.log(link);
        //get dom of form
        const form = await $('form')[0]
        const formData = await new FormData(form)

        const res = $.ajax({
            url: `/user/${link}/avatar`,
            type: "PUT",
            data: formData,
            contentType: false,
            processData: false
        })
        window.location.href = "/home";
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}