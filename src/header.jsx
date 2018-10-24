import React from 'react';

import { Glyphicon } from 'react-bootstrap';
import './sass/main.css';

export class Header extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <Glyphicon glyph="star" />
                    Hello React
                </div>
            </div>

        );
    }
}

/*
export default class Header extends React.Component {
    render () {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h1>Some sort of Reddit client</h1>
                </div>
            </div>
        )
    }
}*/