import { Spin } from 'antd';
import { Button, Form, Input, Checkbox, Row, Col, Modal } from 'antd';
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

const layout1 = {
    wrapperCol: {
        sm: { span: 18, offset: 6 }, md: { span: 18, offset: 6 }, lg: { span: 14, offset: 8 }
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */


const Login = () => {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsloading] = useState(true);
    const [form] = Form.useForm();
    const [modalText, setModalText] = useState('email or password is wrong');


    const { data: session } = useSession();
    if (session) {
        console.log('session', session);
    }

    const handleOk = () => {
        setOpen(false);
    };


    const onFinish = async (values) => {
        form.resetFields();
        try {
            setIsloading(true)
            const res = await fetch("/api/login/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });


            if (res.status == 404) {
                setOpen(true);
                setIsloading(false);
            } else if (res.status == 200) {
                router.push({ pathname: '/dashboard' })
                const data = await res.json()
                localStorage.setItem("token", data.token);
                setIsloading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };


    if (isLoading) {
        return <Spin />
    }



    return (
        <section id='login'>
            <div className='container'>
                <div className='login-main'>
                    <Form
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                            minWidth: 380,
                            width: '60%'
                        }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['email']}
                            label="email"
                            rules={[
                                {
                                    type: 'email',
                                    required: true,
                                },
                            ]}
                            style={{
                                marginBottom: "65px"
                            }}
                        >
                            <Input size='large' />
                        </Form.Item>
                        <Form.Item
                            name={['password']}
                            label='password'
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                marginBottom: "40px"
                            }}
                        >
                            <Input.Password size='large' />
                        </Form.Item>


                        <Form.Item {...layout1}>
                            <Row>
                                <Col >
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
                                    </Form.Item>
                                </Col>
                                <Col >
                                    <Link href={'/forgetPass'} className="login-form-forgot">
                                        Forgot password ?
                                    </Link>
                                </Col>
                            </Row>
                        </Form.Item>
                        {/* {isLoading ? <Spin size="large" style={{ width: '100%' }} /> : null} */}
                        <Form.Item {...layout1}>
                            <Col span={12} style={{ marginBottom: "15px" }}>
                                <Button type="primary" htmlType="submit" className="login-form-button" size='large' block
                                    style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                    Log in
                                </Button>
                            </Col>
                            <Col span={12} style={{ color: '#fff' }}>
                                Or <Link href={"/"}>register now!</Link>
                            </Col>
                        </Form.Item>
                        <>
                            <Modal
                                title="Not Found"
                                open={open}
                                onOk={handleOk}
                                onCancel={handleOk}
                                okText='ok'
                            >
                                <p style={{ marginBottom: '5px' }}>{modalText}</p>
                            </Modal>
                        </>
                    </Form>
                </div>
            </div>
        </section>
    )
};
export default Login;