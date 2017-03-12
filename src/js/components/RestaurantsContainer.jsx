import React from 'react'
import RestaurantsCard from './RestaurantsCard.jsx'

export default class RestaurantsContainer extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
        this.state = {
            whatisthis: null
        }
    }

    handleClick(e) {
        this.setState({
            whatisthis: e
        })
    }

    render() {
        console.log(this.state)
        return (
        <div className='col-md-10 col-md-offset-1'>
            <RestaurantsCard handleClick={this.handleClick} />
            <RestaurantsCard handleClick={this.handleClick} />
            <RestaurantsCard handleClick={this.handleClick} />
            <RestaurantsCard handleClick={this.handleClick} />
        </div>
        )
    }
}