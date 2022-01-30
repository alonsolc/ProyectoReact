import React from "react";
import DataTable from "react-data-table-component";
import serviceMainUsers from "../services/serviceMainUsers";
import { Modal, Button, Form } from 'react-bootstrap';
import AlertAction from '../components/AlertAction';
import 'font-awesome/css/font-awesome.css';

class MainUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUsers: [],
            id_user: '',
            averageAges: '',
            dataFormUser: {
                name: '',
                last_name: '',
                birthdate: ''
            },
            modalUser: {
                open: false,
                type: '',
            },
            message: {
                text: null,
                type: null,
                show: false,
            },
            messageModal: {
                text: null,
                type: null,
                show: false,
            },
            errorUser: {
                name: '',
                last_name: '',
                birthdate: '',
            }
        };
    }

    componentDidMount() {
        this.listUsers();
        this.averageAges();
    }

    listUsers = () => {
        serviceMainUsers.listUsers()
            .then(res => {
                this.setState({ dataUsers: res.data.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    averageAges = () => {
        serviceMainUsers.averageAges()
            .then(res => {
                console.log("res", res);
                this.setState({ averageAges: res.data.data.average });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    saveUser = (id) => {
        if (id) {
            serviceMainUsers.updateUser(id, this.state.dataFormUser)
                .then((res) => {
                    this.setState({ modalUser: { open: false }, message: { text: 'User updated successfully.', type: 'success' } });
                    this.listUsers();
                    this.averageAges();
                })
                .catch((err) => {
                    this.setState({ messageModal: { text: 'Error updating user.', type: 'danger', show: true } });
                    console.log('err', err.response);
                });
        } else {
            serviceMainUsers.createUser(this.state.dataFormUser)
                .then((res) => {
                    this.setState({ modalUser: { open: false }, message: { text: 'User created successfully.', type: 'success' } });
                    this.clearFormUser();
                    this.listUsers();
                    this.averageAges();
                })
                .catch((err) => {
                    this.setState({ messageModal: { text: 'Error creating user.', type: 'danger', show: true } });
                    console.log('err', err.response);
                });
        }
        setTimeout(() => {
            this.setState({ message: { text: null, type: null, show: false } });
        }, 1500);
    }

    openUserModal = (action) => {
        //this.clearErrors();
        if (action === 'Add') {
            this.setState({ modalUser: { open: true, type: 'Add' }, id_user: '', messageModal: { text: null, type: null, show: false, } });
            this.clearFormUser();
        } else {
            serviceMainUsers.getUser(action)
                .then((res) => {
                    console.log("res.data.data", res.data.data);
                    this.setState({ modalUser: { open: true, type: 'Edit' }, messageModal: { text: null, type: null, show: false, } });
                    this.setState({
                        dataFormUser: {
                            name: res.data.data.name || '',
                            last_name: res.data.data.last_name || '',
                            birthdate: res.data.data.birthdate || '',
                        }, id_user: res.data.data.id_user
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    closeUserModal = () => {
        this.setState({ modalUser: { open: false, type: '' } });
    }

    handleChange = e => {
        this.setState({
            dataFormUser: {
                ...this.state.dataFormUser,
                [e.target.name]: e.target.value,
            },
            errorUser: {
                ...this.state.errorUser,
                [e.target.name]: ''
            }
        });
    }

    clearFormUser = () => {
        this.setState({
            dataFormUser: {
                name: '',
                last_name: '',
                birthdate: ''
            }
        });
    }

    render() {
        let AlertContainer;

        AlertContainer = <AlertAction show={this.state.message.show} variant={this.state.message.type} message={this.state.message.text} />;

        const columns = [
            {
                name: 'Id',
                selector: row => row.id_user,
                omit: false,
                wrap: true
            },
            {
                name: 'Name',
                selector: row => row.name,
                sortable: true,
                wrap: true
            },
            {
                name: 'LastName',
                selector: row => row.last_name,
                sortable: true,
                wrap: true
            },
            {
                name: 'Birthdate',
                selector: row => row.birthdate,
                sortable: true,
                wrap: true
            },
            {
                name: 'Age',
                selector: row => row.age,
                sortable: true,
                wrap: true
            },
            {
                name: 'Creation date',
                selector: row => row.creation_date,
                sortable: true,
                wrap: true
            },
            {
                name: "Options",
                cell: (row) => {
                    const rowId = row.id_user;
                    return (
                        <div className="btn-group btn-group-sm" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-primary"
                                onClick={() => this.openUserModal(rowId)} title="Edit">
                                <i className="fa fa-edit"></i>
                            </button>
                        </div>
                    );
                },
                ignoreRowClick: true,
                allowOverflow: true,
                button: true,
                wrap: true
            }
        ];

        return (
            <React.Fragment>
                <Modal show={this.state.modalUser.open} scrollable={true}>
                    <Modal.Header>
                        <div className="row">
                            <div className="col-12">
                                <Modal.Title>{this.state.modalUser.type}: {this.state.dataFormUser.name} {this.state.dataFormUser.last_name}</Modal.Title>
                            </div>
                            <div className="col-12">
                                <AlertAction show={this.state.messageModal.show} variant={this.state.messageModal.type} message={this.state.messageModal.text} />
                            </div>
                        </div>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" name="name" onChange={this.handleChange} value={this.state.dataFormUser.name} />
                                <div className="text-danger" hidden={!this.state.errorUser.name}>* {this.state.errorUser.name}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="last_name" onChange={this.handleChange} value={this.state.dataFormUser.last_name} />
                                <div className="text-danger" hidden={!this.state.errorUser.last_name}>* {this.state.errorUser.last_name}</div>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Birthdate</Form.Label>
                                <Form.Control type="date" name="birthdate" onChange={this.handleChange} value={this.state.dataFormUser.birthdate} />
                                <div className="text-danger" hidden={!this.state.errorUser.birthdate}>* {this.state.errorUser.birthdate}</div>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeUserModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => this.saveUser(this.state.id_user)}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
                <br></br>
                <div className="row">
                    <div className="col-12">
                        {AlertContainer}
                    </div>
                    <div className="col-6">
                        <h4>Average ages: {this.state.averageAges}</h4>
                    </div>
                    <div className="col-6">
                        <Button variant="success" onClick={() => this.openUserModal('Add')} style={{ float: "right" }}>Add user</Button>
                    </div>
                </div>
                <br></br>
                <DataTable
                    responsive={true}
                    columns={columns}
                    data={this.state.dataUsers}
                    striped
                    fixedHeader={true}
                    fixedHeaderScrollHeight={'400px'}
                    highlightOnHover
                />
            </React.Fragment>
        );
    }
}

export default MainUsers; 