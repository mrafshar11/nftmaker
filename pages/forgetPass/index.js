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

const layout1 = {
    wrapperCol: {
        sm: { span: 8, offset: 12 }, md: { span: 8, offset: 4 }, lg: { span: 6, offset: 8 }
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
    const [isLoading, setIsloading] = useState(false);
    const [modalText, setModalText] = useState();
    const showModal = () => {
        setOpen(true);
    };


    const onFinish = async (values) => {
        form.resetFields();
        try {
            const res = await fetch("/api/forgetPass/", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            console.log(res);

            if (res.status == 404) {
                setModalText('There is no user with this email')
                setOpen(true);
                setIsloading(false);

            } else if (res.status == 200) {
                setIsloading(false);
                setModalText('we sent a link to your email for reset your password ')
                setOpen(true);

            }
        } catch (error) {
            console.log(error);
        }
    };

    // console.log(name);


    const handleOk = () => {
        setOpen(false);
    };

    return (
        <section id='login'>
            <div className='container'>
                <div className='login-main'>
                    <Form
                        form={form}
                        name="nest-messages"
                        onFinish={onFinish}
                        style={{
                            maxWidth: 850,
                            width: '90%'
                        }}
                        validateMessages={validateMessages}
                    >
                        <Row>
                            <Col lg={{ span: 15, offset: 2 }} md={{ span: 22, offset: 0 }} sm={{ span: 20, offset: 1 }}>
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
                        <>
                            <Modal
                                title="Result"
                                open={open}
                                onOk={handleOk}
                            >
                                <p style={{ marginBottom: '5px' }}>{modalText}</p>
                            </Modal>
                        </>
                        <Form.Item
                            {...layout1}
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