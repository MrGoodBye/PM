const defaultValue = [
    {
        id: 1,
        name: 'Book1',
        type: 'Book',
        quantity: 0,
        price: '12.98',
        active: true
    }, {
        id: 2,
        name: 'Car1',
        type: 'Car',
        quantity: 1,
        price: '12220.98',
        active: false
    }
]

export const fetchProducts = () => {
    let products = localStorage.getItem('products')
    if (!products) {
        products = defaultValue
        localStorage.setItem('products', JSON.stringify(products))
    } else {
        products = JSON.parse(products)
    }
    return products
}

export const updateProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products))
}