import React from 'react';
import {ListGroup} from 'react-bootstrap'
import {Container,Row,Col,Button} from 'react-bootstrap'

const bookingList = props =>{
    console.log(props.bookingArray);
   const  bookings = props.bookingArray.map(booking=>{
       return(
    <ListGroup.Item style={{marginBottom:"10px",boxShadow: "2px 9px 5px"}}key={booking._id}>
    <Container  >
        <Row  style={{fontFamily:'fantasy'}} >
        <Col   style={{color:'blue'}}  ><h3> {booking.event.title}</h3></Col>
        <Col md={{ span: 3, offset: 3 }} ><Button variant="primary" onClick ={props.ondeletebooking.bind(this,booking._id)} >Cancel</Button></Col>
        </Row>
        <Row >
          <Col>
          <Row>
            <h5 >{new  Date(booking.createdAt).toLocaleDateString()}</h5>
           </Row>
           </Col>
        </Row>
    </Container>
</ListGroup.Item>)
   })
  
        return(
            <ListGroup style={{width:"70%",paddingTop:"20px"}}> 
              {bookings }
        </ListGroup>
        )

        }
export default bookingList;