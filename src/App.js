import React,{Component} from 'react';
import  {BrowserRouter,Route,Redirect,Switch } from 'react-router-dom'
import './App.css';
import Auth from './pages/Auth/Auth'
import Events from './pages/events/events'
import Bookings from './pages/bookings'
import MainNavBar from './components/Navigation/MainNavigationBar'
import AuthContext from './context/auth-context'
import ReactBottstrapTest from './pages/tesReactBootstrap.js/testBootstrap'
class App extends Component {
  state={
    token:localStorage.getItem('token'),
    userId:localStorage.getItem('userId')
  }
  login=(token,userId,tokenExpiration)=>{
 this.setState({token:token,userId:userId})
 localStorage.setItem('token',token)
 localStorage.setItem('userId',userId)

  }
  logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    this.setState({token:null,userId:null})
   
  }
  render(){
    console.log(localStorage.getItem('token'))
    return (
      <BrowserRouter>
      <React.Fragment>
      <AuthContext.Provider value={{token:this.state.token,userId:this.state.userId,login:this.login,logout:this.logout}}>
      <MainNavBar  />
      <main className="main" >
      <Switch>
     
      {this.state.token&& <Route path="/bookings" component={Bookings}/>}
      {this.state.token&&<Redirect  from="/" to="/events" exact/>}
      {this.state.token&&<Redirect  from="/auth" to="/events" exact/>}
      {!this.state.token&&<Route path="/auth" component={Auth}/>}
      <Route path="/events" component={Events}/>
       <Route path="/test" component = {ReactBottstrapTest}/>
     {!this.state.token&&<Redirect  to="/auth" exact/>}
      </Switch>
      </main>
      </AuthContext.Provider>
      </React.Fragment>
  
      </BrowserRouter>
    );
  }
  
}

export default App;
