/* eslint-disable no-unsafe-optional-chaining */
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { watch } from '../images';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useCallback, useEffect, useState } from "react";
import { getUserCart, removeItemFromCart } from "../features/user/userSlice";
import ItemQtyInput from "../components/ItemQtyInput";
export default function Cart() {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.auth.productCart)

    const [cartTotal, setCartTotal] = useState<number | undefined>(0);

    const handleCartTotal = useCallback((appCart: typeof cart) => {
        return appCart?.map(cartItem => {
          return cartItem.price * cartItem.quantity;
        }).reduce((curr, next) => {return (curr + next)})
    }, [])
    useEffect(() => {
      setCartTotal(handleCartTotal(cart))
    }, [cart, handleCartTotal])

    useEffect(() => {
        dispatch(getUserCart())
    }, [dispatch])
    function removeCartItem(id: string | undefined){
        if (id){
            dispatch(removeItemFromCart(id))
            setTimeout(() => {
                dispatch(getUserCart())
            }, 0)
        }
    }
    return (
        <>
            <Meta title="Cart" />
            <BreadCrumb title="Cart" />
            <Container containerClass='cart-wrapper home-wrapper-2 py-5'>
                <div className="row">
                    <div className='col-12'>
                        <div className='cart-header 
                        py-3
                        d-flex justify-content-between align-items-center'>
                            <h4 className='cart-col-1'>Product</h4>
                            <h4 className='cart-col-2'>Price</h4>
                            <h4 className='cart-col-3'>Quantity</h4>
                            <h4 className='cart-col-4'>Total</h4>
                        </div>
                        {
                            cart?.map((cartItem, index: number) => (
                                <div key={index} className='cart-data mb-2 py-3 d-flex justify-content-between align-items-center'>
                                    <div className='cart-col-1 gap-15 d-flex align-items-center'>
                                        <div className='w-25'>
                                            <img className='img-fluid' src={watch} alt="product" />
                                        </div>
                                        <div className='w-75'>
                                            <h5>{cartItem?.product.title}</h5>
                                            <div className="d-flex gap-3">Color: 
                                                <ul className="colors ps-0">
                                                    <li style={{ backgroundColor: cartItem?.color.title, cursor: 'pointer' }}></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='cart-col-2'>
                                        <h5 className='price'>$ {cartItem?.product.price}</h5>
                                    </div>
                                    
                                    <div className='cart-col-3 d-flex align-items-center gap-15'>
                                        <div>
                                            <ItemQtyInput cartItem={cartItem} />
                                        </div>
                                        <div>
                                            <AiFillDelete className='text-danger fs-5' onClick={() => removeCartItem(cartItem._id)} />
                                        </div>
                                    </div>
                                    <div className='cart-col-4'>$ {cartItem?.product.price 
                                    ? cartItem?.product.price * cartItem?.quantity 
                                    : 0}</div>
                                </div>
                            ))
                        }
                        <div className='col-12 py-2 my-2 mt-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <Link to='/product' className='button'>Continue Shopping</Link>
                                <div className='d-flex flex-column align-items-end'>
                                    <h4>SubTotal: $ {cartTotal}</h4>
                                    <p>Taxes and shipping calaculated at checkout</p>
                                    <Link to='/checkout' className='button'>Checkout</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}