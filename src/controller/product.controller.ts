import type { IncomingMessage, ServerResponse } from "node:http";
import { createProduct, productService } from "../service/product.service";
import type { IProduct } from "../types/product";
import { bodyParser } from "../utils/parseBody";

const productController = async(req: IncomingMessage, res: ServerResponse) => {
    const url = req.url;
    const method = req.method;
    const urlParams = url?.split('/');
    const id = urlParams && urlParams[1] === "products" ? Number(urlParams[2]) : null;
    const products = productService()
    // Get all products
    if (url === "/products" && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(
            {
                message: "Products Retrived Successfully.",
                data: products,
            }
        ))
    } 
    // find a product by id
    else if (method === "GET" && id !== null) {
        const product = products.find((p: IProduct)=>p.id === id)
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(
            {
                message: "Products Retrived Successfully.",
                data: product,
            }
        ))
    }
    // add product
    else if (method === "POST" && url === "/products") {

        const body = await bodyParser(req)
        const newProduct = {
            id : Date.now(),
            ...body
        }
        products.push(newProduct);
        createProduct(products);

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(
            {
                message: "Products Retrived Successfully.",
                data: newProduct
            }
        ))
    }
}

export default productController;