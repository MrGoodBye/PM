import { Form, Input, InputNumber, Button, Checkbox, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { fetchProductById, updateProduct } from './service'
import './product.css'

export default function Product () {
    const { id } = useParams()
    const product = fetchProductById(id)
    const history = useHistory()

    const onFinish = (value) => {
        message.success('Successful')
        updateProduct({ ...product, ...value })
        history.push('/products')
    }

    return (
        <Form
            initialValues={product}
            className='product'
            labelCol={{
                xs: { span: 24 },
                sm: { span: 5 },
            }}
            wrapperCol={{
                xs: { span: 24 },
                sm: { span: 12 },
            }}
            onFinish={onFinish}
        >
            <Form.Item
                label='Name'
                name='name'
                rules={[
                    {
                        required: true, message: 'Name is required'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Type'
                name='type'
                rules={[
                    {
                        required: true, message: 'Type is required'
                    }
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label='Quantity'
                name='quantity'
                rules={[
                    {
                        required: true, message: 'Quantity is required'
                    }
                ]}
            >
                <InputNumber step={1} precision={0} />
            </Form.Item>
            <Form.Item
                label='Price'
                name='price'
                rules={[
                    {
                        required: true, message: 'Price is required'
                    }
                ]}
            >
                <InputNumber step={0.01} precision={2} />
            </Form.Item>
            <Form.Item
                label='Active'
                name='active'
                valuePropName="checked"
            >
                <Checkbox />
            </Form.Item>
            <Form.Item wrapperCol={{offset: 5}}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}