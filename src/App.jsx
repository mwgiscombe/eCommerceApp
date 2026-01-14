import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductPage from './pages/productPage'
import Cart from './pages/cart'

import './App.css'
import MyNav from './components/MyNav';
import Products from './components/Products'


function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCats, setSelectedCats] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [mainImage, setMainImage] = useState(0)
  const [itemVar, setItemVar] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [balance, setBalance] = useState(50)
  
  

          
useEffect(() => {
  if (selectedCats.length === 0) {
    setFilteredProducts(products);
  } else {
    setFilteredProducts(products.filter(p => selectedCats.includes(p.category)));
  }
}, [selectedCats, products]);


  useEffect(() => {
    fetchProducts()
  }, [])
  async function fetchProducts(){
    try{
        const res = await fetch('https://api.jsonbin.io/v3/b/695ea501d0ea881f405b5c32')
        const data = await res.json()
        setProducts(data.record.products)
        setSelectedCats([])
        const ProductCategories = data.record.products.map(p => p.category)
        const uniqueCats =[]
        ProductCategories.forEach(c=>{
            if(!uniqueCats.includes(c)){
                uniqueCats.push(c)
            }
        })
        
        setCategories(uniqueCats)
       
    }catch(error){
        console.log(error)
    }
}

function addToCart(id, vari, qty){
  const product = products.find(p=>p.id === id)
  // const cartProduct = cartItems.find(p=>p.id === id)

   setCartItems(prev=>{
    const existing = prev.find(p=> p.id === id && p.selected === vari)
   
    if(existing){
      return prev.map(item =>
        item.id === id && item.selected === vari
        ? {...item, quantity: Number(item.quantity +qty)}
        : item
      )
    }
   
   
    const newItem = {
      ...product,
      
        selected: vari,
      quantity: qty
    }
  
    return [...prev, newItem]})
    
  }


// function setVariationinCart(id, vari){
//   const product = cartItems.find(p=>p.id === id)
  
//   product.images.selected = vari
//   }


function removeFromCart(id, vari){
  const product = cartItems.find(p=>p.id === id && p.selected === vari)
  const updated = cartItems.filter(p=>p.id !== id || p.selected !== vari)
 setCartItems(updated)

}
  

  return (

   
    <>
    <BrowserRouter>
    <MyNav balance={balance} setBalance={setBalance} />
    <Routes>
      <Route path='/productPage/:id' element={<ProductPage products={products} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage}/>} />

      <Route path="/" element={ <Products products={products} categories={categories} selectedCats={selectedCats} filteredProducts={filteredProducts} setSelectedCats={setSelectedCats} cartItems = {cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage} /> } />

      <Route path='/cart' element={<Cart products={products} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage} removeFromCart={removeFromCart} cartTotal={cartTotal} setCartTotal={setCartTotal} balance={balance} />} />
    </Routes>
      
      
      </BrowserRouter>
    </>
  )
}

export default App
