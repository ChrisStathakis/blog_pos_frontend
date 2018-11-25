import React from 'react';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup } from 'reactstrap';


class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: this.props.categories||[],
            selected_categories: ''
        }
    }


    static propTypes = {
        categories: PropTypes.array.isRequired,
        clearFilters: PropTypes.func.isRequired,
        handleSelectedCategories: PropTypes.func.isRequired
    };

    handleClear = () => {
        this.setState({
            selected_categories: ''
        });
        this.props.clearFilters()

    };

    handleSelectedCategories = (id) => {
        this.setState({
            selected_categories: id
        });
        this.props.handleSelectedCategories(id);
        console.log(this.state);
    };

    render() {
        const categories = this.state.categories;
        return (
            <Form>
                {categories.map((category, index)=>(
                    <CheckBoxComponent
                        field={category}
                        handleSelectedCategories={this.handleSelectedCategories}
                        checked={category.id === this.state.selected_categories ? true: false}
                    />
                ))}
                <Button onClick={this.handleClear} color='danger'>Clear Filters</Button>
            </Form>
        )
    }
}

class CheckBoxComponent extends React.Component{

    state = {
        field: this.props.field||''
    };

    static propTypes = {
        handleSelectedCategories: PropTypes.func,
        field: PropTypes.object,
        checked: PropTypes.bool
    };

    handleChange = (e) => {
        this.props.handleSelectedCategories(this.state.field.id)
    };

    render(){
        const {field} = this.state;
        return(
            <FormGroup check>
                <label>{field.title}</label>
                <input 
                    type='radio'
                    className='form-control' 
                    checked={this.props.checked}
                    onClick={this.handleChange}
                 />
            </FormGroup>
        )
    }

}

export default Filters;