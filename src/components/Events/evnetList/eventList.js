import React from 'react';
import EventItems from './eventitem/eventitem'
import {ListGroup} from 'react-bootstrap'
const eventList = props =>{
    const events = props.eventarray.map(event=>{
       
      
        return(
        <EventItems key={event._id} eventId ={event._id} price={event.price} date={event.date}
          title={event.title} createrId ={event.creater._id} userId={props.userId}
          ondetail={props.onViewDetail}/>)
    })

      return  <ListGroup style={{width:"70%",paddingTop:"20px"}}> {events}</ListGroup>
}
export default eventList;