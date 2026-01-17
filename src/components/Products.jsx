import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Badge from 'react-bootstrap/Badge';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

library.add(fas, far, fab)
import Carousel from 'react-bootstrap/Carousel';
import './Products.css'
import { Container } from "react-bootstrap";
import Slider from '@mui/material/Slider'

import emptyHeart from '../assets/emptyHeart.png'
import fullHeart from '../assets/fullHeart.png'









library.add(fas, far, fab)



function Products({ products, categories, selectedCats, setSelectedCats, visibleProducts, searchTerm, setSearchTerm, price, setPrice, minRating, setMinRating, min, max, favItems, setFavItems, addToFavorites}){
    
  console.log(products)
//   useEffect(() => {
//   if (products.length > 0) {
//     const prices = products.map(p => p.price)
//     const min = Math.min(...prices)
//     const max = Math.max(...prices)

//     setMinPrice(min)
//     setMaxPrice(max)
//     setPriceSlider(max)   // initialize slider AFTER data loads
//   }
// }, [products])


function ProductCard({product, favItems, addToFavorites}){
    const [index, setIndex]=useState(0)
    return(
        <Col xs={12} lg={6}>
<Card className="p-4 d-flex flex-row row mx-1 my-1 productCard">
    <Row>
    <Col xs={12} lg={5}>      
        <Carousel  fade indicators={false} activeIndex = {index} onSelect={(selectedIndex) => setIndex(selectedIndex)} interval={null}>
        {product.images.length > 1 ? product.images.map((img, index) =>(
            
            
      <Carousel.Item key ={index}>
        <img
        className='productCarImage'
        src={img.url} />
      </Carousel.Item>
    
    )): <img className="col-5 product_image" src={product.images[0].url} />}
      
      
    </Carousel>
    
    <div className="custom-indicators d-flex gap-2 justify-content-center flex-wrap mt-3">
  {product.images.map((img, i) => (
    <img
      key={i}
      src={img.url}
      className={`indicator-thumb ${i === index ? 'active' : ''}`}
      onClick={() => setIndex(i)}
    />
  ))}
</div>
</Col>  


            
            <Col xs={12} lg={7}>
            <Card.Body className="p-2 d-flex flex-column justify-content-between">
            <div className='d-flex favoriteButton justify-content-center align-items-center' style={
                {
                    backgroundColor: favItems.find(p=> p.id === product.id) ? 'pink' : '#f6f6f6' ,
                    border: favItems.find(p=> p.id === product.id) ? '1px solid #e75480' : '1px solid #939393'
                }}
                onClick={()=>addToFavorites(product.id, index)}>
                <img src={favItems.find(p=> p.id === product.id)? fullHeart : emptyHeart} /></div>
                <Card.Title style={{minHeight: '48px'}}>
                    {product.title}<br />
                    <div className="productStars py-1">
                    {'⭐'.repeat(product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length)} ({product.reviews.length} reviews)</div>
                </Card.Title>
                <Card.Text className="productCardText description ps-2">
                    {product.description.length > 150 ? product.description.slice(0,150)+'...': product.description}<br />
                    
                </Card.Text>
                <Row className="d-flex flex-row justify-content-center justify-content-lg-between align-items-center gap-1">
                    <Col className="d-flex flex-row justify-content-center" xs={12} lg={7}>
                    <Link to={`/productPage/${product.id}`} className="btn productButton shadow w-100 "> Select Options</Link>
                    </Col>
                    <Col className="d-flex flex-row justify-content-center" xs={12} lg={4}>
                    <h5 className='price p-3 rounded-pill text-white shadow d-flex justify-content-center align-items-center'>${product.price}</h5>
                    </Col>
                    </Row>
                
            </Card.Body>
            </Col>
            </Row>
        </Card>
        </Col>
    )
   }


    function removeCat(cat){
        const newCats =selectedCats.filter(c=> c != cat)
        setSelectedCats(newCats)
    }

    function clear(){
        setSelectedCats([])
        setPrice([min, max])
        setMinRating(0)
    }

    function selectCategory(c){
        const cat = c.target.value
       if(!selectedCats.includes(cat)){
        setSelectedCats(prev=> [...prev, cat])
       }
       

    }

    function searchProducts(i){
        const search = i.target.value.toLowerCase()
        setSearchTerm(search)
            
    }
    function filterPrice(e, newValue){
        setPrice(newValue)
    }
   

    return(
        <>
        <div className='productPageHeader container-fluid d-flex w-100 px-5'>
            <div className = 'row mx-auto'>
                <Col xs={12} lg={5} className="funFont d-flex justify-content-center align-items-center">
                    <h1 className='mx-lg-5 gradient text-end text-lg-end text-xs-center'>Check out these highly rated products!</h1>
                </Col>
                <Col xs={12} lg={5}>
        <Carousel fade className="bg-white my-3 p-3 rounded shadow mx-lg-5">
        {products.length ? products.filter(product=> product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length > 3).map(product =>(
            
            
      <Carousel.Item>
        <div className='Container mx-auto d-flex flex-row gap-2 py-4 carItem'>
            <Row className="d-flex flex-row">
                <Col xs={12} lg={5}>
            <img className='product_car' src={product.images[0].url} />
            </Col>
            <Col>
            <div className='d-flex flex-column justify-content-between'>
               
                <h2 className="title">{product.title}</h2>
                <div>{'⭐'.repeat(product.reviews.reduce((sum, review) => sum + review.rating, 0)/product.reviews.length)}</div>
                <h5>{product.description.length > 150 ? product.description.slice(0,150) + '...': product.description}</h5>
                <Link to={`/productPage/${product.id}`} className='btn btn-dark'>Check it out!</Link>
                
            </div>
            </Col>
            </Row>
            </div>
      </Carousel.Item>
    
    )): ''}
      
      
    </Carousel>
    
    </Col>
    </div>
    </div>
    <div class="wave-divider gradient my-3"></div>

    
        
        <Container fluid>
   <Row className='my-2 mx-auto'>

    {/*FILTER COLUMN*/ }
    <Col xs={12} lg={3}>
    <div className="container">
   <div className='d-flex filterBox flex-column bg-white rounded p-4 shadow justify-content-center align-items-center'>
    <h2 className='funFont gradient'>Search</h2><hr className="hr w-75"></hr>
    
    <Form className='shadow w-75 my-2'>
        
        
        <Form.Control type="text" placeholder="What are you looking for?" onInput={(i)=>{searchProducts(i)}} />
        
      
      </Form>
  
    
    {/* Category Select */}
    <div  className='w-75 my-2'>
    <h5>Select a Category</h5>
            <Form.Select aria-label="Default select example" className='shadow w-100 my-4'
                onChange={(c)=>{selectCategory(c)}}>
                    
            <option>Categories</option>
            {categories.map((c)=>(
                !selectedCats.includes(c) ?
                <option key={c} value={c}>{c}</option>
                : ''
            ))}
          </Form.Select>
          </div>
          
{/* Price Slider */}
<div  className='w-75 my-2'>
<h5>Price Range</h5>
<Slider 
value={price} 
step={1}
onChange={(e, newValue) => filterPrice(e, newValue)}
 min={min} 
 max={max}
  valueLabelDisplay="auto" 
  disableSwap />
</div>
  {/*set min rating*/}
  <div className='w-75 my-2'>
  <h5>Minimum Rating</h5>
  <Form.Select aria-label="Default select example"
  
                onChange={(c)=>{
                    const value = c.target.value
                    if(value === ''){setMinRating(0)}
                    
                    setMinRating(Number(value))
                    Form.reset()

                }}>
            <option value= ''>Minimum Rating</option>
            <option value='5'>⭐⭐⭐⭐⭐</option>
            <option value='4'>⭐⭐⭐⭐</option>
            <option value='3'>⭐⭐⭐</option>
            <option value='2'>⭐⭐</option>
            <option value='1'>⭐</option>
            
          </Form.Select>
          </div>
 



        </div>
        
        </div>     
    </Col>

    {/*PRODUCTS*/}
    <Col xs={12} lg={8} className="product_cont">
    
    <Row className="gap-2 justify-content-start">
    <Col xs={12} lg={2} className='my-3 ms-3 searchNumber text-center rounded d-flex flex-column justify-content-center align-items-center text-white'><h2 className='funFont'>{visibleProducts.length} </h2><h5>{visibleProducts.length < 2 && visibleProducts.length != 0 ? 'Product!' : 'Products!'}</h5></Col>
            <Col xs={12} lg={9}>  
                
                {selectedCats.length > 0 || price[0] != min || price[1] != max || minRating >0 ?
                <div className="d-flex gap-1 justify-content-start flex-row flex-wrap bg-white rounded shadow p-1 justify-content-between align-items-center">
                <div className="d-flex gap-1 justify-content-start flex-row flex-wrap" >
                    {selectedCats.length ? selectedCats.map(c=>(
                    <Badge className="p-2 d-flex gap-2 my-2 mx-1 shadow-sm" bg="info">{c}<div onClick={()=>removeCat(c)}><FontAwesomeIcon icon={['far', 'circle-xmark']} />
                    </div> </Badge>
                    )): ''} 
              

                {price[0] != min ? <Badge className="p-2 d-flex gap-2 my-2 mx-1 shadow-sm" bg="light" text="dark">Min Price: ${price[0]}<div onClick={()=>setPrice(prev=>[min, prev[1]])}><FontAwesomeIcon icon={['far', 'circle-xmark']} />
                </div></Badge> : ''}
                {price[1] != max ? <Badge className="p-2 d-flex gap-2 my-2 mx-1 shadow-sm" bg="light" text="dark">Max Price: ${price[1]}<div onClick={()=>setPrice(prev=>[prev[0], max])}><FontAwesomeIcon icon={['far', 'circle-xmark']} />
                </div></Badge> : ''}
                {minRating > 0 ? (<Badge className="p-2 d-flex flex-row gap-2 my-2 mx-1 shadow-sm text-white" bg="secondary" text="dark"><div className="d-flex flex-row gap-2">{'⭐'.repeat(minRating) + ` (${minRating})`}<div onClick={()=>setMinRating(0)}><FontAwesomeIcon icon={['far', 'circle-xmark']} /></div>
                </div></Badge>) : ''}
              </div> 
              <Badge  onClick={clear} bg="danger" className='d-flex align-items-center justify-content-center' style={
                {width: '30px',
                height: '30px'}
                }> <FontAwesomeIcon icon={['far', 'circle-xmark']}/></Badge>
              </div> 
              : ''}
              
            </Col>
            <Row>
        {visibleProducts.length ? visibleProducts.map(product =>(
            <ProductCard
            key={product.id}
            product={product}
            favItems={favItems}
            addToFavorites={addToFavorites}
             />
        

     
    )):(
        'no products'
    )}
    </Row>
    </Row>
    </Col>
    </Row>
        </Container>
        
        
        
        </>
    )

}

export default Products

