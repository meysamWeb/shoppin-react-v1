import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Row, Col, ListGroup, Image, Button, Card} from "react-bootstrap";

import {addToCart, removeFormCart} from "../action/cartAction";

const Cart = ({match}) => {
    const productId = match.params.id

    const dispatch = useDispatch()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart

    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId))
        }

    }, [dispatch, productId])

    const removeFromCartHandler = (id) => {
        dispatch(removeFormCart(id))
    }
    return (
        <>
            <Row>
                <Col md={12}>
                    <h2 className="p-3">Cart</h2>
                    {cartItems.length === 0
                        ? <div className="text-center card p-3">
                            <p className="text-danger">The cart is empty</p>
                            <Link to="/">
                                <Button className="btn btn-outline-primary w-25 m-auto" variant="light" type="button">Back to Shop</Button>
                            </Link>
                    </div>
                        : <ListGroup>
                            {cartItems.map((item) => (
                                <ListGroup.Item key={item.product}>
                                    <Row className="align-items-center justify-content-center p-3">
                                        <Col md={2}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                        <Col md={3}>{item.name}</Col>
                                        <Col md={2}>{item.price}</Col>
                                        <Col md={2}>
                                            <Button type="button" className="btn-outline-danger" variant="light" onClick={() => removeFromCartHandler(item.product)}>
                                                <i className="fa fa-trash-o"></i>
                                            </Button>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    }
                </Col>
                <Col md={12}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="text-center">
                                Total: <strong className="text-danger">{cartItems.reduce((acc, item) => acc + item.price, 0)}</strong>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default Cart;