import {prisma} from '../db/client.js';
interface createConversation {
    buyerId: string;
    listingId: string;
}

export const createConversation = async (data: createConversation) => {
    try {
        const listingExists = await prisma.listing.findUnique({where: {id: data.listingId}});
        if (!listingExists) {
            throw new Error('Listing not found');
        }
        const buyerIsNotSeller = listingExists.sellerId !== data.buyerId;
        if (!buyerIsNotSeller) {
            throw new Error('Seller cannot start a conversation with themselves');
        }
        const conversationExistsfromlisting = await prisma.conversation.findFirst({
            where: {
                listingId: data.listingId,
                buyerId: data.buyerId
            }
        });
        if (conversationExistsfromlisting) {
            throw  Error('Conversation already exists for this listing and buyer');
        }
        const conversation = await prisma.conversation.create({
            data: {
                sellerId: listingExists.sellerId,
                buyerId: data.buyerId,
                listingId: data.listingId
            }
        });
        return conversation;
    } catch (error) {
        throw (error instanceof Error) ? error : new Error('Failed to create conversation');
    }
   
}

export const getMyConversations = async (userId: string) => {
    try {
        const conversations = await prisma.conversation.findMany({
            where: {
                OR: [
                    {buyerId: userId},
                    {sellerId: userId}
                ]
            },
            include: {
                listing: {
                    select: {
                       exactModel: true,
                    }
                },
                buyer: {
                    select: {
                        name: true,
                        avatar: true
                    }
                },
                seller: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        });
        return conversations;
    } catch (error) {
        throw (error instanceof Error) ? error : new Error('Failed to fetch conversations');
    }

}

export const getConversationById = async (conversationId: string ,userId :string) => {
    try {
       
        const conversation = await prisma.conversation.findUnique({
            where: {id: conversationId},
            include: {
                listing: {
                    select: {
                        exactModel: true
                    }
                },
                buyer: {
                    select: {
                        name: true,
                        avatar: true
                    }
                },
                seller: {
                    select: {
                        name: true,
                        avatar: true
                    }
                }
            }
        });
        if (!conversation) {
            throw new Error('Conversation not found');
        }
        if(conversation.buyerId !== userId && conversation.sellerId !== userId) {
            throw new Error('Unauthorized access to this conversation');
        }
        return conversation;
    } catch (error) {
        throw (error instanceof Error) ? error : new Error('Failed to fetch conversation');
    }
}