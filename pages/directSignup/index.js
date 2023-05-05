import { useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { Button, Form, Input, InputNumber, Row, Col, Modal } from 'antd';

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


const DirectSignUp = () => {
    const router = useRouter();
    const [form] = Form.useForm();
    const [isLoading, setIsloading] = useState(false);


    const error = () => {
        Modal.error({
            title: 'Error',
            content: 'this email already signed in',
        });
    };

    const onFinish = async (values) => {
        form.resetFields();
        try {
            setIsloading(true)
            const data = await fetch("/api/user/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (data.status == 401) {
                setIsloading(false);
                error();
            } else if (data.status == 201) {
                router.push({ pathname: '/pleaseVerify' })
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
        <section id='direct-signup'>
            <div className='container'>
                <div className='direct-signup-main'>
                    <Form
                        form={form}
                        {...layout}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 850,
                            width: '90%'
                        }}
                        validateMessages={validateMessages}
                    >
                        <Row>
                            <Col lg={{ span: 11, offset: 0 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['name']}
                                    label="Name"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        marginBottom: "40px"
                                    }}
                                    labelCol={{ span: 9 }}
                                >
                                    <Input size='large' value={'name'} />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 11, offset: 2 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['lastName']}
                                    label="LastName"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        marginBottom: "40px"
                                    }}
                                    labelCol={{ span: 9 }}
                                >
                                    <Input size='large' />
                                </Form.Item></Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 11, offset: 0 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['username']}
                                    label="Username"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        marginBottom: "40px"
                                    }}
                                    labelCol={{ span: 9 }}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 11, offset: 2 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['email']}
                                    label="Email"
                                    rules={[
                                        {
                                            type: 'email',
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        marginBottom: "40px"
                                    }}
                                    labelCol={{ span: 9 }}
                                >
                                    <Input size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 11, offset: 0 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['password']}
                                    label="Password"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                    style={{
                                        marginBottom: "80px"
                                    }}
                                    labelCol={{ span: 9 }}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                            <Col lg={{ span: 11, offset: 2 }} md={{ span: 16, offset: 3 }} sm={{ span: 20, offset: 1 }}>
                                <Form.Item
                                    name={['confirmPassword']}
                                    label="Confirm Password"
                                    labelCol={{ span: 9 }}
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
                                        marginBottom: "80px"
                                    }}
                                >
                                    <Input.Password size='large' />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={{ span: 6, offset: 9 }} md={{ span: 6, offset: 10 }} sm={{ span: 20, offset: 1 }}>
                                <Button type="primary" htmlType="submit" size='large' block sm={{ size: 'small' }}
                                    style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </section>
    );
}
export default DirectSignUp;