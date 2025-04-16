import React from 'react'
import Hero from './components/Hero'
import Explore from './components/Explore'
import FollowUp from './components/FollowUp'
import Discover from './components/Discover'

const page = () => {
  return (
    <div>
      <Hero />
      <Explore />
      <FollowUp />
      <Discover />
    </div>
  )
}

export default page