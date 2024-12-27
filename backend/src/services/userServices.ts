import bcrypt from 'bcrypt'
import { Signup, Login, JWTPayload } from '../interfaces/userInterfaces';
import * as userRepository from '../repositories/userRepository';
import { generateToken } from '../utils/jwtUtils';

export const signup = async ({ username, password }: Signup): Promise<{ userId: number }> => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await userRepository.createUser(username, hashedPassword);

    return { userId: user.id }
};

export const login = async ({ username, password }: Login): Promise<any> => {
    const user = await userRepository.findUser(username);
    if(!user) {
        throw new Error("User does not exist");
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if(!isValidPassword) {
        throw new Error("Invalid Credentials");
    }

    const token  = generateToken({ id: user.id }, process.env.JWT_SECRET as string);
    return { token }
}