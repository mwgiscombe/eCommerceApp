import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import favorites from '../assets/favorites.gif'
import favoritesfull from '../assets/favoritesfull.PNG'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { useRef } from 'react';

library.add(fas, far, fab)

function MyFavorites({favItems, setFaveItems, favAdded, addToFavorites, show, setShow}) {
  

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const scrollRef = useRef(null)

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: 'smooth' })
  }
  
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
  }
  
  return (
    <>
      {/* Fixed bottom button */}
      <div className={`favoritesButton ${show ? "raised" : ""}`}>
        <Button onClick={show ? handleClose : handleShow}>My Favorites<img src={favAdded ? favorites : favoritesfull} /></Button>
      </div>

      {/* Slide-up panel */}
      <Offcanvas show={show} onHide={handleClose} placement="bottom">
        

        <Offcanvas.Body>
            <div class="d-flex flex-row favoritesPanel gap-4 scroll-side px-3 py-3">
            <button className="scroll-btn left" onClick={scrollLeft}>‹</button>
            <div className='scroll-content d-flex flex-row gap-4' ref={scrollRef}>
          {favItems.length > 0 ? favItems.map(p=>
          <>
            
            <div className="d-flex flex-column align-items-center justify-content-center favoritesCard p-3 bg-white">
            <Link to={`/productPage/${p.id}`} >
            <h5>{p.title}</h5>
            <div className='d-flex justify-content-center mb-1'>
            <img className="favoritesPic" src={p.images[p.favImg].url} />
            </div>
            </Link>
            <FontAwesomeIcon onClick={()=>addToFavorites(p.id)}
            icon={['far', 'circle-xmark']} />
            </div>
            
            </>
          ): 'Nothing Here'}
          </div>
          <button className="scroll-btn right" onClick={scrollRight}>›</button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MyFavorites;
