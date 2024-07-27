import { Request, Response } from "express";
import PolygonService from "./polygon-service";

const PolygonController = {
    async createNewProblem(req: Request, res: Response) {
        const { title, apiKey, apiSecret } = req.body;
        try {
            const problem = await PolygonService.createNewProblem(title, apiKey, apiSecret);
            res.json(problem);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async saveFile(req: Request, res: Response) {
        const { type, file, sourceType, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.saveFile(type, file, sourceType, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async buildPackage(req: Request, res: Response) {
        const { id, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.buildPackage(id, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async commitChanges(req: Request, res: Response) {
        const { id, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.commitChanges(id, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateTests(req: Request, res: Response) {
        const { id, tests, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateTests(id, tests, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateSample(req: Request, res: Response) {
        const { id, testInput, testOutput, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateSample(id, testInput, testOutput, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateConstraints(req: Request, res: Response) {
        const { id, timeLimit, memoryLimit, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateConstraints(id, timeLimit, memoryLimit, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateStatement(req: Request, res: Response) {
        const { id, title, statement, input, output, notes, problemLanguage, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateStatement(id, title, statement, input, output, notes, problemLanguage, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateChecker(req: Request, res: Response) {
        const { id, checker, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateChecker(id, checker, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateSolution(req: Request, res: Response) {
        const { id, solution, userLang, apiKey, apiSecret } = req.body;
        try {
            await PolygonService.updateSolution(id, solution, userLang, apiKey, apiSecret);
            res.sendStatus(200);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    },

    async getProblemById(req: Request, res: Response) {
        const { id, apiKey, apiSecret } = req.query;
        try {
            const problem = await PolygonService.getProblemById(Number(id), apiKey as string, apiSecret as string);
            res.json(problem);
        } catch (err: any) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default PolygonController;
