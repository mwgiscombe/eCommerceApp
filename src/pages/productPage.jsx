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
      
      <Row className='d-flex justify-content-center align-items-center'>
        <Col xs={12} lg={4}>
        <div className='d-flex justify-content-center align-items-center shadow'>
        <Image className='rounded' src={product?.images?.[mainImage]?.url} fluid /> 
        </div>
        </Col>
        <Col xs={12} lg={8}>
        <div className='d-flex flex-column align-items-xs-center align-items-lg-start text-lg-center'>
          <div class='d-flex'><h1>{product.title}</h1>
          <h5 className='price p-3 rounded text-dark shadow text-white d-flex justify-content-center align-items-center mx-3'>${product.price}</h5></div>
          <p className='text-lg-start text-xs-center'>{product.description}</p><hr></hr>
          <h6>Select an option</h6>
          <Form.Select aria-label="Default select example" className='w-50 mb-4 mx-xs-auto'
               onChange={(o)=>{changeOption(o)}}
              
                >
           
            {product.images.map((o)=>(
                <option key={o.title} value={o.title}>{o.title}</option>
            ))}
          </Form.Select>
         

        <div className='d-flex flex-row gap-2'>
        <div className='qty_container d-flex flex-row gap-2 justify-content-center align-items-center'>
        <Button onClick = {()=>{setQty(qty + 1)}} className='d-flex justify-content-center align-items-center' variant='secondary'>+</Button>
          <Form.Control className='qty_selector'
        type="number"
        id="quantityProduct"
        Value = {qty}
        min='1'
        onChange = {(o)=>{setQty(Number(o.target.value))}}
      />
      <Button onClick = {()=>{if(qty> 0){setQty(qty - 1)}}} className='d-flex justify-content-center align-items-center' variant='secondary'>-</Button>
      </div>
      <Button className='btn productButton' onClick={()=>addToCart(product.id, itemVar, qty)}>Add to Cart</Button>
      </div>


        </div>
        </Col>
      </Row>
      <Row className='my-5'>
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
