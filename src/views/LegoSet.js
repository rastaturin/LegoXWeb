import React, { Component } from 'react';
import { Card } from 'reactstrap';
import useSheet from 'react-jss';
import '../styles/LegoSet.css';
import classnames from 'classnames';

export default  class LegoSet extends Component {
    render() {
        const {classes, children} = this.props;
        return (
            <Card className={classnames('col-sm-6 col-md-6 col-lg-4', 'legoCard')}>
                <img src={this.props.set.img}  className={'card-img-top'}/>
                <div className="card-body">
                    <h4 className="card-title">{this.props.set.name}</h4>
                    <p>{this.props.set.theme_name.name} ({this.props.set.year})</p>
                    <p>ID: {this.props.set.key}</p>
                    <p><a href={'/set/' + this.props.set.key}>Sales: {this.props.set.sales} from ${this.props.set.min}</a></p>
                </div>
            </Card>
        )
    }
}