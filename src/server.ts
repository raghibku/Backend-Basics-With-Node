import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import routeHandler from "./route/route";

const server: Server = createServer((req: IncomingMessage,res : ServerResponse)=>{
    routeHandler(req,res);
})

server.listen(5000, ()=>{
    console.log( "Server is Running !" )
})