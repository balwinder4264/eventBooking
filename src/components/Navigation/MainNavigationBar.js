import React,{Component} from 'react';
import {NavLink} from 'react-router-dom'
import './Mainnavigation.css'
import AuthContext from '../../context/auth-context'
class MainNavBar extends Component{
    render(){
       
        return(
            <AuthContext.Consumer>
                {context=>{
                    
                    return(
                        <div >
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
                            <NavLink to="/auth" className="navbar-brand" >Website</NavLink>
                            <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                               <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse " id="navbarMenu">
                            <ul className="navbar-nav ml-auto ">
                          { !context.token&&<li className="navbar-nav ">
                           <NavLink to="/auth" className="nav-link" >Authentication</NavLink>
                           </li>}
                           <li className="navbar-nav">
                            <NavLink to="/events" className="nav-link">Events</NavLink>
                            </li>
                            <li className="navbar-nav">
                            <NavLink to="/test" className="nav-link">Test</NavLink>
                            </li>
                            
                           { context.token&& (
                           <React.Fragment>
                           <li className="navbar-nav">
                           <NavLink to="/bookings" className="nav-link">Booking</NavLink>
                           </li>
                           <li className="navbar-nav">
                            <button className="btn btn-primary" onClick={context.logout}>Logout</button>
                           </li>
                          </React.Fragment>)
                            
                        }
                           
                      
                          
                            </ul>
                            </div>
                           
           
                        </nav>
                         
                      </div>
                    )
                }}
         
           </AuthContext.Consumer>
        )
    }
}
export default MainNavBar;