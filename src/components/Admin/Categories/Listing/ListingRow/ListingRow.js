import React from 'react';
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Modal, Button, Form } from 'react-bootstrap';
import { MyContext } from '../../../../../App'

class ListingRow extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            show: false,
            id:-1,
            newcategory:this.props.R.name,
            error:''
        
        };
    }
    handleDelete = (value) => (e) => {
    
       value.deleteCategory(this.props.R.id); 
      }
    handleClose() {
        this.setState({ show: false });
    }
    handleShow(){
      this.setState({ show: true });
    }
    handleChange = (e) => {
   
        const value = e.target.value;
        this.setState({ newcategory: value, error: '' });
      }
    handleEdit=(value)=>(e)=>{
        if (!this.state.newcategory==='') {
            this.setState({ newcategory: this.props.R.name, show: true
               , error: 'category can not be null' });
               return;
            }
        
          else if (!isNaN(this.state.newcategory)) {
            this.setState({ newcategory: this.props.R.name, show: true,error: 'category can not be number' })
            return;
          }
          else if (!value.searchCategory(this.state.newcategory)) {
            this.setState({ newcategory: this.props.R.name,error: 'category already exsist', show: true })
            return;
          }
          else{
          value.editCategory(e.target.dataset.id,this.state.newcategory);
          this.setState({ show: false });}
      }

    render() {
        
        return (
            <MyContext.Consumer>
            {value => (
                <tr>
                <td>{this.props.R.id}</td>
                <td>{this.props.R.name}</td>
                <td>
                  
             <FontAwesomeIcon icon={faEdit} onClick={this.handleShow}  className="icon mr-3" />
                   <span onClick={this.handleDelete(value)}> <FontAwesomeIcon icon={faTrash} className="icon"  /></span>
                   
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Category</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                <h3>{this.state.error}</h3>
                                    <Form.Control  onChange={this.handleChange} value={this.state.newcategory} type="text" placeholder="enter new name"/>
                                   
                                </Form.Group>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Cancel
                              </Button>
                                    <Button variant="success" data-id={this.props.R.id} onClick={this.handleEdit(value)}>
                                        Edit Name
                              </Button>
                                </Modal.Footer>
                            </Form>
                        </Modal.Body>
                    </Modal>
                </td>
                </tr>
    )}
     </MyContext.Consumer>
     )
            }}
export default ListingRow;