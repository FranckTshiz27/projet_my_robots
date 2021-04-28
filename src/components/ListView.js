/* eslint-disable no-useless-constructor */
import React from "react";
import Item from "./Item";
import Styles from '../css/General.module.css'

class ListView extends React.Component {

  constructor(props) {
    super(props)

    let flag = false;
  }
  



  render() {
    let users = this.props.users;
    return (
      <div className={Styles.listView}>
        {users.map((user, key) => {
          return <Item key={key} user={user} />;
        })}
      </div>
    );
  }
}

export default ListView;
