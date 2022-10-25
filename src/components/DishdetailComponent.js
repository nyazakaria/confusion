import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap'
import {Link} from 'react-router-dom'


const styleCard = {
    padding:0       
}

function RenderDish({dish}) {
    return (<div style={styleCard}>
    <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
            <CardTitle> {dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
        </CardBody>
    </Card> 
    </div>)
     }

    

     
  function  RenderComments(dish) {
        
        if(dish != null ) {
            const comments = dish.comments;
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

    const DishDetail = (props) =>  {
        return (   
            
            <div className="container" >
                <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name} </h3>
                    <hr />
                </div>
            </div>
            <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} />
                    </div>
                </div>
            </div>
        )
    }


export default DishDetail ;