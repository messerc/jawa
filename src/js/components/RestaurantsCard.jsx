import React from 'react'

export default class RestaurantsCard extends React.Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div className='well pcard' onClick={(e) => this.props.handleClick(e)} >
            <div className='row'>
                <div className='col-xs-4'>
                    <img src='https://media-cdn.tripadvisor.com/media/photo-s/05/49/6b/df/le-grill-restaurant-and.jpg'
                    width={'100%'}
                    height={'100%'} />
                </div>
                <div className='col-xs-8'>
                <h3>Restaurant name</h3>
                <hr />
                <h5> Promotion name </h5>
                <h6 className='text-muted'> Promotion description </h6>
                <h6 className='text-muted'> Active until blah </h6>
                </div>
            </div>
            </div>
        )
    }

}