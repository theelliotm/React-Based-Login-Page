import React from 'react';

class Input extends React.Component {
  render() {
    return (
      <>
        <label className={`block text-gray-700 text-sm font-bold mb-2`}>{this.props.name}{this.props.required ? <span className="text-red-500"> *</span> : <></>}</label>
        <input onChange={(e) => { this.props.change(e) }} value={this.props.value} className={"shadow transition duration-150 ease-in-out appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-md" + (this.props.warn && this.props.warn !== "" ? " border-red-500" : " border-gray-200")} type={this.props.type} placeholder={this.props.placeholder} id={this.props.id}>
          {this.props.children}
        </input>
        {this.props.warn && this.props.warn !== "" ? <p className="text-red-500 text-xs italic">{this.props.warn}</p> : <></>}
      </>
    );
  }
}

export default Input;

//({ name, type, placeholder, children, warn, id, required, change }) 