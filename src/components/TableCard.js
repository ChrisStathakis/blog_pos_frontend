import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Col, Card, CardTitle, CardText, Button } from 'reactstrap'

export default class TableCard extends React.Component{

    static propTypes = {
        table: PropTypes.object
    };

    handleNewOrder = () => {
        this.props.newOrder(this.props.table.id)
    };


    render() {
        const {table} = this.props;
        return (
            <Col xs="6" sm="6">
                <Card>
                    <CardTitle>{table.title}</CardTitle>
                    <CardText>Total value... {table.tag_value}</CardText>
                    {table.is_free ?
                     <Button onClick={this.handleNewOrder} color='success'>New Order </Button>
                     : <Link to={{
                         pathname: `/order/${table.active_order_id}/`
                        }}><Button color='info'>Details {table.active_order_id} </Button>
                        </Link>
                    }
                </Card>
                <br />
            </Col>
        )
    }

}

