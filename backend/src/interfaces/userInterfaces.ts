export interface Signup  {
    username: string;
    password: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface JWTPayload {
    id: number;
}