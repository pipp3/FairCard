import type { Request, Response } from "express";
import { createListing, getListings, getListing, updateListing, deleteListing } from "../services/listingsServices.js";
export class ListingsController {

    static async create(req: Request, res: Response) {
        try {
            const data = await createListing(req.body, req.user?.id);
            res.status(201).json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    
    static async getAll(req: Request, res: Response) {
        try {
            const { page, pageSize, search, vendor, manufacturer, condition } = req.query;
            const data = await getListings({
                page: Number(page) || 1,
                pageSize: Number(pageSize) || 10,
                search: search as string | undefined,
                vendor: vendor as string | undefined,
                manufacturer: manufacturer as string | undefined,
                condition: condition as any
            });
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "Invalid listing ID" });
                return;
            }
            const data = await getListing(id);
            res.json(data);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "Invalid listing ID" });
                return;
            }
            const data = await updateListing(id, req.body, req.user?.id);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id || Array.isArray(id)) {
                res.status(400).json({ error: "Invalid listing ID" });
                return;
            }
            const data = await deleteListing(id, req.user?.id);
            res.json(data);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}