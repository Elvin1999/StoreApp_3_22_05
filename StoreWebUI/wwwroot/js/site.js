function addProduct() {
    var response = getUploadedImage();
    response.then((d) => {
        const name = document.getElementById("product").value;
        const price = document.getElementById("price").value;
        const quantity = document.getElementById("quantity").value;

        let obj = {
            "id": 0,
            "name": name,
            "price": Number(price),
            "quantity": Number(quantity),
            "imageUrl":d
        };

        console.log("Object", obj);
        $.ajax({
            url: 'https://localhost:22955/p',
            method: "POST",
            data: JSON.stringify(obj),
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log(response);
                location.href = "https://localhost:7224";
            }
        })
    });
}

function getUploadedImage() {
    var fileInput = document.getElementById("MyImage");
    if (fileInput.files.length == 0) {
        return "https://cdn.pixabay.com/photo/2022/05/23/12/49/product-7216106_640.png";
    }

    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append("file", file);
    return $.ajax({
        url: 'https://localhost:22955/i',
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            return response;
        },
        error: function () {
            console.log("Request failed");
        }
    })
}