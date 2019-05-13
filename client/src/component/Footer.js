import React from 'react'

const Footer = () =>{
  console.log('process.env', process.env)
  return (
    <footer>
      <p>Howes Fishing v-{process.env.REACT_APP_VERSION}</p>
    </footer>
  )
}

export default Footer