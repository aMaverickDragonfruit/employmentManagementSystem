import { Input } from 'antd';
const { Search } = Input;

export const AppSearchBarStyle = {
  width: '400px',
  marginTop: '20px',
  marginBottom: '16px',
};

const AppSearch = ({ onSearch }) => {
  return (
    <Search
      placeholder='input search text'
      onSearch={onSearch}
      size='large'
      style={AppSearchBarStyle}
    />
  );
};

export default AppSearch;
