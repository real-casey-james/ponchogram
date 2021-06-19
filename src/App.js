import './App.css';

import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"

function importAll(r) { return r.keys().map(r) }
const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

const variantsRight = {
  enter: (direction) => { return { x: direction > 0 ? -1000 : 1000, opacity: 0 }; },
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => { return { zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 };}};

const variantsLeft = {
  enter: (direction) => { return { x: direction > 0 ? 1000 : -1000, opacity: 0 };},
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (direction) => { return { zIndex: 0, x: direction < 0 ? -1000 : 1000, opacity: 0 };}};

let variants = variantsRight

const today = new Date()
// const today = new Date(2069, 9, 14)
let bday = new Date(today.getFullYear(), 9, 15)
if (today.getMonth() === 9 && today.getDate() > 15) { bday.setFullYear(bday.getFullYear() + 1 ) }
let oneDay = 1000 * 60 * 60 * 24
let oneYear = oneDay * 365

let daysUntil = Math.ceil((bday.getTime()-today.getTime())/oneDay)
let days = 'days'
let until = 'until'
let yay = ''
if (daysUntil === 1) { days = 'day' }
if (daysUntil === 0) {
  daysUntil = ''
  days = ''
  until = 'today is'
  yay = '! 🎉'
}

let actual = new Date(2018, 9, 15)
let turning = Math.ceil((today - actual)/oneYear)
let lastDigit = Number(turning.toString()[turning.toString().length-1])
let ordinal = 'th'
if (turning >= 11 && turning <= 13) {
  ordinal = 'th'
} else if (lastDigit === 1) {
  ordinal = 'st'
} else if (lastDigit === 2) {
  ordinal = 'nd'
} else if (lastDigit === 3) {
  ordinal = 'rd'
} 

export default function App() {
  const [ arrayIndex, setArrayIndex ] = useState(0)
  function imageLeft () { variants = variantsLeft; arrayIndex === 0 ? setArrayIndex(images.length - 1) : setArrayIndex(arrayIndex - 1) }
  function imageRight () { variants = variantsRight; arrayIndex === images.length - 1 ? setArrayIndex(0) : setArrayIndex(arrayIndex + 1) }

  return (
    <div className="App">
      <div className='nav' >
        <h2>ponchogram</h2>
      </div>
      <div className='imagesLeft' draggable="true" onClick={imageLeft} onDrag={imageLeft} onTouchMove={imageLeft}/>
      <div className='controlContainer' >
      <i className="arrow left"/>
        <AnimatePresence>
        <motion.img 
          draggable='false' 
          className='ponchoImage' 
          key={images[arrayIndex].default} 
          src={images[arrayIndex].default} 
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          alt='Poncho looking her best'/>
        </AnimatePresence>
      <i className="arrow right"/>
      </div>
      <div className='imagesRight' draggable="true" onClick={imageRight} onDrag={imageRight} onTouchMove={imageRight} />

      <p className='birthday'>{daysUntil} {days} {until} Poncho's {turning}<sup>{ordinal}</sup> birthday{yay}</p>
    </div>
  );
}
