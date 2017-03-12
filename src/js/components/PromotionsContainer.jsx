import React from 'react'

export default class PromotionsContainer extends React.Component {
    constructor(props) {
        super(props)


    }

    render() {
        return (
            <div className='col-md-8 well pcard'>
                <h3>Restaurant name</h3> 
                <hr />
                <h5> Promotion name </h5>
                <h6 className='text-muted'> Promotion description </h6>
                <h6 className='text-muted'> Active until blah </h6>
            </div>
        )
    }
}