import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import axios from "axios";
import { config } from "../config/config";
import { AuthRequest } from "../middleware/auth";

export class ContentController {
	private readonly breweryApiUrl = config.breweryApiUrl;

	async createContent(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}

		try {
			const response = await axios.post(
				`${this.breweryApiUrl}/api/content`,
				req.body
			);
			res.status(201).json({
				message: "Content created successfully",
				content: response.data,
			});
		} catch (error: any) {
			console.error(
				"Error creating content:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 500).json({
				message:
					error.response?.data?.message || "Error creating content",
				error: error.response?.data?.errors || error.message,
			});
		}
	}

	async getContentById(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const response = await axios.get(
				`${this.breweryApiUrl}/api/content/${req.params.id}`
			);
			res.status(200).json(response.data);
		} catch (error: any) {
			console.error(
				"Error fetching content:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 404).json({
				message: error.response?.data?.message || "Content not found",
				error: error.response?.data?.errors || error.message,
			});
		}
	}

	async getAllContent(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const response = await axios.get(
				`${this.breweryApiUrl}/api/content`
			);
			res.status(200).json(response.data);
		} catch (error: any) {
			console.error(
				"Error fetching all content:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 500).json({
				message:
					error.response?.data?.message || "Error fetching content",
				error: error.response?.data?.errors || error.message,
			});
		}
	}

	async updateContent(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			res.status(400).json({ errors: errors.array() });
			return;
		}

		try {
			const response = await axios.put(
				`${this.breweryApiUrl}/api/content/${req.params.id}`,
				req.body
			);
			res.status(200).json({
				message: "Content updated successfully",
				content: response.data,
			});
		} catch (error: any) {
			console.error(
				"Error updating content:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 404).json({
				message: error.response?.data?.message || "Content not found",
				error: error.response?.data?.errors || error.message,
			});
		}
	}

	async deleteContent(
		req: AuthRequest,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			await axios.delete(
				`${this.breweryApiUrl}/api/content/${req.params.id}`
			);
			res.status(200).json({ message: "Content deleted successfully" });
		} catch (error: any) {
			console.error(
				"Error deleting content:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 404).json({
				message: error.response?.data?.message || "Content not found",
				error: error.response?.data?.errors || error.message,
			});
		}
	}

	async getContentByType(
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> {
		try {
			const response = await axios.get(
				`${this.breweryApiUrl}/api/content/type/${req.params.type}`
			);
			res.status(200).json(response.data);
		} catch (error: any) {
			console.error(
				"Error fetching content by type:",
				error.response?.data || error.message
			);
			res.status(error.response?.status || 500).json({
				message:
					error.response?.data?.message || "Error fetching content",
				error: error.response?.data?.errors || error.message,
			});
		}
	}
}
