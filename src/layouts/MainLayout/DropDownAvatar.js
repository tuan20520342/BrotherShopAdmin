import React from 'react';
import { UserOutlined, ExportOutlined } from '@ant-design/icons';
import { Dropdown, Space, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AlertCustom from '~/components/UI/Notification/Alert';
import Cookies from 'js-cookie';

const DropDownAvatar = ({ visibleText, user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Bạn có chắc muốn đăng xuất?',
      text: '',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#9b9b9b',
      confirmButtonText: 'Đăng xuất',
    }).then((result) => {
      if (result.isConfirmed) {
        AlertCustom({ type: 'success', title: 'Đăng xuất thành công' });
        Cookies.remove('token');
        Cookies.remove('currentUser');
        navigate('/login');
      }
    });
  };

  const items = [
    {
      label: 'Thông tin cá nhân',
      key: '1',
      onClick: () => {
        navigate('/profile');
      },
      icon: <UserOutlined />,
    },
    {
      label: 'Đăng xuất',
      key: '2',
      onClick: () => handleLogout(),
      icon: <ExportOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} placement="bottomRight">
      <Space style={{ cursor: 'pointer' }}>
        <Avatar className="bg-blue-300" icon={<UserOutlined />} />
        {visibleText && (
          <div>
            <p style={{ lineHeight: '0', fontWeight: 'bold', paddingBottom: 6 }}>{user ? user.name : ''}</p>
            <p type="secondary" style={{ lineHeight: '0' }}>
              {user ? user.role?.name : ''}
            </p>
          </div>
        )}
      </Space>
    </Dropdown>
  );
};
export default DropDownAvatar;
