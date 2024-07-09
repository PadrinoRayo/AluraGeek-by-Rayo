import { connectAPI } from "./index.js"

const card = document.querySelector("[dataCard]")

function getCard(image, title, price, id) {
    const product = document.createElement("div");
    product.className = "card";
    product.innerHTML = `
        <img class="product" src=${image} alt="Imagen Del Producto" />
            <div class="card-container--info">
            <p class="title">${title}</p>
                <div class="card-container--value">
                    <p>$${price}</p>
                    <img class="iconDelete" src="assets/icon/delete.svg" alt="Eliminar" />
                </div>
            </div>`;

            const iconDelete = product.querySelector(".iconDelete");
            iconDelete.addEventListener("click", async () => {
                try {
                    await connectAPI.deleteProduct(id);
                    product.remove();
                } catch (error) {
                    console.error("Error al eliminar el producto", error);
                }
            });

    return product;
}

async function listProducts() {

    try {
        const listAPI = await connectAPI.listProducts()

        listAPI.forEach(product => card.appendChild(getCard(product.image, product.title, product.price, product.id)))
    }catch{
        card.innerHTML=`<h2 class = "errorMessage">Ha ocurrido un problema con la conexion</h2>`
    }
}

listProducts()