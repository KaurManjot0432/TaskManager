import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let token = req.header("auth-token");

        if (!token) {

            return res.status(403).send("Access Denied");

        }

        const secretKey = process.env.JWT_SECRET;

        if (!secretKey) {
            console.error('JWT secret key is not defined.');
            process.exit(1);
        }
        const verified = verify(token, secretKey);
        req.body.userId = verified.id;

        next();
    } catch (err: any) {
        res.status(500).json({ Tokenerror: err.message });
    }
};
export { verifyToken };