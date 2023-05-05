import { Spin } from 'antd';
import { useState } from 'react';
import { Button, Form, Input, InputNumber, Row, Col, Modal } from 'antd';
import { useRouter } from 'next/router';


const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
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


const ResetPassword = () => {
    const router = useRouter();
    let token = router.query.token;
    const [isLoading, setIsloading] = useState(false);
    const [form] = Form.useForm();


    const error = () => {
        Modal.error({
            title: 'Error',
            content: 'some thing went wrong',
        });
    };


    const onFinish = async (values) => {
        form.resetFields();
        try {
            const data = await fetch("/api/resetPass/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values, token }),
            });

            if (data.status == 404) {
                error()
                setIsloading(false);
            } else if (data.status == 200) {
                router.push({ pathname: '/successReset' })
                setIsloading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (isLoading) {
        return (
            <div>
                <Spin style={{ margin: 'auto', width: "100%", marginTop: "200px" }} size="large" />
            </div>
        )
    }

    return (
        <section id='reset-password'>
            <div className='container'>
                <div className='reset-password-main'>
                    <Form
                        form={form}
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 600,
                            minWidth: 380,
                            width: '70%'
                        }}
                        validateMessages={validateMessages}
                    >
                        <Form.Item
                            name={['password']}
                            label="password"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            style={{
                                marginBottom: "65px"
                            }}
                        >
                            <Input.Password size='large' />
                        </Form.Item>
                        <Form.Item
                            name={['confirmPassword']}
                            label="Confirm Password"
                            dependencies={['password']}
                            rules={[
                                {
                                    required: true,
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                    },
                                }),
                            ]}
                            style={{
                                marginBottom: "65px"
                            }}
                        >
                            <Input.Password size='large' />
                        </Form.Item>
                        <Form.Item
                        >
                            <Col span={8} offset={16}>
                                <Button type="primary" htmlType="submit" size='large' block={true}
                                    style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                    Submit
                                </Button>
                            </Col>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    )
}



export default ResetPassword;