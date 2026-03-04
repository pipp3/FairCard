import type { Request, Response } from "express";

import { createConversation, getMyConversations, getConversationById } from "../services/conversationServices.js";

export class ConversationController {

    static async create(req: Request, res: Response) {
        try {
            const data = await createConversation({
                buyerId: req.user.id!,
                listingId: req.body.listingId
            });
            res.status(201).json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getMyConversations(req: Request, res: Response) {
        try {
            const userId = req.user.id!;
            const data = await getMyConversations(userId);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getConversationById(req: Request, res: Response) {
        try {
            const userId = req.user.id!;
            const id= req.params.id;
            if(!id){
                return res.status(400).json({ error: 'Conversation ID is required' });
             }
            const data = await getConversationById(id as string, userId);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}
