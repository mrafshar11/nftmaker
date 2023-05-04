import * as Yup from "yup";

export const userSchema = Yup.object().shape({
    name: Yup.string().required(),
    lastName: Yup.string().required(),
    username: Yup.string().required(),
    password: Yup.number().required(),
    email: Yup.string().email().required(),
});