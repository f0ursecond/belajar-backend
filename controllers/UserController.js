import User from "../models/UserModel.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
const saltRounds = 10;
let token = "";
const secretKey = 'my_secret_key';

//ANJAYYY

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

export const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            token = jwt.sign({ "username": username, "password": password }, secretKey, { expiresIn: '1h' });
            res.cookie('accessToken', token, { httpOnly: true, secure: true });
            res.status(200).json({ token: token });
        } else {
            res.status(400).json({ msg: 'Wrong Password' })
        }

    } else {
        res.status(404).json({ msg: 'Username Not Found' })
    }
}

export const logout = async (req, res) => {
    try {
        //CLEAR TOKEN IN FRONT END
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ msg: 'Internal Server Error' + error })
    }
}