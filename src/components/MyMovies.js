import React from 'react';
import { Button, Card, List, Icon } from 'semantic-ui-react';
import styled from 'styled-components'


class MyMovies extends React.Component {

     state = {
          favorites: [],
          reviews: [],
          iconShown: false
     }

     componentDidMount() {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/my_movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
                    this.setState({ favorites: data.favorites, reviews: data.reviews })
               })
     }



     updateFavorites() {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/my_movies', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    this.setState({ favorites: data.favorites })
               })
     }



     goBack = () => {
          this.props.history.goBack()
     }

     deleteFavorite = (favoriteId) => {
          let token = localStorage.getItem("token")
          fetch(`http://localhost:3001/users/favorites/${favoriteId}`, {
               method: "DELETE",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
                    this.updateFavorites()
               })
     }


     render() {

          const favorites = this.state.favorites
          const reviews = this.state.reviews

          return (
               <>
                     <Background>
                         <Back> <Button color='red' onClick={this.goBack}>Rewind</Button> </Back>

                         <h1 style={{color: "red", fontFamily: "Helvetica", fontSize: "50px", marginLeft: "250px"}}>My Movies</h1>
                              

                         <MyContainer>

                              {favorites.map(favorite => (
                                   <> <i class="small delete icon" style={{color: "red"}} onClick={() => this.deleteFavorite(favorite.id)} />
                                        <Card style={{marginBottom: "0"}} onClick={() => this.props.history.push(`/movies/${favorite.movie_id}`)} key={favorite.id} image={`https://image.tmdb.org/t/p/w185${favorite.poster_path}`} /> </>))
                              }
                         </MyContainer>

                         <h1 style={{color: "red", marginTop: "100px", fontFamily: "Helvetica", fontSize: "30px", marginLeft: "250px" }}>My Reviews</h1>

                                   {reviews.map(review => (
                                        <>
                              <CommentFrame> 
                              <List style={{ color: "red", fontSize: "15x", textAlign: "initial", marginLeft: "5px"  }} key={review.id}> {review.title} : {review.review}  </List>
                              <i onClick={() => this.props.history.push(`/movies/${review.movie_id}`)} style={{color: "red", position: "absolute", right: "0", marginBottom: "5px"}} class="external alternate icon"></i>
                              </CommentFrame> 
                               </>
                             
                         ))}



              
               </Background>
               </>
          )



     }
}
export default MyMovies


const Back = styled.div`
text-align: right;

`

const Background = styled.div`
background-color: black;
height: 250vh;


`

const MyContainer = styled.section`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
align-content: center;
margin-top: 0vh;
margin-left: 15vw;

`
const CommentFrame = styled.div`
border-color: red;
border-style: ridge;
border-width: 5px;
width: 1000px;
height: 50px;
background-color: #343A40;
margin: 10px auto;
display: grid;
align-items: flex-end;
position: relative;
margin-right: 250px

`


