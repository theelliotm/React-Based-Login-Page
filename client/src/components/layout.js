import styles from './layout.module.css'
import React from 'react';

class Layout extends React.Component {
  render() {
    return (
    <div className={styles.container}>
      <main>{this.props.children}</main>
    </div>
    );
  }
}

export default Layout;