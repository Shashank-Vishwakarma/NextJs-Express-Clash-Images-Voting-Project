import { Server } from "socket.io";
import { incrementVoteThroughQueue } from "./queue/votingQueue/producer.js";
import { addCommentToQueue } from "./queue/commentQueue/producer.js";

export function setUpSocket(io: Server) {
    io.on("connection", (socket) => {
        console.log("socket connected", socket.id);

        socket.on("disconnect", () => {
            console.log("socket disconnected", socket.id);
        });

        // listen to other events
        socket.onAny(async (event: string, data: any) => {
            if (event.startsWith("clash-")) {
                await incrementVoteThroughQueue(
                    data?.clashId,
                    data?.clashItemId
                );
                socket.broadcast.emit(event, data);
            } else if (event.startsWith("comments-clash-")) {
                await addCommentToQueue(data);
                socket.broadcast.emit(event, data);
            }
        });
    });
}
