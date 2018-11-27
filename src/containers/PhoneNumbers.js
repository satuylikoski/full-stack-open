import React, { Component, Fragment } from 'react';

import personService from '../services/persons';

import Button from '../common/Button';
import Input from '../common/Input';
import People from '../components/People';
import Notification from '../components/Notification';

class PhoneNumbers extends Component {
  constructor(props) {
    super(props)
    this.state = {
      personsList: [],
      newName: '',
      newNumber: '',
      filter: '',
      showAll: true,
      notification: {
        on: false,
        type: null,
        name: '',
      }
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({ personsList: response })
      });
  }

  componentDidUpdate() {
    if (this.state.notification.on) {
      setTimeout(() => {
        this.setState({ notification: { on: false }})
      }, 5000)
    }
  }

  handleAdd = (e) => {
    e.preventDefault();

    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    };

    const exists = this.state.personsList.find(person => person.name === this.state.newName);

    if (!!exists && window.confirm(
      `Confirm that ${personObject.name} will update phone number from ${exists.number} to ${personObject.number}?`
      )) {
        personService
        .update(exists.id, personObject)
        .then(response => 
          this.setState({
            notification: {
              on: true,
              name: response.name,
              type: 'update'
            }
          }))
        .catch(error => 
          this.setState({
            notification: {
              on: true,
              name: error.name,
              type: 'error'
            }})); 
    } else {    
      personService
        .create(personObject)
        .then(response => {
          this.setState({ 
            personsList: this.state.personsList.concat(response),
            notification: {
              on: true,
              name: response.name,
              type: 'create'
            },
          })
        })
    }

    this.setState({ newName: '', newNumber: ''});
  }

  handleNameChange = (e) => {
    this.setState({ newName: e.target.value })
  }

  handleNumberChange = (e) => {
    this.setState({ newNumber: e.target.value })
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  handleRajaus = (e) => {
    this.setState({ filter: e.target.value })
  }

  toggleDelete = (id, name) => {
    return () => {
  
    personService
      .deleteThis(id)
      .then(
        this.setState({ 
          personsList: this.state.personsList.filter(p => p.id !== id ),
          notification: {
            on: true,
            name: name,
            type: 'delete'
          }
        })
      )
  } 
  }

  toggleImportance = (id) => {
    return () => {
      console.log(`importance of ${id} needs to be toggled`)
      const person = this.state.personsList.find(person => person.id === id)
      const changedInfo = { ...person, important: !person.important }

      personService
      .update(id, changedInfo)
      .then(person => {
        this.setState({
          personsList: this.state.personsList.map(person => person.id !== id ?
            person : changedInfo)
        })
      })
      .catch(error => {
        alert(`nimen '${person.name}' tiedot on jo poistettu`)
        this.setState({ personsList: this.state.personsList.filter(p => p.id !== id )})
      })
    }
  }

  render() {
    const peopleToShow =
    this.state.showAll ?
      this.state.personsList :
      this.state.personsList.filter(person => person.number !== '')

  const label = this.state.showAll ? "Showing All" : "Hiding empty numbers";
    return (
      <Fragment>
        {this.state.notification.on &&
          <Notification name={this.state.notification.name} type={this.state.notification.type} />
        }
        <h3>Create or edit</h3>
        <form onSubmit={this.handleAdd}>
          <Input
              value={this.state.newName}
              onChange={this.handleNameChange}
              placeholder="Name"
          />
          <Input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
              placeholder="Number"
          />
          <Button type="submit">Add/Update</Button>
        </form>
        <h3>Numbers</h3>
        <p style={{ display: 'inline-block', marginRight: '8px' }}>Restrict phone numbers:</p>
        <Button onClick={this.toggleVisible}>{label}</Button>
        <People 
          personsList={peopleToShow}
          toggleDelete={this.toggleDelete}
          toggleImportance={this.toggleImportance}
        />
      </Fragment>
    );
  }
}

export default PhoneNumbers;