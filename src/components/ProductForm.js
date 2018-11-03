import React from 'react';

export default class ProductForm extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: this.props.title|| 'Create New Product',
            fields:{
                title: '',
                category: '',
                value: 0,
                active: true
            },
            fieldErrors: []
        }
    }

    validate = (product) => {
        const errors = {};
        if (!product.title) errors.title = 'Title Required';
        if (!product.category) errors.category = 'Category Required';
        if (product.value < 0.1) errors.value = 'Need correct value';
        return errors
    }

    onChangeInput = (e) =>{
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            fields:{
                [name]: value
            }
        })
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        const product = this.state.fields;
        const fieldErrors = this.validate(product);
        this.setState({fieldErrors});
        if (Object.keys(fieldErrors).length) return ;
        this.setState({
            fields:{
                name: '',
                category: '',
                value: 10
            }
        })
        
    }

    render(){

        return (
            <div>
                <h4>Create Product</h4>
                <form className='form'>
                    <div className='form-group'>
                        <label>Title</label>
                        <input
                            type='text'
                            className='form-control'
                            name='title'
                            value={this.state.fields.title}
                            onChange={this.onChangeInput}
                        />
                        <span style={{ color:'red' }}>{this.state.fieldErrors.title}</span> 
                    </div>
                    <div className='form-group'>
                        <label>category</label>
                        <input
                            type='text'
                            className='form-control'
                            name='Category'
                            value={this.state.fields.category}
                            onChange={this.onChangeInput}
                        />
                        <span style={{ color:'red' }}>{this.state.fieldErrors.category}</span> 
                    </div>
                    <div className='form-group'>
                        <label>Value</label>
                        <input
                            type='number'
                            className='form-control'
                            name='value'
                            value={this.state.fields.value}
                        />
                        <span style={{ color:'red' }}>{this.state.fieldErrors.value}</span> 
                    </div>
                    <div className='form-group'>
                        <label>Status</label>
                        <input
                            type='checkbox'
                            className='form-control'
                            name='active'
                            value={this.state.fields.active}
                        />
                    </div>
                    <button onClick={this.onFormSubmit} className='btn btn-primary'>Save</button>
                </form>
            </div>
        )
    }
}


