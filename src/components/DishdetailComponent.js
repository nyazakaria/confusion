import React, { Component } from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'

class DishDetail  extends Component {
    constructor(props) {
        super(props);  
     }

     
     renderComments(comments) {
        if(comments != null ) {
           return ( comments.map( com => {
                let formatedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(com.date)))
                return (
                        <li key={com.id} className="text-left font-weight-normal">
                            <p> {com.comment} </p>
                            <p>-- {com.author}, {formatedDate} </p>
                        </li>
                ) 
            }))
        } else {
            return (<div></div>)
        }
     }

    render() {
        return (   
            <div className="row">
                <Card className="col-12 col-md-5 m-1">
                    <CardImg width="100%" src={this.props.image} alt={this.props.name} />
                    <CardBody>
                        <CardTitle> {this.props.name}</CardTitle>
                        <CardText>{this.props.description}</CardText>
                    </CardBody>
                </Card> 
                <div className=" col-12 col-md-5 m-1">
                    <h4>Comments</h4> 
                    <ul  className="list-unstyled">
                    {this.renderComments(this.props.comments)}
                    </ul>
                </div>
            </div>
        )
    }
}

export default DishDetail ;