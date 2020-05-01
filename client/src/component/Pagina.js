import React, { Component } from 'react';
import {Pagination} from 'react-bootstrap';
import {Link} from 'react-router-dom'
class Pagina extends Component {
    render() {
        let {active, pages} = this.props;
        let start=(Math.ceil(active/5)-1)*5+1;
        let end= start+4;
        if (end>pages){
            end= pages;
        }
        let items = [];
        for (let number = start; number <= end; number++) {
            let className="pag-link";
            if(number ===active){
                className+=" pagi-active";
            }
            items.push(
                <Pagination.Item key={number}>
                <Link className={className} to={`/users/${number}`}>{number}</Link>
                </Pagination.Item>
            );
        }
        let className="pag-link";
        let className2="pag-link";
        if (start==1){
            className+=" disabled";
        }
        if (end==pages){
            className2+=" disabled";
        }
        return (
            <div>
                <Pagination>
                    <Link className={className} to={`/users/1`}>‹‹</Link>
                    <Link className={className} to={`/users/${start-1}`}>‹</Link>
                    {items}
                    <Link className={className2} to={`/users/${start+5}`}>›</Link>
                    <Link className={className2} to={`/users/${pages}`}>››</Link>
                </Pagination>
            </div>
        );
    }
}

export default Pagina;