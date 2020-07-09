import React from 'react'
import styles from './button.module.css'

const buttonStyle = "cursor-pointer transition duration-150 ease-in-out rounded items-center font-bold focus:outline-none"
const primaryStyle = "shadow-blue hover:shadow-bluehover text-white py-2 px-4 transform";
const secondaryStyle = "shadow hover:shadow-none inline-flex inline-block align-baseline text-sm py-2 px-3";
const disabledStyle = "cursor-not-allowed py-2 px-4 transform bg-gray-200";

class Button extends React.Component {
  render() {
    const _type = this.props.type ? this.props.type : "button";
    switch (this.props.bstyle) {
      case "primary": return <button className={`${buttonStyle} ${primaryStyle} ${styles.primarybutton}`} type={_type}> {this.props.children} </button>;
      case "secondary": return <button className={`${buttonStyle} ${secondaryStyle} ${styles.secondarybutton}`} type={_type}> {this.props.children} </button>;
      case "disabled": return <button className={`${buttonStyle} ${disabledStyle}`} type={_type}> {this.props.children} </button>;
      default: return <p>No type specified.</p>;
    }
  }
}

export default Button;

