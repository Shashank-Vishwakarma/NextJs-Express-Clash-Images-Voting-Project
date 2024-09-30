import prisma from "../database/prisma.js";

export async function incrementVoteByOne(clashId: string, clashItemId: string) {
    try {
        await prisma.clashItem.update({
            where: {
                id: clashItemId,
            },
            data: {
                count: {
                    increment: 1,
                },
            },
        });
    } catch (error) {
        console.log("Error in incrementVoteByOne: ", error.message);
    }
}

export async function addCommentInDatabase(data: any) {
    try {
        await prisma.comment.create({
            data: {
                title: data?.title,
                clashId: data?.clashId,
            },
        });
    } catch (error) {
        console.log("Error in addCommentInDatabase: ", error.message);
    }
}
