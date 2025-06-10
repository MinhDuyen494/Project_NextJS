"use client";
import React, { useState } from 'react';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  UserOutlined,
  SearchOutlined,
  PlusOutlined,
  HomeOutlined,
  TagOutlined,
  StarOutlined,
  DashboardOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Input, Select, Avatar, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const roomData = {
  single: [
    { code: 'P101', floor: 'tầng 1', status: 'đã đặt', icon: '👤', color: 'green' },
    { code: 'P103', floor: 'tầng 1', status: 'đang chờ dọn', icon: '👤', color: 'red' },
    { code: 'P306', floor: 'tầng 3', status: 'đang sửa chữa', icon: '👤', color: 'red' },
    { code: 'P204', floor: 'tầng 2', status: 'phòng trống', icon: '👤', color: 'green' },
  ],
  double: [
    { code: 'P201', floor: 'tầng 2', status: 'phòng trống', icon: '👥', color: 'green' },
    { code: 'P103', floor: 'tầng 1', status: 'đang chờ dọn', icon: '👥', color: 'red' },
    { code: 'P306', floor: 'tầng 3', status: 'đang sửa chữa', icon: '👥', color: 'red' },
  ],
  family: [
    { code: 'P201', floor: 'tầng 2', status: 'phòng trống', icon: '👨‍👩‍👧‍👦', color: 'green' },
    { code: 'P103', floor: 'tầng 1', status: 'đang chờ dọn', icon: '👨‍👩‍👧‍👦', color: 'red' },
    { code: 'P103', floor: 'tầng 1', status: 'ngưng hoạt động', icon: '👨‍👩‍👧‍👦', color: 'red' },
  ],
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-screen">
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        width={250}
        style={{ background: '#4d5944' }}
      >
        <div className="text-xl font-bold text-white p-4">
          {collapsed ? 'LOGO' : 'HOTEL MANAGEMENT'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          style={{ background: '#4d5944' }}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Danh sách phòng',
            },
            {
              key: '2',
              icon: <TagOutlined />,
              label: 'Loại Phòng',
            },
            {
              key: '3',
              icon: <StarOutlined />,
              label: 'Tiện Nghi',
            },
            {
              key: '4',
              icon: <DashboardOutlined />,
              label: 'Trạng Thái Phòng',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 16px', background: colorBgContainer }}>
          <div className="flex justify-between items-center h-full">
            <div className="flex items-center">
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 64, height: 64 }}
              />
            </div>
            <div className="flex items-center gap-4">
              <Avatar icon={<UserOutlined />} />
              <span className="text-sm font-medium">Tên người dùng</span>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="flex flex-col gap-6">
            {/* Search and Filter Section */}
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-4 items-center">
                <Input 
                  placeholder="Search..." 
                  prefix={<SearchOutlined />} 
                  style={{ width: 200 }}
                />
                <Select 
                  placeholder="Loại Phòng" 
                  style={{ width: 120 }}
                  options={[
                    { value: 'single', label: 'Phòng đơn' },
                    { value: 'double', label: 'Phòng đôi' },
                    { value: 'family', label: 'Phòng gia đình' },
                  ]}
                />
                <Select 
                  placeholder="Tầng" 
                  style={{ width: 120 }}
                  options={[
                    { value: '1', label: 'Tầng 1' },
                    { value: '2', label: 'Tầng 2' },
                    { value: '3', label: 'Tầng 3' },
                  ]}
                />
                <Select 
                  placeholder="Trạng thái" 
                  style={{ width: 150 }}
                  options={[
                    { value: 'empty', label: 'Phòng trống' },
                    { value: 'booked', label: 'Đã đặt' },
                    { value: 'cleaning', label: 'Đang chờ dọn' },
                    { value: 'repair', label: 'Đang sửa chữa' },
                  ]}
                />
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />}
                  style={{ background: '#c9e4b9', color: '#2e2e2e', fontWeight: 'bold' }}
                >
                  Thêm Phòng
                </Button>
              </div>
            </div>

            {/* Room Sections */}
            <RoomSection title="Phòng đơn" rooms={roomData.single} />
            <RoomSection title="Phòng đôi" rooms={roomData.double} />
            <RoomSection title="Phòng gia đình" rooms={roomData.family} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

// Room section with grid layout
function RoomSection({ title, rooms }: { title: string; rooms: any[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {rooms.map((room, index) => (
          <RoomCard key={index} {...room} />
        ))}
      </div>
    </div>
  );
}

// Room card component
function RoomCard({
  code,
  floor,
  status,
  icon,
  color,
}: {
  code: string;
  floor: string;
  status: string;
  icon: string;
  color: string;
}) {
  const bgColor = {
    green: 'border-green-500 text-green-600',
    red: 'border-red-500 text-red-500',
    gray: 'border-gray-400 text-gray-500',
  };

  return (
    <div
      className={`border-2 rounded-lg p-4 space-y-2 hover:shadow-md transition-shadow`}
    >
      <div className="font-bold text-lg">{code}</div>
      <div className="text-3xl">{icon}</div>
      <div className="text-sm">Tầng: {floor}</div>
      <div className="text-sm">Trạng thái: {status}</div>
    </div>
  );
}

export default App;