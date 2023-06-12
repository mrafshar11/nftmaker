
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });
console.log(process.env.DATABASE_URL);

import { Button, Result } from 'antd';


const Success = () => (
  <Result

    status="success"
    title="Successfully reset your password"
    extra={[
      <Button href='/login' key={'login'}>
        Go To Login Page
      </Button>,
    ]}
  />
);
export default Success;