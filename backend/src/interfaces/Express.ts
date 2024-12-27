import { JWTPayload } from "./userInterfaces";

declare global {
    namespace Express {
        interface Request {
            user?: JWTPayload
        }
    }
}