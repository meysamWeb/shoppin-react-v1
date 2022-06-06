import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Button} from 'react-bootstrap';

import {productDetailAction} from "../action/productAction";

const Product = ({ history, match }) => {
    const dispatch = useDispatch()

    const productDetail = useSelector((state) => state.productDetail)

    const {loading, product} = productDetail

    useEffect(() => {
        dispatch(productDetailAction(match.params.id))
    }, [dispatch, match])

    const addToCardHandler = () => {
        history.push(`/cart/${match.params.id}`)
    }

    return (
        <>
            <Link to="/" className="btn btn-light m-3">
                <i className="fa fa-arrow-left"> Back</i>
            </Link>
            {loading ? <h2 className="card text-center p-3">Loading ... </h2>
                : <Row>
                    <Col md={6}>
                        <Image src={product.image} fluid/>
                    </Col>
                    <Col md={6}>
                        <ListGroup variant="flush" className="my-lg-5">
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                                <p>{product.description}</p>
                            </ListGroup.Item>
                            <ListGroup.Item><h4 className="text-danger">${product.price}</h4></ListGroup.Item>

                            <ListGroup.Item className="text-end">
                                <Button
                                    onClick={addToCardHandler}
                                    className="btn-block btn-danger"
                                    type="button"
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>}
        </>
    )
}

export default Product
