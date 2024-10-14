import { Input, Typography, Grid } from 'antd';
const { Title } = Typography;
const { useBreakpoint } = Grid;
const { Search } = Input;

export const AppSearchBarStyle = {
  maxWidth: '440px',
  minWidth: '200px',
  width: '40%',
  marginTop: '20px',
  marginBottom: '16px',
};

export const AppSearch = ({ onSearch }) => {
  return (
    <Search
      placeholder='Search by name'
      onSearch={onSearch}
      size='large'
      style={AppSearchBarStyle}
    />
  );
};

export const AppTitle = ({ children }) => {
  const screens = useBreakpoint();
  let level = 1; // Default level

  // Set level to 3 when screen size is medium
  if (screens.sm && !screens.lg) {
    level = 3;
  } else if (screens.xs) {
    level = 4;
  }

  return <Title level={level}>{children}</Title>;
};
