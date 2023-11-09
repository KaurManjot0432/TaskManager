import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];
    let jwtPayload;

    try {
        jwtPayload = <any>jwt.verify(token, process.env.JWT_SECRET);
        res.locals.jwtPayload = jwtPayload;
    } catch(e) {
        res.status(401).json({ message: 'Not Authorized'});
    }

    const { userId, username } = jwtPayload;

    const newToken = jwt.sign({ userId, username }, process.env.JWT_SECRET, {expiresIn: '1h'});
    res.setHeader('token', newToken);

    next();
}