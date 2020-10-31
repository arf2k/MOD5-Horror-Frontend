import React from 'react';
import MovieCard from './MovieCard.js'
import MovieShow from './MovieShow.js'

class MovieList extends React.Component {
     

     renderMovieCards = () => {
          return this.props.movies.map(movie => <MovieCard key={movie.id} movie={movie} submitFavorite={this.props.submitFavorite} />)
     }

     clickHandler = () => {

     }

     
     render() {
          return(
              <div>
                {this.renderMovieCards()}

               </div>
          )
     }
}


export default MovieList