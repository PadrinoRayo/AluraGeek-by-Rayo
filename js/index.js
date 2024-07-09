const url = "http://localhost:3000/Products"

async function listProducts() {
    const connect = await fetch(url);

    const connectProducts = connect.json();

    return connectProducts
}

async function sendProduct(title, price, image) {
    const connect = await fetch(url, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
            title: title,
            price: price,
            image: image

        })
    })
    const connectProducts = await connect.json();

    if (!connect.ok) {
        throw new Error("Ha ocurrido un error al enviar el producto");
    }

    return connectProducts;
}

async function deleteProduct(productId) {
    const connect = await fetch(`${url}/${productId}`, { method: "DELETE" });
    const connectProducts = connect.json();
    return connectProducts
}

export const connectAPI = {
    listProducts, sendProduct, deleteProduct
}