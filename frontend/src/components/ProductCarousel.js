import React, {
  useEffect,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Carousel,
  Image,
} from 'react-bootstrap';
import Loader from './Loader';
import Message from './Message';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { listProducts } from '../actions/productActions';

const ProductCaousel = () => {
  const dispatch = useDispatch();

  const productList = useSelector(
    (state) => state.productList
  );
  const {
    loading,
    error,
    products,
    page,
    pages,
  } = productList;

  useEffect(() => {
    dispatch(
      listProducts('', '', true)
    );
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error}
    </Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-dark"
    >
      {products.map((product) => (
        <Carousel.Item
          key={product._id}
          className="text-center"
        >
          <Link
            to={`/product/${product._id}`}
          >
            <Image
              src={product.image}
              alt={product.name}
              fluid
            />
            <Carousel.Caption className="carousel-caption">
              <h2>
                {product.name} ($
                {product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCaousel;
