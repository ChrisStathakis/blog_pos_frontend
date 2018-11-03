const HOST = 'http://127.0.0.1:8000';

const TABLES_ENDPOINT = HOST + '/api/table-list/';
const ORDERS_ENDPOINT = HOST + '/api/order-list/';
const PRODUCTS_ENDPOINT = HOST + '/api/product-list/';
const ORDER_ITEMS_ENDPOINT = HOST + '/api/order-item-list';
const ORDER_ITEM_ENDPOINT = HOST + '/api/order-item-detail/';
const ORDER_ENDPOINT = HOST + '/api/order-detail/';
const CATEGORYS_ENDPOINT = HOST + '/api/category-list/';
const ORDER_REPORT_ENDPOINT = HOST + '/api/orders/reports/';
const TABLE_DETAIL_ENDPOINT = HOST + '/api/order-item-detail';



export {TABLES_ENDPOINT, ORDERS_ENDPOINT, PRODUCTS_ENDPOINT,
        ORDER_ITEMS_ENDPOINT, ORDER_ENDPOINT, CATEGORYS_ENDPOINT,
        TABLE_DETAIL_ENDPOINT, ORDER_REPORT_ENDPOINT, ORDER_ITEM_ENDPOINT
        }