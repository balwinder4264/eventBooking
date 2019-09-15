import React from 'react'
import { Button,Modal,Form, Row } from 'react-bootstrap';
const model =(props) =>{
    return (
      
       <React.Fragment>
      <Modal show={props.show} onHide={props.oncancel}>
        <Modal.Header closeButton onClick={props.oncancel}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit ={props.onSubmit}>
         {props.children}
            <Row >
            <Button  style={{marginLeft:"15px"}} type="submit"  variant="primary" >
            {props.submitButtonText}
          </Button>
          <Button style={{marginLeft:"10px"}}variant="secondary"  onClick={props.oncancel}>
            Close
          </Button>
            </Row>
           
          </Form>
            
        </Modal.Body>
        <Modal.Footer>
        
          
        </Modal.Footer>
      </Modal>
      </React.Fragment>

    )

}
export default model;