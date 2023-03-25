
import { Button, Form, Input, Checkbox, Row, Col } from 'antd';
import Link from 'next/link';

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

const onFinish = (values) => {
    console.log(values);
};
const Login = () => (
    <section id='login'>
        <div className='container'>
            <div className='login-main'>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                        width: '60%'
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['username']}
                        label="username"
                        labelCol={12}
                        rules={[
                            {
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
                        labelCol={12}
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
                    {/* <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 4,
                        }}
                    >
                        <Row>
                            <Col span={8}>
                                <Button type="primary" htmlType="submit" size='large'
                                    style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                    Submit
                                </Button>
                            </Col>
                            <Col span={12} offset={4}>
                                <Link href={'/'} >forget password ?</Link>
                            </Col>
                        </Row>
                    </Form.Item> */}

                    <Form.Item wrapperCol={{
                        span: 16,
                        offset: 6
                    }}>
                        <Row>
                            <Col span={12}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox style={{ color: '#fff' }}>Remember me</Checkbox>
                                </Form.Item>
                            </Col>
                            <Col span={12} >
                                <Link href={'/'} className="login-form-forgot">
                                    Forgot password ?
                                </Link>
                            </Col>
                        </Row>
                    </Form.Item>

                    <Form.Item wrapperCol={{
                        span: 16,
                        offset: 6
                    }}>
                        <Col span={12} style={{marginBottom:"15px"}}>
                            <Button type="primary" htmlType="submit" className="login-form-button" size='large' block
                                style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                Log in
                            </Button>
                        </Col>
                        <Col span={12} style={{ color: '#fff' }}>
                            Or <Link href={"/"}>register now!</Link>
                        </Col>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </section>
);
export default Login;