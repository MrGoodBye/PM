import { Form, Input, InputNumber, Button, Checkbox, message } from 'antd'
import { useParams, useHistory } from 'react-router-dom'
import { v4 } from 'uuid'
import { Line } from '@ant-design/charts'
import { fetchProductById, updateProduct, createProduct } from './service'
import './product.css'

export default function Product () {
    const { id } = useParams()
    const product = fetchProductById(id)
    const history = useHistory()
    const isEditMode = history.location.pathname.indexOf('edit') > -1
    const isCreateMode = !id
    const isViewMode = !isEditMode && !isCreateMode

    const onFinish = (value) => {
        message.success('Successful')
        if (isCreateMode) {
            createProduct({ id: v4(), ...value })
        } else {
            const newPrice = { lastModified: new Date(), value: value.price }
            const prices = product.prices ? [...product.prices, newPrice] : [newPrice]
            if (prices.length > 10) {
                prices.shift()
            }
            updateProduct({ ...product, ...value, prices })
        }
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
                <Input disabled={isViewMode} />
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
                <Input disabled={isViewMode} />
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
                <InputNumber step={1} precision={0} min={0} disabled={isViewMode} />
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
                <InputNumber step={0.01} precision={2} disabled={isViewMode} />
            </Form.Item>
            <Form.Item
                label='Active'
                name='active'
                valuePropName="checked"
            >
                <Checkbox disabled={isViewMode} />
            </Form.Item>
            {
                isViewMode 
                ? (
                    product.prices && <Line
                    data={product.prices || []}
                    height={400}
                    xField='lastModified'
                    yField='value'
                    point={{
                        size: 5,
                        shape: 'diamond',
                    }}
                />
                )
                : <Form.Item wrapperCol={{offset: 5}}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            }
        </Form>
    )
}