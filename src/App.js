import React, { Component } from 'react';
import { Table, TableBody, TableRow, TableRowColumn,TableHeader,TableHeaderColumn } from 'material-ui/Table';
import $ from 'jquery';
import './App.css';



export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      contactList:[],
    }
  }

  componentDidMount(){
    const ContactList=this.fetchContactList();
    console.log(ContactList);

  }

  fetchContactList = () => {
    const contactList =   $.ajax({
        url:'https://books.zoho.com/api/v3/contacts',
        type:'GET',
        crossDomain:true,
        dataType:'json',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorization', 'e0004d01c7fa98354ecf7258d8e70672');
          xhr.setRequestHeader('content-type','application/json');
        },
        success:function(res){
          console.log(res);
          this.setState({contactList:res.contacts});
        }.bind(this),
        error:function(err){
          console.log(err);
        }
      });
    return contactList;
  }

  renderContactList = (contactList) => {
    if(contactList.length > 0){
      console.log("Hi");
      console.log(contactList);
      return (
        <Table className="table list-grid">
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
            <TableRow >
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Company Name</TableHeaderColumn>
              <TableHeaderColumn>Email</TableHeaderColumn>
              <TableHeaderColumn>Phone</TableHeaderColumn>
              <TableHeaderColumn>Recievables</TableHeaderColumn>
              <TableHeaderColumn>Payables</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>

           { contactList.map((contact) => {
             return (
               <TableRow key={contact.contact_id}>
                <TableRowColumn>{contact.first_name + ' ' + contact.last_name}</TableRowColumn>
                <TableRowColumn>{contact.company_name}</TableRowColumn>
                <TableRowColumn>{contact.email}</TableRowColumn>
                <TableRowColumn>{contact.mobile}</TableRowColumn>
                <TableRowColumn>{contact.outstanding_receivable_amount}</TableRowColumn>
                <TableRowColumn>{contact.outstanding_payable_amount}</TableRowColumn>
               </TableRow>
             )
            })
           }
          </TableBody>
        </Table>
      );
    }
  }
  render() {
    const contactList=this.state.contactList;
    return (
      <div>
        <h1>Contact List</h1>
        <div>
          {this.renderContactList(contactList)}
        </div>
      </div>
    );
  }
}
