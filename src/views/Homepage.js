import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect} from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap'
import MyNavbar from '../components/Navbar.js';
import TableCart from '../components/TableCard.js'
import {fetchData} from '../helpers/fetch_data.js'
import {TABLES_ENDPOINT, ORDERS_ENDPOINT} from '../helpers/endpoints.js';
import {lookupOptionsPOST} from "../helpers/fetch_data";


class Homepage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        tables: [],
        doneLoading: false,
        table: undefined,
        new_order: false,
        new_order_id:''
    }
  }

  getTables() {
      const thisComp = this;
      fetchData(TABLES_ENDPOINT, thisComp, 'tables', true);
  }

  updateTables = () => {
      this.getTables()
  };

  newOrder = (id) => {
      const thisComp = this;
      const data = {
          title: `Table ${id}`,
          table: id,
          active: true
      };
      fetch(ORDERS_ENDPOINT, lookupOptionsPOST(data)).then(
          function(response) {
              return response.json()
          }
          ).then(function(responseData){
              thisComp.setState({
                  new_order: true,
                  new_order_id: responseData.id
              })
          })
  };

  componentDidMount(){
      this.getTables();
      setInterval(this.updateTables, 10000);
  }

  render() {
      const doneLoading = this.state.doneLoading;
      const tables = this.state.tables;
      const {new_order} = this.state;
      if(new_order) {
          const new_url = `/order/${this.state.new_order_id}/`;
          return <Redirect to={new_url} />
      }
      return (
          <div>
              <MyNavbar/>
              <Container key={1}>
                  {doneLoading !== false ?
                      <MyContainer key={323} tables={tables} newOrder={this.newOrder} />
                      : <p>No data</p>
                  }
              </Container>
          </div>
      )
  }
}


class MyContainer extends React.Component{

    static propTypes = {
        tables: PropTypes.array
    };

    render() {
        const { tables } = this.props;

        return (
            <div>
                <Row>
                    <Col xs="12">
                        <Row><h4 className='header'>Title</h4></Row>
                        <Row>
                            { tables.map((table, index)=>(
                                <TableCart key={index} table={table} newOrder={this.props.newOrder} />
                            ))
                            }
                         </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default withRouter(Homepage);