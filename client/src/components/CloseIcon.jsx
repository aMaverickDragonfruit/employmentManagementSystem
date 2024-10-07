import { CloseOutlined } from '@ant-design/icons';
import styled from 'styled-components';

export const CloseIcon = styled(CloseOutlined)`
  font-size: 150%;
  position: absolute;
  top: -20px;
  right: 0;
  cursor: pointer;
  color: #94a3b8;

  &:hover {
    color: #0f172a;
  }
`;
