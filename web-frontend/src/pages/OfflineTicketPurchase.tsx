import React, { useEffect, useState, useContext } from 'react';
import { IScreenings } from '../interfaces/IScreenings';
import { purchaseOfflineTicket } from '../api/tickets';
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { Button, Form, Select, InputNumber, Card, message } from 'antd';

const OfflineTicketPurchase: React.FC = () => {
  const [screenings, setScreenings] = useState<IScreenings[]>([]);
  const [offlineLoading, setOfflineLoading] = useState(false);
  const { role } = useContext(AuthContext);
  const [form] = Form.useForm();

  useEffect(() => {
    api.Screenings.getScreenings().then(res => setScreenings(res.data));
  }, []);

  const handleOfflinePurchase = async (values: { screeningId: number; price: number; userId?: number }) => {
    setOfflineLoading(true);
    try {
      await purchaseOfflineTicket(values);
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
      setOfflineLoading(false);
    }
  };

  if (!(role === 'Admin' || role === 'Cashier')) return null;

  return (
    <Card title="Offline jegyvásárlás" style={{ maxWidth: 500, margin: '2rem auto' }}>
      <Form layout="vertical" form={form} onFinish={handleOfflinePurchase}>
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
        <Form.Item label="Ár (Ft)" name="price" rules={[{ required: true, message: 'Kötelező!' }]}> 
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Felhasználó ID (opcionális)" name="userId">
          <InputNumber min={1} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={offlineLoading} block>
            Jegy vásárlása
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default OfflineTicketPurchase;
