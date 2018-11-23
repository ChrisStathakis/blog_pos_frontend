import React from 'react';
import {withRouter} from 'react-router-dom';
import {Container, Row, Col} from 'reactstrap';
import MyNavbar from '../components/Navbar.js';
import ProductGrid from '../components/ProductTable.js'
import OrderDetails from '../components/OrderDetails.js'
import {fetchData, postQtyChange, putData, addOrEditProduct } from '../helpers/fetch_data.js'
import {ORDER_ITEMS_ENDPOINT, ORDER_ENDPOINT} from '../helpers/endpoints.js'


class Order extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selected_categories: [],
            order_data: '',
            order_items:[],
            order_id: '',
            doneLoading: false
        }
    }

    getOrderItems(id){
        const endpoint = ORDER_ITEMS_ENDPOINT + '?order_related=' + id;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_items', true)
    }

    getOrder(id){
        const endpoint = ORDER_ENDPOINT + id + '/';
        const thisComp = this;
        fetchData(endpoint, thisComp, 'order_data', false);
    }

    changeQty = (action, item_id) => {
        postQtyChange(action, item_id, this);
    };

    handleAddOrEditProduct = (product_id) => {
        addOrEditProduct(this.state.order_data.id, product_id, this);
    };

    handleTableActions = (action) => {
        const thisComp = this;
        switch (action){
            case 'CLOSE':
                const order = this.state.order_data;
                let data = {
                    id: order.id,
                    title: order.title,
                    table: order.table,
                    active: false,
                };
                const endpoint = ORDER_ENDPOINT + order.id + '/';
                const lookupOptions = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(data)
                }
                fetch(endpoint, lookupOptions)
                .then(resp => resp.json())
                .then(repsData => {
                    thisComp.props.history.push('/')
                })
                break;
            default:
                thisComp.props.history.push('/')
        }
    };

    componentDidMount(){
        const {id} = this.props.match.params;
        this.getOrder(id) ;
        this.getOrderItems(id);
    }

    render() {
        const doneLoading = this.state.doneLoading;
        return(
            <div>
                <MyNavbar />
                <Container>
                    {this.state.doneLoading ?
                        <Row>
                            <Col xs="6" sm="12">
                                <h4 className='header'>Products</h4>
                                {doneLoading ?
                                    <ProductGrid
                                        handleSelectedCategories={this.handleSelectedCategories}
                                        handleAddOrEditProduct={this.handleAddOrEditProduct}
                                    />
                                : <p>No data</p>
                                }
                                
                            </Col>
                            <Col xs="6" sm="12">
                                <h4 className='header'> Order Details </h4>
                                <br />
                                {doneLoading ?
                                    <OrderDetails
                                        order_data={this.state.order_data}
                                        order_items={this.state.order_items}
                                        handleTableActions={this.handleTableActions}
                                        changeQty={this.changeQty}
                                    />
                                    :
                                    <p>No Data</p>
                                }
                            </Col>
                        </Row>
                        :
                        <Col xs={12}><p>No data</p></Col>
                    }
                </Container>
            </div>
        )
    }

}

export default withRouter(Order);