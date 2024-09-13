import React from 'react'
import Header from '../components/layout/Header'
import EventCard from '../components/route/eventCard/EventCard'
import Footer from '../components/layout/Footer'
import { scrollTop } from '../utils/scrollTop'

const EventsPage = () => {
    scrollTop()
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true } />
        
        <Footer />
    </div>
  )
}

export default EventsPage