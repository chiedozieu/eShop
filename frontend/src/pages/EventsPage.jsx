import React from 'react'
import Header from '../components/layout/Header'
import EventCard from '../components/route/eventCard/EventCard'
import Footer from '../components/layout/Footer'

const EventsPage = () => {


    window.scrollTo(0,0)
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true } />
        <EventCard active={true } />
        <Footer />
    </div>
  )
}

export default EventsPage