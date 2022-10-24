import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap'



const styleCard = {
    padding:0       
}

function RenderDish({dish}) {
  
     }

    

     
  function  renderComments(dish) {
        
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
            <div className="row col-12 ">
            {props.dish != null ?
                <>  
                <RenderDish dish={props.dish} />
                <renderComments comments={props.dish.comments} />
                    <Card style={styleCard}  className="col-12 col-md-5 m-1 styleCard">
                    <CardImg width="100%" src={props.dish.image} alt={props.dish.name} />
                    <CardBody>
                        <CardTitle> {props.dish.name}</CardTitle>
                        <CardText>{props.dish.description}</CardText>
                    </CardBody>
                </Card>
                </>
                 : <div></div>
                 }
                <div className=" col-12 col-md-5 m-1">
                    <h4>Comments</h4> 
                    <ul  className="list-unstyled">
                    {renderComments(props.dish)}
                    </ul>
                </div>
            </div>
            </div>
        )
    }


export default DishDetail ;