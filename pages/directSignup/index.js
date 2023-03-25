import { useState } from 'react';
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

    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState('please enter verify code sent your email');
    const showModal = () => {
        setOpen(true);
    };


    const onFinish = (values) => {
        console.log(values);
        form.resetFields();
        setOpen(true);
    };

    // console.log(name);


    const handleOk = () => {
        setModalText('The modal will be closed after two seconds');
        setConfirmLoading(true);
        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
        }, 2000);
    };
    const handleCancel = () => {
        console.log('Clicked cancel button');
        setOpen(false);
    };



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
                            <Col span={11}>
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
                            <Col span={11} offset={2}>
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
                            <Col span={11} >
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
                            <Col span={11} offset={2}>
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
                            <Col span={11} >
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
                            <Col span={11} offset={2}>
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
                        <>
                            <Modal
                                title="Verify Email"
                                open={open}
                                onOk={handleOk}
                                confirmLoading={confirmLoading}
                                onCancel={handleCancel}
                                cancelText='change email'
                                okText='verify'
                            >
                                <p style={{marginBottom:'5px'}}>{modalText} :</p>
                                <p style={{color:'#9b9a9a',marginTop:'5px'}}>farafaraz@gmail.com</p>
                                <Col span={12} >
                                    <Input size='large' />
                                </Col>
                            </Modal>
                        </>
                        <Form.Item
                            wrapperCol={{
                               span:4,
                                offset: 10
                            }}
                        >
                            <Button type="primary" htmlType="submit" size='large' block
                                style={{ backgroundColor: 'rgb(125 211 252)', color: 'rgb(15 23 42)' }}>
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    );
}
export default DirectSignUp;