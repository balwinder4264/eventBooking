import React,{Component} from 'react';
import './Auth.css'
import AuthContext from '../../context/auth-context'
class Auth extends Component{
    state ={
        isLogin:true,
        credentials :true
    }
    static contextType=AuthContext
    constructor (){
        super()
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }
    switchModeHandler =() =>{
        this.setState(prevState=>{
            return {isLogin:!prevState.isLogin}
        })
    }

    submitHandler = (event) =>{
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;
        if(email.trim().length ===0|| password.trim().length===0){
            return
        }
        let requestBody = {
            query :`
            query {
                login(email:"${email}",password:"${password}"){
                    userId
                    token
                    tokenExpiration
                }
            }
            `
        }
        if(!this.state.isLogin){
             requestBody= {
                query :`
                mutation{
                  createUser(userInput:{email:"${email}",password:"${password}"}){
                      email
                      _id
                  }
                }
                `
          }
        }
       
       fetch('http://localhost:8000/graphql',{
           method:'POST',
           body:JSON.stringify(requestBody),
           headers:{
            'Content-Type': 'application/json'  
           },
         
       })
       .then(res=>{
           if(res.status!==200 &&res.status!==201)
           {
               throw new Error('Failed')
           }
           return res.json();
       }).then(resData =>{
        if(resData.data.login===null){
          alert("Wrong Credentials Try Again")
          
        }
           if(resData.data.login.token){
               this.context.login(resData.data.login.token,resData.data.login.userId,resData.data.login.tokenExpiration)
           }
           

       })
       .catch(err=>{
          
           console.log(err)
       })
    }
    render(){
        return(
        
            <div className="container col-4" onSubmit={this.submitHandler}>
            <form>
            <div className="form-group ">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="email"
                 ref={this.emailEl} placeholder="Enter email"
                /> 
               
            
            </div>
            <div className="form-group ">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control"  ref={this.passwordEl} id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="row">
               
                <button type="button"onClick={this.switchModeHandler}  className="btn btn-primary spacebetween">Switch to {this.state.isLogin ?'SignUp':'Login'}</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
            </form>
            </div>
        )
    }
}

export default Auth;