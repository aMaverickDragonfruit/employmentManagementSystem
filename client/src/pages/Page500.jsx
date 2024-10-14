import { useNavigate } from 'react-router-dom';
import { Button, Result } from 'antd';

const App = ({ message }) => {
  const navigate = useNavigate();
  return (
    <Result
      status='500'
      title='500'
      subTitle={message}
      extra={
        <Button
          type='primary'
          onClick={() => navigate('/')}
        >
          Back Home
        </Button>
      }
    />
  );
};

export default App;
