import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'reactstrap';
import Filters from './Filters.js'
import {fetchData} from "../helpers/fetch_data";
import {CATEGORYS_ENDPOINT, PRODUCTS_ENDPOINT} from "../helpers/endpoints";


export default class ProductGrid extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleForm: false,
            products: [],
            categories: [],
            doneLoading: false
        }
    }

    static childContextTypes = {
        clearFilters: PropTypes.func,
    };

    getChildContext(){
        return{
            clearFilters: this.handleClearFilters,
        }
    }

    getCategories(){
        const endpoint = CATEGORYS_ENDPOINT;
        const thisComp = this;
        fetchData(endpoint, thisComp, 'categories')
    }

    getProducts(endpoint){
        const thisComp = this;
        fetchData(endpoint, thisComp, 'products')
    }

    handleSelectedCategories = (categories_list) =>{
        if (categories_list){
            const endpoint = PRODUCTS_ENDPOINT + '?category='+ categories_list;
            console.log(endpoint);
            this.getProducts(endpoint)  
        }
    };

    handleToggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    };

    handleClearFilters = () => {
        const endpoint = PRODUCTS_ENDPOINT;
        this.setState({
            toggleForm: false
        });
        this.getProducts(endpoint)
    };

    componentDidMount(){
        const endpoint = PRODUCTS_ENDPOINT;
        this.getCategories();
        this.getProducts(endpoint);
        this.setState({
            doneLoading: true
        })
    }
    
    render(){
        const {categories} = this.state;
        if(this.state.toggleForm && categories.length > 0){
            return(
                <div>
                    <Button color='primary' onClick={this.handleToggleForm}>Close</Button>
                    <Filters 
                        categories={categories}
                        handleSelectedCategories={this.handleSelectedCategories}
                        handleClearFilters={this.handleClearFilters}
                        />
                </div>
            )
        } else {
            return(
                <div>
                    <Button 
                        color='primary'
                        onClick={this.handleToggleForm}
                        >Filters
                    </Button>

                    <ProductTable 
                        products={this.state.products}
                    />
                </div>
            )
        }
    }
}

class ProductTable extends React.Component{

    render(){
        const products = this.props.products;
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Value</th>
                        <th>#</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index)=>(
                        <ProductTableTr product={product} />
                    ))}
                </tbody>
            </Table>
        )
    }
}

class ProductTableTr extends React.Component{

    static PropTypes = {
        product: PropTypes.object
    };

    static contextTypes = {
        handleAddOrEditProduct: PropTypes.func
    };

    addProduct = () => {
        this.context.handleAddOrEditProduct(this.props.product.id)
    };

    render(){
        const {product} = this.props;
        return(
            <tr>
                <td>{product.id}</td>
                <td>{product.title}</td>
                <td>{product.tag_category}</td>
                <td>{product.tag_value}</td>
                <td><Button color="success" onClick={this.addProduct}>Add</Button></td>
            </tr>
        )
    }
}