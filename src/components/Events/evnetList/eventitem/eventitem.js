import React from 'react';
import {Container,Row,Col,ListGroup,Button} from 'react-bootstrap'
const eventList =props =>{
  
    return(
        <ListGroup.Item style={{marginBottom:"10px",boxShadow: "2px 9px 5px"}} key={props.eventId}>
            <Container  >
                <Row style={{fontFamily:'fantasy'}} >
                <Col   style={{color:'blue'}}  ><h3>{props.title}</h3></Col>
                <Col md={{ span: 3, offset: 3 }} > { props.userId === props.createrId ?<p>you are the owner </p>:<Button variant="primary" onClick={props.ondetail.bind(this,props.eventId)}>View Details</Button>}</Col>
                </Row>
                <Row className="justify-content-md-center">
                  <Col>
                  <Row>
                   <h5 style={{marginLeft:"15px"}}>${props.price}</h5> &nbsp; &nbsp; <h5 >{new Date(props.date).toLocaleDateString()}</h5>
                   </Row>
                   </Col>
                </Row>

           
            </Container>
       
        </ListGroup.Item>
    )
}
export default eventList;