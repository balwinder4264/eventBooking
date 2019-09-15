import React,{Component} from 'react';
import './events';
import Model from '../../components/Model/model'
import {Container,Row,Col,Spinner,Form} from 'react-bootstrap'
import AuthContext from '../../context/auth-context'
import EventList from '../../components/Events/evnetList/eventList'
class Events extends Component{
    state ={
        creaEvents:false,
        events:[],
        isLoading:false,
        selectedEvent:null
    }
    static contextType=AuthContext
  
    componentDidMount (){
        this.fetchEventhandler();
    }
  
    modelConfirmHandler =(event) =>{
        event.persist()
        event.preventDefault();
        const title=  event.target.title.value
        const price= +event.target.price.value
        const date= event.target.date.value
        const description= event.target.description.value
        
        if(title.trim().length ===0||isNaN(price)||date.trim().length ===0||description.trim().length ===0){
            return
        }

      
           const  requestBody= {
                query :`
                mutation{
                    createEvent(eventInput:{title:"${title}",description:"${description}",price:${price},date:"${date}"}){
                        _id
                        title
                        description
                        price
                        date
                        creater{
                            _id
                            email
                        }
                  }
                }
                `
          }
        const token= this.context.token 
       
       fetch('http://localhost:8000/graphql',{
           method:'POST',
           body:JSON.stringify(requestBody),
           headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + token
           },
         
       })
       .then(res=>{
           
           if(res.status!== 200 &&res.status!==201)
           {
               throw new Error('Failed')
           }
           return res.json();
       }).then(resData =>{
        this.setState(prevState=>{
            const updatedEvent= [...prevState.events]
            // console.log(updatedEvent);
            // console.log("res",resData.data.createEvents)

            updatedEvent.push({
                _id:resData.data.createEvent._id,
                title:resData.data.createEvent.title,
                description:resData.data.createEvent.description,
                price:resData.data.createEvent.price,
                date:resData.data.createEvent.date,
                creater:{
                    _id: this.context.userId,
                }
            })
            return {events:updatedEvent}
        })
         
       })
       .catch(err=>{
           console.log(err)
       })
        this.setState({creaEvents:false})
    }
    fetchEventhandler (){
        this.setState({isLoading:true})
        const  requestBody= {
            query :`
            query{
               events{
                    _id
                    title
                    description
                    price
                    date
                    creater{
                        _id
                        email
                    }
              }
            }
            `
      }
     
   
   fetch('http://localhost:8000/graphql',{
       method:'POST',
       body:JSON.stringify(requestBody),
       headers:{
        'Content-Type': 'application/json'
       
       },
     
   })
   .then(res=>{
       
       if(res.status!== 200 &&res.status!==201)
       {
           throw new Error('Failed')
       }
       return res.json();
   }).then(resData =>{
      
       const events = resData.data.events
       this.setState({events:events,isLoading:false})
      
   })
   .catch(err=>{
       console.log(err)
       this.setState({isLoading:false})
   })
    }

    startCreateEventhandler =() =>{
        this.setState({creaEvents:true})
    }
    modelcancelhandler =() =>{
        this.setState({creaEvents:false,selectedEvent:null})
    }
    showDetailHandler =(eventId)=>{
     
      this.setState(prevState=>{
          const selectedEvent = prevState.events.find(e=>e._id===eventId)
          return {selectedEvent:selectedEvent}
      })
    }
    BookEventHander=(e)=>{
        e.preventDefault();
        if(!this.context.token){
            this.setState({selectedEvent:null})
            return
        }
       
        const  requestBody= {
            query :`
            mutation{
                bookEvent(eventId:"${this.state.selectedEvent._id}"){
                    _id
                   createdAt
                   updatedAt
              }
            }
            `
      }
     
   
   fetch('http://localhost:8000/graphql',{
       method:'POST',
       body:JSON.stringify(requestBody),
       headers:{
        'Content-Type': 'application/json',
        'Authorization':'Bearer ' + this.context.token
       
       },
     
   })
   .then(res=>{
       
       if(res.status!== 200 &&res.status!==201)
       {
           throw new Error('Failed')
       }
       return res.json();
   }).then(resData =>{
      console.log(resData)
      this.setState({selectedEvent:null})
   })
   .catch(err=>{
       console.log(err)
       this.setState({isLoading:false})
   })
      
    }
    render(){
       
        return(
            <React.Fragment>
           <Model show ={this.state.creaEvents} oncancel={this.modelcancelhandler} onSubmit={this.modelConfirmHandler} submitButtonText="Create Event">
           <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control  type="text" placeholder="Enter Some title..." />
          </Form.Group>
         < Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" />
          </Form.Group>
          < Form.Group controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control type="datetime-local" />
          </Form.Group>
 
  
            <Form.Group controlId="description">
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows="3" />
            </Form.Group>
           </Model>
           {this.state.selectedEvent&&(  <Model show ={true} oncancel={this.modelcancelhandler} 
           onSubmit={this.BookEventHander} submitButtonText={this.context.token?"Book Event":"confirm"}>
          <h1>{this.state.selectedEvent.title}</h1>
          <Row>
          <h5 style={{marginLeft:"15px"}}>${this.state.selectedEvent.price}</h5>
           &nbsp; &nbsp; <h5 >{new Date(this.state.selectedEvent.date).toLocaleDateString()}</h5>
          </Row>
         
           <p>{this.state.selectedEvent.description}</p>
           </Model>)}
               {this.context.token&& <Container>
                <Row className="justify-content-md-center" >
                <Col className="colstyle"  md="auto" > 
                <p>share you own events</p>
                <button type="button" style={{marginLeft:"17px"}} className="btn btn-primary" onClick={this.startCreateEventhandler}  >Create Event</button>
                </Col>
                </Row>
                </Container>}
                <Container >
            <Row  className="justify-content-md-center">
            {this.state.isLoading?<Spinner animation="border" variant="primary" />: 
            <EventList  eventarray = {this.state.events}
             userId={this.context.userId} onViewDetail={this.showDetailHandler}/>}
           
            </Row>
          
            </Container>
            </React.Fragment>
            
        )
    }
}
export default Events;