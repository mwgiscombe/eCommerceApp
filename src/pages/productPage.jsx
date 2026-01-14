import React from 'react'
import Image from 'react-bootstrap/Image';
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import { useEffect } from 'react';
import {Link } from 'react-router-dom'



function ProductPage({products, addToCart, cartItems, setCartItems, itemVar, setItemVar, setMainImage, mainImage }) {
const [qty, setQty] = useState(1)
  // function changeOption(){}
  // useEffect(()=>{
  //   setMainImage()
  // },[mainImage])
  
  function changeOption(o){
    const option = o.target.value
    const index = product.images.findIndex(i=>i.title === option)
    setMainImage(index)
    setItemVar(option)
    
  }
 
  console.log("cartItems is:", cartItems)
  console.log("type:", typeof cartItems)
  


    const {id} = useParams()
    const product = products.find(p=> p.id === Number(id))
    console.log(product)
      const [stars, setStars] = useState(()=>{
      return product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length

   })
   useEffect(()=>{
    if(product?.images?.length){
      setItemVar(product.images[0].title)
     
    }
  }, [product])
  


  return (
    <Container className='my-3'>
      <Link to='/cart'>Carttttt</Link>
      <Row className='d-flex'>
        <div className='w-25'>
        <Image src={product?.images?.[mainImage]?.url} fluid /> 
        </div>
        <div className='w-75'>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <Form.Select aria-label="Default select example"
               onChange={(o)=>{changeOption(o)}}
              
                >
           
            {product.images.map((o)=>(
                <option key={o.title} value={o.title}>{o.title}</option>
            ))}
          </Form.Select>
          <h5>${product.price}</h5>
          <Form.Control
        type="number"
        id="quantityProduct"
        Value = '1'
        min='1'
        onChange = {(o)=>{setQty(Number(o.target.value))}}
      /><Button variant='warning' onClick={()=>addToCart(product.id, itemVar, qty)}>Add to Cart</Button>
        </div>
      </Row>
      <Row>
        <h4>Reviews ({product.reviews.length}) {'⭐'.repeat(stars)}</h4>
        {product.reviews.map(r=>(<div className='rounded bg-light my-2 p-3'>
          <div>{'⭐'.repeat(r.rating)}</div>
          <div>{r.text}</div>
          <div>{r.author}</div>
        </div>))}
      </Row>
      </Container>
  )
}

export default ProductPage
