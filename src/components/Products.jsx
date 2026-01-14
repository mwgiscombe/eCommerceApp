import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ProductPage from "../pages/productPage";
import {Routes, Route} from 'react-router-dom'


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

    return(
        <>
        <div className="d-flex gap-2"><div>Search Results: {filteredProducts.length}</div>
       {selectedCats.length ? selectedCats.map(c=>(
            <div className="rounded bg-light shadow selectedCats p-2">{c}<div onClick={()=>removeCat(c)}>x</div></div>)): ''}</div>
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

