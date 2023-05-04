import userModel from "../../../config/database/models/user";
import mongoose from 'mongoose';
const jwt = require("jsonwebtoken");


const db_uri = process.env.DB_URI;
const db = async () => mongoose.connect(db_uri).then(console.log('connected')).catch(err => console.log(err));

const resetPass = async (req, res) => {
    try {
        const decoedToken = jwt.verify(req.body.token, process.env.JWT_SECRET);
        let user = await userModel.findOne({ email: decoedToken.email, password: decoedToken.password });
        if (!user) {
            res.status(404).json({
                status: "not found",
            });
            return
        }
        user.password = req.body.password;
        await user.save();
        res.status(200).json({
            status: "success",
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
            await resetPass(req, res);
            break;

        default:
            break;
    }
}


