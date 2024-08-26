import React from 'react'
import Header from '../components/layout/Header'
import EventCard from '../components/route/eventCard/EventCard'

const EventsPage = () => {


    window.scrollTo(0,0)
  return (
    <div>
        <Header activeHeading={4}/>
        <EventCard active={true } />
        <EventCard active={true } />
    </div>
  )
}

export default EventsPage