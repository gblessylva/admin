import React, { Component } from 'react'

class Field extends Component {
  render() {
    return (
      <div className="form-control">
        <label htmlFor={this.props.name} >
          Your {this.props.name === "email" ? "Email" : 'Password'}
          </label>
        {
          <input
            id={this.props.name}
            type={this.props.type}
            placeholder={this.props.placeholder}
            required="required"
            data-validation-required-message="Please enter your name."
            name={this.props.name}
            onChange={this.props.onChange}
            onBlur={this.props.onBlur}

          />

        }

        <p className="help-block text-danger" >
          {
            this.props.errors && this.props.touched
            &&
            <span>
              {this.props.errors}
            </span>
          }

        </p>
      </div>
    )
  }
}

export default Field