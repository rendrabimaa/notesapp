import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navigation extends Component{
    state = {clicked:false};
    handlerClick = () =>{
        this.setState({clicked: !this.state.clicked})
    }
    render(){
        return(
            
            <nav>
                <a href="/"> NOTE IT! </a>
                <div >
                    <ul id="navbar" className={this.state.clicked ? "#navbar active" : "#navbar"}>
                        <li className="active"> <Link to="/" className="text"> Home</Link> </li>
                        <li> <Link to="" className="text"> About</Link> </li>
                        <li> <Link to="/login" className="text"> <i className="fa fa-user-circle"></i> Login</Link> </li>
                    </ul>
                </div>
    
                <div id="mobile" onClick={this.handlerClick}>
                    <i id ="bar" className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}>
                    </i>
    
                </div>
    
            </nav>        
           
        )
    }
    
}

export default Navigation;