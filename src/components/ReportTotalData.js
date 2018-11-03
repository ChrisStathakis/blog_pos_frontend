import React from 'react';
import Filters from "./Filters";
import {Button} from 'reactstrap';


export default class ReportTotalData extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            toggleForm: false
        }
    }

    handleToggleForm = (e) => {
        e.preventDefault();
        this.setState({
            toggleForm: !this.state.toggleForm
        })
    };

    handleSelectedCategories = (selected_categories) => {
        this.props.handleSelectedCategories(selected_categories);
        this.props.updateReport(selected_categories)
    };

    render(){
        if (this.state.toggleForm) {
            return (
                <div>
                    <h4>Filters</h4>
                    <Button onClick={this.handleToggleForm} color='primary'>Close</Button>
                    <Filters
                        categories={this.props.categories}
                        handleSelectedCategories={this.handleSelectedCategories}
                    />
                </div>
            )
        } else {
            return(
                <div>
                    <h4>Total Orders</h4>
                    <Button color='primary' onClick={this.handleToggleForm}>Filters</Button>
                    <h4>Total Incomes {this.props.reports.total}</h4>
                    <h4>Average Incomes  {this.props.reports.avg}</h4>
                </div>
            )
        }
    }

}