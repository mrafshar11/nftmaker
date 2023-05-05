import userModel from "../../../config/database/models/user";
import mongoose from 'mongoose';
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const db_uri = process.env.DB_URI;
const db = async () => mongoose.connect(db_uri).then(console.log('connected')).catch(err => console.log(err));

const verifyUser = async (req, res) => {
    try {
        const decoedToken = jwt.verify(req.query.token, process.env.JWT_SECRET);
        let user = await userModel.findOne({ email: decoedToken.email });
        if (!user) {
            res.status('404').json({ message: "not found user" })
            return
        }
        let hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
        user.verified = true;
        await user.save();
        res.redirect(307, `${process.env.BASE_URL}/successVerify`);

    } catch (error) {
        res.send(error);
    }
};

export default async function handler(req, res) {
    const { method } = req;
    db()
    switch (method) {
        case "GET":
            await verifyUser(req, res);
            break;

        case "POST":
            break;
        default:
            break;
    }
}
