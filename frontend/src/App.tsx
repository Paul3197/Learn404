import { motion } from "framer-motion"
import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <motion.h2
      initial= {{
        rotate: '0deg'

      }}
      animate={{
        rotate: "180deg"
      }} 
      className='text-2xl text-blue-500'
      >
        Hello World</motion.h2>
    </>
  )
}

export default App
