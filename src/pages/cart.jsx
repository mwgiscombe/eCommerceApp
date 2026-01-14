import React from 'react'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import {Link} from 'react-router-dom'
import Form from 'react-bootstrap/Form'


function Cart({products, addToCart, cartItems, setCartItems, itemVar, setItemVar, setMainImage, mainImage, removeFromCart, cartTotal, setCartTotal, balance}) {
    const total = cartItems.reduce( (sum, item) => sum + item.price * item.quantity, 0 )
    const tax = total * .1
    const bigTotal = total + tax
    setCartTotal(total)
    function changeQty(o,id, vari){
        const qty = Number(o.target.value)
               
        setCartItems(prev=>{
            const updated = prev
                .map(item=>{
                    if(item.id === id && item.selected === vari){
                        return{...item,quantity: qty }
                    }
                    return item
                    })
                    return updated.filter(item=>{
                        if(item.id === id && item.selected === vari && item.quantity === 0){
                          return !confirm('Delete?')
                            }
                            return true
                        })
                    })
                        
                
                
                
  
        }
    
    
    console.log('items: ', cartItems)
  return (
    <div>
        
        <Table striped bordered hover>
            <thead>
                <tr>
                <th></th>
                <th>img</th>
                <th>Item</th>
                <th>qty</th>
                <th>cost</th>
                
                </tr>
            </thead>
            <tbody>
        {cartItems.map(c=>(
            <tr key={`${c.id}-${c.selected}`}>
                <td><div 
                
                onClick={()=>{removeFromCart(c.id, c.selected)}}>
                x
                </div></td>
                <td className='cartImage'><Link to={`/productPage/${c.id}`}><Image src={c.images.find(img => img.title === c.selected)?.url} /> </Link></td>
                <td><Link to={`/productPage/${c.id}`}>{c.title}<br />Variation: {c.selected}</Link></td>
                <td>
                
                    <Form.Control
                        type="Number"
                        id="qtyInput"
                        aria-describedby="passwordHelpBlock"
                       value={c.quantity}
                        onChange = {(o)=>changeQty(o,c.id, c.selected)}
                    />
                    
                </td>
                <td>${c.price * c.quantity}</td>
            </tr>
        ))}
  <tr>
            <td>Subtotal: ${(cartTotal).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Tax: ${(tax).toFixed(2)}</td>
        </tr>
        <tr>
            <td>Total: ${(bigTotal).toFixed(2)}</td>
        </tr>
        </tbody>
      
        </Table>
        <button disabled = {balance < cartTotal || cartItems.length === 0}>Checkout</button>
        {balance < bigTotal && <div>Oops, you need ${(bigTotal - balance).toFixed(2)} more to checkout</div>}
        
    </div>

  )
}

export default Cart
