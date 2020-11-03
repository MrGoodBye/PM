import { Table, Checkbox } from 'antd'
import './App.css';

function App() {
  return (
    <div className="App">
      <Table
        rowKey='id'
        pagination={false}
        dataSource={[
          {
            id: 1,
            name: 'Book1',
            type: 'Book',
            quantity: 0,
            price: '12.98',
            active: true
          }
        ]}
        columns={[
          {
            title: 'Name',
            dataIndex: 'name'
          }, {
            title: 'Type',
            dataIndex: 'type'
          }, {
            title: 'Quantity',
            dataIndex: 'quantity'
          }, {
            title: 'Price',
            dataIndex: 'price'
          }, {
            title: 'Active',
            dataIndex: 'active',
            render: active => <Checkbox checked={!!active} />
          }
        ]}
      />
    </div>
  );
}

export default App;
