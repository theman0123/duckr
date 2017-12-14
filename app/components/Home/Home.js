import React from 'react'
import { container, title, slogan } from './styles.css'

const Home = (props) => {
  return (
    <div className={container}>
      <p className={title}>{'Duckr'}</p>
      <p className={slogan}>{'the real-time, cloud-base, modular, scalable, growth-hack, social-platform'}</p>
    </div>
  )
}

export default Home
