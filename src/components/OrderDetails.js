import React from 'react';
import PropTypes from 'prop-types'
import { Table,  Card, CardHeader,
    CardTitle, CardText, Button } from 'reactstrap'

export default class OrderDetails extends React.Component{


    static PropTypes = {
        handleTableActions: PropTypes.func,
        handleBack: PropTypes.func,
        order_items: PropTypes.array,
        order_data: PropTypes.object,
        changeQty: PropTypes.func.isRequired
    };

    handleCloseTable = () => {
        this.props.handleTableActions('CLOSE')
    };
    handleBack = () => {
        this.props.handleTableActions('BACK')
    };

    changeQty = (action, item_id) => {
        this.props.changeQty(action, item_id)
    }

    render() {
        const { order_items } = this.props;
        const { order_data} = this.props;
        return (
            <div>
                <Card>
                    <CardHeader>Table {order_data.tag_table}</CardHeader>
                    <CardTitle>Notes.. {order_data.title}</CardTitle>
                    <CardText>Value.. {order_data.tag_value}</CardText>
                    <button>{order_data.tag_status}</button>
                    <h4 className='header'>Order Items</h4>
                   
                    <Table>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Qty</th>
                                <th>Value</th>
                                <th>Total Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {order_items.map((item, index)=>(
                            <OrderItem 
                                item={item} 
                                changeQty={this.changeQty}
                            />
                        ))}
                        </tbody>
                    </Table>
                    <Button color='warning' onClick={this.handleBack}>Back </Button>
                </Card>
                <Card>
                    <CardHeader>Actions</CardHeader>
                    <CardTitle>
                        <Button color='danger' onClick={this.handleCloseTable}>Close Table</Button>
    
                    </CardTitle>
                </Card>

            </div>
        )
    }
}

class OrderItem extends React.Component {

    static propTypes = {
        changeQty: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired
    }

    addQty = () => {
       this.props.changeQty('ADD', this.props.item.id)
    };

    removeQty = () => {
        this.props.changeQty('REMOVE', this.props.item.id)
    };

    handleDeleteItem = () => {
        this.props.changeQty('DELETE', this.props.item.id)
    };


    render(){
        const item = this.props.item;
        return (
            <tr>
                <td>{item.tag_product_related}</td>
                <td>{item.qty}</td>
                <td>{item.tag_value}</td>
                <td>{item.tag_total_value}</td>
                <td>
                    <button onClick={this.addQty} className="btn btn-success">
                        <i className="fa fa-angle-up" />
                    </button>
                    <button onClick={this.removeQty} className="btn btn-warning">
                        <i className="fa fa-angle-down" />
                    </button>
                    <button onClick={this.handleDeleteItem} className="btn btn-danger">
                        <i className="fa fa-trash-alt" />
                    </button>
                </td>
            </tr>
        )
    }

}