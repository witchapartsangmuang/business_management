import { Request } from "express";
export interface AuthRequest extends Request {
    user?: AccessTokenPayload;
}

export type AccessTokenPayload = {
    id: number;
    email: string;
};