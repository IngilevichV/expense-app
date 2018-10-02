import React from 'react';
import {Button} from 'react-bootstrap';
import Modal from 'react-modal';
import axios from 'axios';
import {Link} from 'react-router-dom';

var querystring = require('querystring');

class Add extends React.Component {
    constructor() {
        super();
        this.state = {
            description: '',
            amount: '',
            month: '',
            year: '',
            messageFromServer: '',
            modalIsOpen: false
        }

        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.insertNewExpense = this.insertNewExpense.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    };

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    onClick(e) {
        this.insertNewExpense(this);
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            description: '',
            amount: '',
            month: 'Jan',
            year: 2016,
            messageFromServer: ''
        });
    }

    componentDidMount() {
        this.setState({
            month: this.props.selectedMonth
        });
        this.setState({
            year: this.props.selectedYear
        });
    }

    handleSelectChange(e) {
        if (e.target.name === 'month') {
            this.setState({
                month: e.target.value
            });
        }
        if (e.target.name === 'year') {
            this.setState({
                year: e.target.value
            });
        }
    }


    handleTextChange(e) {
        if (e.target.name === "description") {
            this.setState({
                description: e.target.value
            });
        }
        if (e.target.name === "amount") {
            this.setState({
                amount: e.target.value
            });
        }
    }

    insertNewExpense(e) {
        axios.post('/insert',
            querystring.stringify({
                desc: e.state.description,
                amount: e.state.amount,
                month: e.state.month,
                year: e.state.year
            }), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then(function(response) {
                e.setState({
                    messageFromServer: response.data
                });
            });
    }

    render() {
        if(this.state.messageFromServer === '') {
            return(
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-plus"></span></Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                        className="Modal">
                        <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
                        </Link><br/>
                        <fieldset>
                            <label htmlFor="description">Описание:</label>
                            <input type="text" id="description"
                                name="description"
                                value={this.state.description}
                                onChange={this.handleTextChange}>
                            </input>
                            <label htmlFor="amount">Сумма:</label>
                            <input type="number" id="amount" name="amount"
                                  value={this.state.amount}
                                  onChange={this.handleTextChange}>
                            </input>

                            {/*TODO: сделать через массив*/}
                            <label htmlFor="month">Месяц:</label>
                            <select id="month" name="month" value={this.state.month} onChange={this.handleSelectChange}>
                                <option value="Jan" id="Jan">Январь</option>
                                <option value="Feb" id="Feb">Февраль</option>
                                <option value="Mar" id="Mar">Март</option>
                                <option value="Apr" id="Apr">Апрель</option>
                                <option value="May" id="May">Май</option>
                                <option value="Jun" id="Jun">Июнь</option>
                                <option value="Jul" id="Jul">Июль</option>
                                <option value="Aug" id="Aug">Август</option>
                                <option value="Sep" id="Sep">Сентябрь</option>
                                <option value="Oct" id="Oct">Октябрь</option>
                                <option value="Nov" id="Nov">Ноябрь</option>
                                <option value="Dec" id="Dec">Декабрь</option>
                            </select>

                            <label htmlFor="year">Год:</label>
                            <select id="year" name="year" value={this.state.year} onChange={this.handleSelectChange}>
                                <option value="2016" id="16">2016</option>
                                <option value="2017" id="17">2017</option>
                                <option value="2018" id="18">2018</option>
                                <option value="2019" id="19">2019</option>
                                <option value="2020" id="20">2020</option>
                            </select>
                        </fieldset>
                        <div className='button-center'>
                            <br/>
                            <Button bsStyle="success" bsSize="small" onClick={this.onClick}>Новые расходы</Button>
                        </div>
                    </Modal>
                </div>
            )
        } else {
            return (
                <div>
                    <Button bsStyle="success" bsSize="small" onClick={this.openModal}>
                        <span className="glyphicon glyphicon-plus"/>
                    </Button>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Add Expense"
                        className="Modal">
                        <div className='button-center'>
                            <h3>{this.state.messageFromServer}</h3>
                            <Link to={{pathname: '/', search: '' }} style={{ textDecoration: 'none' }}>
                                <Button bsStyle="success" bsSize="mini" onClick={this.closeModal}>Закрыть</Button>
                            </Link>
                        </div>
                    </Modal>
                </div>
            )
        }
    }

}

export default Add;