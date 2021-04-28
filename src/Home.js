import { waitFor } from '@testing-library/dom';
import React, { useState } from 'react';
import ListView from './components/ListView';
import logo from './images/loader.gif';
import Styles from './css/General.module.css'
import '../node_modules/@fortawesome/fontawesome-free/css/all.css';


class Home extends React.Component
{
 
    constructor(props)
    {
        super(props)

        this.state={

            motif :"",
            users:[],
            usersFilter:[],
            isloading:false

        }

        
    }
   
 filter = ()=>{

    
    let regexp=new RegExp(this.state.motif.toLocaleLowerCase(),'');
 
    let users=this.state.users.filter(user=>{  
       
        return regexp.test(user.nom.toLocaleLowerCase())
    })

   
    this.setState({
        usersFilter:users

    });
    
 }
    handleChange = (event)=>{
     
        this.setState({motif:event.target.value})
      
    }
     
    isloading()
    {
       
       return  this.state.isloading?"":<img src={logo} alt="loading..."  id="loader" /> ;
    }

   render()
   {
    
    return <div className={Styles.container}>

            <h1>
                MES AMIS ROBOTS
            </h1>

            <div className="divInput">
            {this.isloading()} <input type="text" value={this.state.motif} onChange={this.handleChange} placeholder="Rechercher par un nom" onKeyUp={this.filter}/>
            </div>
            <div> 
                <ListView  users={this.state.usersFilter}  className={Styles.listView}/>
            </div>
   
         </div>
   }


   componentDidMount()
   {
        
         this.loadUsers();   
         this.setState({isloading:false});
   }

    loadUsers()
   {
            const url="https://jsonplaceholder.typicode.com/users";
            const urlImg="https://robohash.org/";

          
           
            
            let users = fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            
                            let users = data.map(function(user,key)
                                {
                                    let myUser = {}
                                    myUser.nom = user.name;
                                    myUser.id = user.id;
                                    myUser.email = user.email;
                                    myUser.source = urlImg+"/"+user.id;
                                    myUser.key =key;
                                    return myUser;

                                })
                            this.setState({users,usersFilter:users})
                            this.setState({isloading:true})
                        });
          
         
                        this.setState({isloading:false})
   }
}

export default Home;