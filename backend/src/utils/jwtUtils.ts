import jwt from 'jsonwebtoken'

export const generateToken = (payload: object, secret: string, expiresIn: string = '30d'): string => {
    return jwt.sign(
        payload,
        secret,
        { expiresIn }
    );
}

export const verifyToken = (token: string, secret: string): any => {
    try {
        return jwt.verify(token, secret);
    }
    catch(error) {
        console.error("Unable to verify token: ", error)
        return null;
    }
}