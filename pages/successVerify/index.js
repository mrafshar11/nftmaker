
import { Button, Result } from 'antd';


const Success = () => (
  <Result
    status="success"
    title="Email Successfully Validated"
    extra={[
      <Button href='/login' key={'login'}>
        Go To Login Page
      </Button>,
    ]}
  />
);
export default Success;