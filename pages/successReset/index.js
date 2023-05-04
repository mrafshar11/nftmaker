
import { Button, Result } from 'antd';


const Success = () => (
  <Result
    status="success"
    title="Successfully reset your password"
    extra={[
      <Button href='/login' >
        Go To Login Page
      </Button>,
    ]}
  />
);
export default Success;