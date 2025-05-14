import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Select, Button, message, Spin } from 'antd';
import api from '../api/api';
import { IScreenings } from '../interfaces/IScreenings';

const GuestTicketPurchase: React.FC = () => {
  const [screenings, setScreenings] = useState<IScreenings[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    api.Screenings.getScreenings().then(res => setScreenings(res.data));
  }, []);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await api.Tickets.purchaseOfflineTicket({
        screeningId: values.screeningId,
        price: 2000, // fix ár
        email: values.email,
        phoneNumber: values.phoneNumber
      });
      message.success('Jegy sikeresen vásárolva!');
      form.resetFields();
    } catch (error: any) {
      const backendMsg = error?.response?.data?.message;
      if (backendMsg) {
        message.error(backendMsg);
      } else {
        message.error('Nem sikerült a jegyvásárlás.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Vendég jegyvásárlás" style={{ maxWidth: 500, margin: '2rem auto' }}>
      <Spin spinning={loading}>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Vetítés" name="screeningId" rules={[{ required: true, message: 'Kötelező!' }]}> 
            <Select
              showSearch
              placeholder="Válassz vetítést"
              optionFilterProp="children"
              filterOption={(input, option) => (option?.children?.toString() ?? '').toLowerCase().includes(input.toLowerCase())}
            >
              {screenings.map(s => (
                <Select.Option key={s.id} value={s.id}>
                  {s.movieTitle} - {new Date(s.dateTime).toLocaleString()} ({s.location})
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {/* ÁR MEZŐ ELTÁVOLÍTVA, FIX 2000 FT */}
          <div style={{marginBottom: 16}}>Ár: <b>2000 Ft</b></div>
          <Form.Item label="E-mail cím" name="email" rules={[{ required: true, type: 'email', message: 'Kötelező, érvényes e-mail!' }]}> 
            <Input placeholder="pl. valaki@email.hu" />
          </Form.Item>
          <Form.Item label="Telefonszám" name="phoneNumber" rules={[{ required: true, message: 'Kötelező!' }]}> 
            <Input placeholder="pl. +36 30 123 4567" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Jegy vásárlása
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </Card>
  );
};

export default GuestTicketPurchase;
