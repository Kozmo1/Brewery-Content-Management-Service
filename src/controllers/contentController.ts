import { AuthRequest } from "../middleware/auth";
import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { config } from "../config/config";
import { validationResult } from "express-validator";

interface ContentItem {
    id: string;
    title: string;
    type: string; // "article" | "video" | "image"??
    body: string;
    createdAt: string;
    updatedAt: string;
}

export class ContentController {
    private readonly breweryApiUrl = config.breweryApiUrl;
    public async createContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { title, type, body } = req.body;

        try {
            const response = await axios.post(`${this.breweryApiUrl}/api/content`, {
                title,
                type,
                body,
                createdAt: new Date().toISOString()
            });
            res.status(201).json({
                message: "Content created successfully",
                content: response.data
            });
        } catch (error: any) {
            console.error("Error creating content:", error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Error creating content",
                error: error.response?.data?.errors || error.message
            });
        }
    }

    public async getContentById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { id } = req.params;

        try {
            const response = await axios.get<ContentItem>(`${this.breweryApiUrl}/api/content/${id}`);
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error("Error fetching content:", error.response?.data || error.message);
            res.status(error.response?.status || 404).json({
                message: error.response?.data?.message || "Content not found",
                error: error.response?.data?.errors || error.message
            });
        }
    }

    public async getAllContent(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const response = await axios.get<ContentItem[]>(`${this.breweryApiUrl}/api/content`);
            res.status(200).json(response.data);
        } catch (error: any) {
            console.error("Error fetching all content:", error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                message: error.response?.data?.message || "Error fetching content",
                error: error.response?.data?.errors || error.message
            });
        }
    }

    public async updateContent(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() });
            return;
        }

        const { id } = req.params;
        const { title, type, body } = req.body;

        try {
            const response = await axios.put(`${this.breweryApiUrl}/api/content/${id}`, {
                title,
                type,
                body,
                updatedAt: new Date().toISOString()
            });
            res.status(200).json({
                message: "Content updated successfully",
                content: response.data
            });
        } catch (error: any) {
            console.error("Error updating content:", error.response?.data || error.message);
            res.status(error.response?.status || 404).json({
                message: error.response?.data?.message || "Content not found",
                error: error.response?.data?.errors || error.message
            });
        }
    }
}