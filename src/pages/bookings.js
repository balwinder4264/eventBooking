import React,{Component} from 'react';
import AuthContext from '../context/auth-context'
import BookingList from '../components/Booking/bookingList/bookinglist'
import { Container, Row } from 'react-bootstrap';
class Booking extends Component{
    state ={
        isLoading:false,
        bookings:[]
    }
    static contextType=AuthContext;
    UNSAFE_componentWillMount(){
    this.fetchBookings();
    }
    fetchBookings =()=>{
        this.setState({isLoading:true})
        const  requestBody= {
            query :`
            query{
               bookings{
                    _id
                   createdAt
                   event{
                       _id
                       title
                       date
                   }
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
      
       const bookings = resData.data.bookings
       this.setState({bookings:bookings,isLoading:false})
      
   })
   .catch(err=>{
       console.log(err)
       this.setState({isLoading:false})
   })
      
    }
    ondeletebookingHandler =(bookingId)=>{
      console.log(bookingId)
      this.setState({isLoading:true})
        const  requestBody= {
            query :`
            mutation{
                cancelBooking(bookingId:"${bookingId}"){
                 _id
                 title
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
      this.setState(prevState=>{
          const updateBookings = prevState.bookings.filter(booking=>{
              return booking._id!==bookingId;
          })
         
          return{bookings:updateBookings,isLoading:false}
      })
   
      
   })
   .catch(err=>{
    
       console.log(err)
       this.setState({isLoading:false})
   })
    }
    render(){
      console.log(this.state.bookings)
        return(
           <Container > 
           <Row className="justify-content-md-center"> 
           <BookingList  bookingArray = {this.state.bookings} ondeletebooking={this.ondeletebookingHandler} />
           </Row>
            
           </Container>
            
            
           
    
        )
    }
}
export default Booking;