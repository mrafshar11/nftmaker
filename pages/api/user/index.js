import userModel from "../../../config/database/models/user";
import mongoose from 'mongoose';
import { sendEmail } from "../../../config/mailer";
const jwt = require("jsonwebtoken");

const db_uri = process.env.DB_URI;

const db = async () => mongoose.connect(db_uri).then(console.log('ahsent'));

const addUser = async (req, res) => {
    try {
        let user = await userModel.findOne({ email: req.body.email });
        if (user) {
            res.status(401)
            return
        }
        await userModel.create({ ...req.body, verified: false });
        const token = jwt.sign({ email: req.body.email, password: req.body.password }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        sendEmail(req.body.email, token)
        res.status(201).json({
            status: "success",
            message: "phonebook successfully created",
        });
    } catch (error) {
        res.send(error);
    }
};

export default async function handler(req, res) {
    const { method } = req;
    db()

    switch (method) {
        case "GET":
            break;

        case "POST":
            await addUser(req, res);
            break;

        default:
            break;
    }
}


