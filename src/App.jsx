import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ProductPage from './pages/productPage'
import Cart from './pages/cart'

import './App.css'
import MyNav from './components/MyNav';
import Products from './components/Products'
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import MyFavorites from './components/MyFavorites';



function App() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCats, setSelectedCats] = useState([])
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [cartItems, setCartItems] = useState([])
  const [mainImage, setMainImage] = useState(0)
  const [itemVar, setItemVar] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [balance, setBalance] = useState(50)
  const [searchTerm, setSearchTerm]=useState('')
  const [price, setPrice] = useState([0,99999])
  const [favItems, setFavItems] = useState([])
  
  const [minRating, setMinRating] = useState(0)
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(999)
  const [added, setAdded]=useState(false)
  const [favAdded, setFavAdded]=useState(false)
  const [show, setShow] = useState(false);
  
  useEffect(() => {
  if(products.length > 0){
    const prices= products.map(p=>p.price)
    setMin(Math.min(...prices))
    setMax(Math.max(...prices))

    setPrice([min, max])
  }
}, [products])

//FILTERS
const visibleProducts = products
      .filter(product=>{
        const matchesSearch =
              searchTerm === '' ||
              product.title.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory=
              selectedCats.length === 0 ||
              selectedCats.includes(product.category)
        const matchesPrice =
              product.price >= price[0] && product.price <= price[1]
        const avgRating = product.reviews.reduce((s,r)=> s+r.rating,0)/product.reviews.length
        const matchesRating =
              avgRating >= minRating

              return matchesSearch && matchesCategory && matchesPrice && matchesRating
      })
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
    setAdded(true)
    setTimeout(()=>{setAdded(false)}, 2000)

    
  }

  function addToFavorites(id,img){
    const product = products.find(p=>p.id === id)

    setFavItems(prev=>{
      const existing = prev.find(p=>p.id === id)


      if(existing){
        const updated = favItems.filter(p=>p.id !== id)
        return updated
      }else{
        const newF={
          ...product,
          favImg: img
        }
        return [...prev, newF] 
       
      }
    })
    setFavAdded(true)
    setTimeout(()=>{setFavAdded(false)}, 2000)
    
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
    <MyNav balance={balance} setBalance={setBalance} cartItems={cartItems} added={added} show={show} setShow={setShow} />
    <Routes>
      <Route path='/productPage/:id' element={<ProductPage products={products} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage}/>} />

      <Route path="/" element={ <Products products={products} categories={categories} selectedCats={selectedCats} setSelectedCats={setSelectedCats}  cartItems = {cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage} visibleProducts={visibleProducts} searchTerm={searchTerm} setSearchTerm={setSearchTerm} price={price} setPrice={setPrice} minRating={minRating} setMinRating={setMinRating} min={min} max={max} favItems={favItems} setFavItems={setFavItems} addToFavorites={addToFavorites} /> } />

      <Route path='/cart' element={<Cart products={products} addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} itemVar={itemVar} setItemVar={setItemVar} setMainImage={setMainImage} mainImage={mainImage} removeFromCart={removeFromCart} cartTotal={cartTotal} setCartTotal={setCartTotal} balance={balance} />} />
    </Routes>
    <MyFavorites favItems={favItems} setFavItems={setFavItems} favAdded={favAdded} addToFavorites={addToFavorites} show={show} setShow={setShow} />
      
      
      </BrowserRouter>
    </>
  )
}

export default App
