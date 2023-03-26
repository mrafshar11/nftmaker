
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
const EmailVerify = () => (
    <section id='email-verify'>
        <div className='container'>
            <div className='signup-main'>
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
                        name={['code']}
                        label="code"
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
                        <Input />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            ...layout.wrapperCol,
                            offset: 4,
                        }}
                    >
                        <Row>
                            <Col span={8}>
                                <Button type="primary" htmlType="submit"
                                    style={{ backgroundColor: 'rgb(125 211 252)',color:'rgb(15 23 42)' }} >
                                    Verify
                                </Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>
            </div>
        </div>
    </section>
);
export default EmailVerify;