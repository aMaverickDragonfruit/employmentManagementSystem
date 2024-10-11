import {
  Upload,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
} from 'antd';
const { Title } = Typography;
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import React from 'react';
import { useState } from 'react';
import { ReviewFiles } from './hr/EmployeeVisaStatusComponents';

export default function App() {
  return <ReviewFiles />;
}
