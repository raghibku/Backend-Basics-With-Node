import type { IncomingMessage, ServerResponse } from "node:http";
import productController from "../controller/product.controller";

const routeHandler = (req: IncomingMessage, res: ServerResponse) => {
    const url = req.url
    const method = req.method
    if (url === '/' && method === "GET") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This is the root directory !" }));
    } else if (url?.startsWith('/products')) {
        productController(req  , res);
    } else {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "This route is not defined" }));
    }
}

export default routeHandler;