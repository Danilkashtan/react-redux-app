import React from 'react'
import {connect, useSelector} from 'react-redux'
import {createPost, hideAlert, showAlert} from "../redux/actions";
import {WarningAlert} from "./WarningAlert";
class PostForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
    }
  }

  submitHandler = event => {
    event.preventDefault()
    const {title} = this.state
    if (!title.trim()) {
      return this.props.showAlert("Необходимо ввести заголовок!")
    }
    const newPost = {
      title, id: Date.now().toString()
    }
    console.log(newPost)
    this.props.createPost(newPost)
    this.setState({ title: ''})
    //this.props.hideAlert()
  }

  changeInputHandler = event => {
    event.persist()
    this.setState(prev => ({...prev, ...{
      [event.target.name]: event.target.value
    }}))
  }

  render() {
    return (
        <form onSubmit={this.submitHandler}>
          <div className="form-group">
            <label htmlFor="title">Заголовок поста</label>
            <input
                type="text"
                className="form-control"
                id="title"
                value={this.state.title}
                name="title"
                onChange={this.changeInputHandler}
            />
            {this.props.alert && <WarningAlert text={this.props.alert}/>}
          </div>
          <button className="btn btn-success" type="submit">Создать</button>
        </form>
    )
  }
}

const mapDispatchToProps = {
  createPost, showAlert, hideAlert
}

const mapStateToProps = state => ({
  alert: state.app.alert
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)