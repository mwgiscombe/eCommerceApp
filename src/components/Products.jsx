import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductPage from "../pages/productPage";
import {Routes, Route} from 'react-router-dom'
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
import Carousel from 'react-bootstrap/Carousel';
import './Products.css'






library.add(fas, far, fab)



function Products({ products, categories, selectedCats, setSelectedCats, filteredProducts }){
   
    


   
    

    function removeCat(cat){
        const newCats =selectedCats.filter(c=> c != cat)
        setSelectedCats(newCats)
    }

    function clearCats(){
        setSelectedCats([])
    }

    function selectCategory(c){
        const cat = c.target.value
       
        setSelectedCats(prev=> [...prev, cat])
       

    }

    function searchProducts(i){
        const search = i.target.value 
        filteredProducts.filter(product=> product.title.includes(search))
    
    }
    console.log(filteredProducts)

    return(
        <>
        <div className='productPageHeader container'>
            <div className = 'row'>
                <div className="col-4 funFont d-flex justify-content-cetner align-items-center">
                    <h1>Check out these highly rated products!</h1>
                </div>
                <div className="col-8">
        <Carousel fade>
        {filteredProducts.length ? filteredProducts.filter(product=> product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length > 3).map(product =>(
            
            
      <Carousel.Item>
        <div className='Container mx-auto d-flex flex-row gap-2 py-4'>
            <img className='product_car' src={product.images[0].url} />
            <div className='d-flex flex-column justify-content-between'>
                <h2 class="title">{product.title}</h2>
                <div>{'⭐'.repeat(product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length)}</div>
                <h5>{product.description.length > 150 ? product.description.slice(0,150) + '...': product.description}</h5>
                <Button variant="dark">Check out {product.title}!</Button>
            </div>
            </div>
      </Carousel.Item>
    
    )): ''}
      
      
    </Carousel>
    </div>
    </div>
    </div>
    <div className="container-fluid seperator">
        <div className="row p-3">
            <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="text" placeholder="What are you looking for?" onChange={(i)=>{searchProducts(i)}} />
        
      </Form.Group>
      </Form>
        </div>

    </div>
        <div className="d-flex gap-2"><div>Search Results: {filteredProducts.length}</div>
       {selectedCats.length ? selectedCats.map(c=>(
        <Badge className="p-2 d-flex gap-2 my-2 mx-1" bg="info">{c}<div onClick={()=>removeCat(c)}><FontAwesomeIcon icon={['far', 'circle-xmark']} />
        </div> </Badge>
            )): ''}</div>
            <div> 
                <Form.Select aria-label="Default select example"
                onChange={(c)=>{selectCategory(c)}}>
            <option>Categories</option>
            {categories.map((c)=>(
                <option key={c} value={c}>{c}</option>
            ))}
          </Form.Select></div>
          {selectedCats.length ? (<div onClick={clearCats}>clear</div>): ''}
   <Row className='my-2 mx-auto'>
        {filteredProducts.length ? filteredProducts.map(product =>(
     <Link to={`/productPage/${product.id}`} className="col-3 mx-auto my-2"><div><Card className="mx-auto" style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.images[0].url} />
      <Card.Body>
        <Card.Title style={{minHeight: '48px'}}>{product.title}</Card.Title>
        <Card.Text>
          ${product.price}
        </Card.Text>
        <Button variant="warning" onClick={()=> addToCart(product.record.id)} className='w-100'>Add to Cart</Button>
        <Button variant="primary" className = 'w-100'>Buy Now</Button>
      </Card.Body>
    </Card></div></Link> 
    )):(
        <p>No products exist</p>
    )}
    </Row>
        
        
        
        
        </>
    )

}

export default Products

