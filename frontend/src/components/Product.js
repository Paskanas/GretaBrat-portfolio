import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'

const Product = ({ product }) => {
  const handleMouseEnter = (e) => {
    e.target.src = product.bigImage
    // e.target.variant = 'bottom'

    console.log('change change to big image')
  }
  const handleMouseLeave = (e) => {
    e.target.src = product.image
    console.log('change to small image')
  }

  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant='top'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
      </Card.Body>
    </Card>
  )
}

export default Product
