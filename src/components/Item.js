
import React from 'react';
import ReactModal from 'react-modal';
import Modal from   'react-modal';
import styles from  '../css/General.module.css'
import stylesModal from  '../css/Modal.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Item extends React.Component
{
    constructor(props)
    {
        super(props)
        
        this.state={
            show:false,
            userDetail:{}
        }  
     
    }

    getUserById()
    {

        let id = this.props.user.id;
        let url="https://jsonplaceholder.typicode.com/users";
        const urlImg="https://robohash.org/";
        url = url+"/"+id;
        let myUser = {}
         fetch(url).then(response => response.json())
                   .then(data => {
                                    let myUser = {}
                                    myUser.nom = data.name;
                                    myUser.key = data.id;
                                    myUser.username= data.username;
                                    myUser.email = data.email;
                                    myUser.source = urlImg+"/"+data.id;
                                    let address = data.address;
                                    let company = data.company;
                                    myUser.street = address.street;
                                    myUser.suite = address.suite;
                                    myUser.city= address.city;
                                    myUser.companyName = company.name;
                                    myUser.catchphrase= company.catchphrase;
                                    this.setState({userDetail:myUser})
                            
                        });


                        
    }

    handleOpenModal =(event)=>{
        this.getUserById();
        this.setState({show:!this.state.show});
      }
      
    render()
    { 
       const {id,nom,email,source,key} = this.props.user;
        return(
                <div  className={styles.item}  onClick={this.handleOpenModal}>
                     
                    <img src={source}/>  
                    <h2>{nom}</h2>
                    <p>{email}</p>

      
                  <ReactModal  isOpen={this.state.show} className={stylesModal.modal} ariaHideApp={false}>
                    
                     <div  className={stylesModal.containerLeft}>
                     <i className="fas fa-backward" onClick={this.handleOpenModal}></i>
                     <img src={source} />  
                     </div>

                     <div className={stylesModal.containerRight}>
                         <h2>IDENTITY</h2>
                         <p>
                         <span>{this.state.userDetail.nom+" "}</span> 
                         <span>{this.state.userDetail.username}</span>
                         </p>
                         <p>{this.state.userDetail.email}</p>
                         <h2>ADRESS</h2>
                         <address>
                         <p>{this.state.userDetail.street}</p> 
                         <p>{this.state.userDetail.suite}</p>
                         <p>{this.state.userDetail.city}</p>
                         </address>

                         <h2>COMPANY</h2>
                         <address>
                         <p>{this.state.userDetail.companyName}</p> 
                         <p>{this.state.userDetail.catchphrase}</p>
                        
                         </address>
                     </div>
                    
                    
                    </ReactModal> 
                

                </div>
        )
    }
}

export default Item;