import User from "../models/UserModel.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
const saltRounds = 10;

export const register = async (req, res) => {
    try {
        const { username, password } = req.body;

        const response = await User.findAll();
        const usernameExist = response.some(user => user.username === username);

        if (usernameExist) return res.status(400).json({ msg: 'Username Already Used' })

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create({
            userId: uuidv4(),
            username: username,
            password: hashedPassword,
        })
        return res.status(201).json({ msg: 'User Successfully Created', user: newUser });
    } catch (error) {
        return res.status(400).json({ msg: `Error ${error}` })
    }
}