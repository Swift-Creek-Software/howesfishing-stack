import React, { PureComponent } from 'react'
import { Field, reduxForm, SubmissionError } from 'redux-form';
import { connect } from 'react-redux'

import { userLogin } from '../actions/UserActions'

import TextField from './Common/TextField'
import FormHeader from './Common/FormHeader'

class LoginForm extends PureComponent {
  onFormSubmit = (values) => {
    return this.props.userLogin(values.email, values.password).catch(() => {
      throw new SubmissionError({ _error: 'username/password are incorrect' })
    })
  }

  render() {
    const { handleSubmit, error } = this.props

    return (
      <form className="panel panel-primary" onSubmit={handleSubmit(this.onFormSubmit)}>
        <FormHeader>Login</FormHeader>
        <div className="panel-body">
          <Field name="email"
                 component={TextField}
                 label="Email"
                 placeholder="Enter Email"
                 type="email"
                 id="email"
          />
          <Field name="password"
                 component={TextField}
                 label="Password"
                 placeholder="Enter Password"
                 type="password"
                 id={"password"}
          />
          {error &&
          <p style={{ color: 'red' }}>{error}</p>
          }
          <button type="submit" className="btn btn-primary">Login</button>
        </div>
      </form>
    )
  }
}


LoginForm = reduxForm({
  form: 'login' // a unique name for this form
})(LoginForm)

LoginForm = connect(null, {
  userLogin
})(LoginForm)

export default LoginForm