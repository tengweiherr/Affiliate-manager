import User from '../models/user.js';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {

    const { id, password } = req.body;

    try {
        const existingUser = await User.findOne({ id });

        if (!existingUser) return res.status(404).json({ message: password }); 

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({ message: "Wrong password." });

        const token = jwt.sign({ id: existingUser.id}, 'test', { expiresIn: "4h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }

}

