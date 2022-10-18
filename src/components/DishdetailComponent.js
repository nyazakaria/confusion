import React, { Component } from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail  extends Component {
    constructor(props) {
        super(props);  
     }

     
     renderComments(comments) {

        if(comments != null ) {
           return ( comments.map( com => {
                let date = new Date(com.date)
                let formatedDate = new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium'}).format(date)
                return (
                    <ul key={com.id+com.author+com.date} className="list-unstyled">
                        <li className="text-left font-weight-normal">
                            <p>
                                {com.comment} <br/><br/>
                                <span>-- {com.author}, {formatedDate} </span>
                            </p>
                        </li>
                    </ul>
                )    
            }))
        } else {
            return (<div></div>)
        }
     }

    render() {
        return (   
            <div className="row">
                <Card className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    <CardImg width="100%" src={this.props.image} alt={this.props.name} />
                    <CardBody>
                        <CardTitle className="text-left font-weight-bold"> {this.props.name}</CardTitle>
                        <CardText>{this.props.description}</CardText>
                    </CardBody>
                </Card> 
                <div className=" col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 m-1">
                    <h4>Comments</h4> 
                    {this.renderComments(this.props.comments)}
                </div>
            </div>
        )
    }
}

export default DishDetail ;