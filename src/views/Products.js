import React from 'react';
import MyNavbar from '../components/Navbar.js';
import { Row, Col } from 'reactstrap';
import ProductTable from '../components/ProductTable.js'
import ProductForm from  '../components/ProductForm.js';
import {PRODUCTS_ENDPOINT, CATEGORYS_ENDPOINT} from "../helpers/endpoints";
import {fetchData} from "../helpers/fetch_data";


class Products extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    getProducts() {
        const endpoint = PRODUCTS_ENDPOINT;
        const thisComp = this;
        let lookUpOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }   
        };
        fetch(endpoint, lookUpOptions).then(
            function(response){
                return response.json()
            }
        ).then(
            function(responseData){
                thisComp.setState({
                    products: responseData,
                    doneLoading: true
                })
            }
        )
    }

    getCategories(){
        const endpoint = CATEGORYS_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories');
    }
    
    componentDidMount(){
        this.getCategories();
        this.getProducts()
    }

    render() {
        const {products} = this.state;
        const {doneLoading} = this.state;
        return (
            <div>
                <MyNavbar/>
                <Row>
                    <Col xs='8'>
                        <h4>Product List</h4>
                        {doneLoading ? <ProductTable products={products} />:<p>No data</p>}
                    </Col>
                    <Col xs='4'>
                        <ProductForm />
                    </Col>
                </Row>
          </div>
        )
    }
}

export default Products;