import mongoose from 'mongoose';
import userModel from "../../../config/database/models/user";
import { sendResetPassEmail } from "../../../config/mailer";
const jwt = require("jsonwebtoken");

const uri = 'mongodb://localhost:27017/nft';
const db = async () => mongoose.connect(uri).then(console.log('ahsent'));



const addUser = async (req, res) => {
    try {
        console.log(req.body.email);
        let user = await userModel.findOne({ email: req.body.email });
        console.log(user);
        if (!user) {
            res.status(404).json({
                status: "not found",
            });
            return
        }
        const token = jwt.sign({ email: user.email, password: user.password }, 'hV37j4WfWxqz9r2', {
            expiresIn: "1h",
        });
        sendResetPassEmail(user.email, token)

        res.status(200).json({
            status: "success",
            message: "phonebook successfully created",
        });
    } catch (error) {
        res.send(error);
    }
};

export default async function handler(req, res) {
    const { method } = req;
    console.log('opi');
    db()

    switch (method) {

        case "POST":
            await addUser(req, res);
            break;

        default:
            break;
    }
}


