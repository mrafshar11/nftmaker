import userModel from "../../../config/database/models/user";
import mongoose from 'mongoose';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db_uri = process.env.DB_URI;

const db = async () => mongoose.connect(db_uri).then(console.log('connected')).catch(err => console.log(err));

const loginUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email, verified: true });
        if (!user) {
            res.status(404).json({
                message: 'not found user'
            });
            return
        }
        let matchPass = await bcrypt.compare(req.body.password, user.password);
        if (!matchPass) {
            res.status(404).json({
                message: 'not found user'
            });
            return
        }
        const token = jwt.sign({ email: user.email, password: user.password }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.status(200).json({
            token
        });
    } catch (error) {
        res.send(error);
    }
};

export default async function handler(req, res) {
    const { method } = req;
    db()

    switch (method) {
        case "POST":
            await loginUser(req, res);
            break;

        default:
            break;
    }
}


