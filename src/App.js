import {useState, useEffect} from 'react'
import { Table, Checkbox, Row, Col, Button, Popconfirm } from 'antd'
import { Link } from 'react-router-dom'
import { fetchProducts, updateProducts, deleteProductById } from './service'
import './App.css';

function App() {
  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    const result = fetchProducts()
    setDataSource(result)
  }, [])

  const onActiveChange = (index, value) => {
    const newDataSource = dataSource.map((p, i) => index === i ? { ...p, active: value } : p)
    setDataSource(newDataSource)
    updateProducts(newDataSource)
  }

  const onDelete = id => {
    const newProducts = deleteProductById(id)
    setDataSource(newProducts)
  }

  return (
    <div className="App">
      <Table
        rowKey='id'
        pagination={false}
        dataSource={dataSource}
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
            render: (active, product, index) => (
              <Checkbox
                checked={!!active}
                onChange={e => onActiveChange(index, e.target.checked)}
              />
            )
          }, {
            title: <>
              Actions&nbsp;&nbsp;&nbsp;
              <Link to={`products/new`}>
                <Button size='small'>Add</Button>
              </Link>
              </>, //
            dataIndex: 'action',
            align: 'left',
            render: (text, product) => (
              <Row>
                <Col span={8}>
                  <Link to={`products/${product.id}`}>
                    <Button size='small'>View</Button>
                  </Link>
                </Col>
                <Col span={8}>
                  <Link to={`products/${product.id}/edit`}>
                    <Button size='small' type='primary'>Edit</Button>
                  </Link>
                </Col>
                <Col span={8}>
                <Popconfirm
                  title="Are you sure delete this product?"
                  onConfirm={() => onDelete(product.id)}
                >
                  <Button size='small' danger>Delete</Button>
                </Popconfirm>
                </Col>
              </Row>
            )
          }
        ]}
      />
    </div>
  );
}

export default App;
