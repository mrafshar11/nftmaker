
import { Button, Form, Input, InputNumber, Row, Col } from 'antd';

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
const ResetPassword = () => (
    <section id='reset-password'>
        <div className='container'>
            <div className='reset-password-main'>
                <Form
                    {...layout}
                    name="nest-messages"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                        width: '70%'
                    }}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name={['Password']}
                        label="password"
                        // labelCol={4}
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
);
export default ResetPassword;