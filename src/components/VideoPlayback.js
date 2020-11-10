import React from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import {Comment, Form, TextArea, Button} from 'semantic-ui-react'



class VideoPlayback extends React.Component {

     state = {
          videos: [],
          chosenVideo: "",
          chosenVideoInfo: [],
          comment: "",
          allComments: []

     }

componentDidMount() {
          let token = localStorage.getItem("token")
          fetch('http://localhost:3001/videos', {
               method: "GET",
               headers:
                    { Authorization: `Bearer ${token}` }
          })
               .then(resp => resp.json())
               .then(data => {
             
                    this.setState({videos: data })
                  
               })
   

}

getAllComments() {
     let token = localStorage.getItem("token")
     fetch(`http://localhost:3001/videos/${this.state.chosenVideoInfo.id}/comments`, {
          method: "GET",
          headers:
               { Authorization: `Bearer ${token}` }
     })
          .then(resp => resp.json())
          .then(data => {
               this.setState({allComments: data })
             
          })
}



chooseVideo = (video) => {
this.setState({chosenVideo: video.yt_id})
this.setState({chosenVideoInfo : video})
this.getAllComments()
}


changeHandler = (e) => {
     this.setState({comment: e.target.value})

}


submitComment = () => {
  let token = localStorage.getItem("token")
fetch(`http://localhost:3001/videos/${this.state.chosenVideoInfo.id}/comments`, {
     method: "POST",
     headers: {
          Authorization: `Bearer ${token}`,
          "Accepts": "application/json",
          "Content-type": "application/json"
     },
     body: JSON.stringify({ comment: this.state.comment, user: this.props.user, avatar: this.props.user.avatar, username: this.props.user.username, yt_id: this.state.chosenVideoInfo.yt_id, id: this.state.chosenVideoInfo.id, title: this.state.chosenVideoInfo.title, thumbnail: this.state.chosenVideoInfo.thumbnail })
})
     .then(response => response.json())
     .then(data => {
     console.log(data)
        this.getAllComments()
     })
}


goBack = () => {
     this.props.history.goBack()
}

     render() {
          const comments= this.state.allComments

          return (

               <>
               <Background>
               <Back> <Button labelPosition="right" color='red' icon="fast backward" onClick={this.goBack}>Rewind</Button> </Back>

                    <h1>video playback</h1>

                    <FilmContainer>
                         <FilmBox>
                              <PlayerWrapper>
                                   <ReactPlayer
                                        style={{ position: "absolute", top: "0", left: "0" }}
                                        url={`https://www.youtube.com/watch?v=${this.state.chosenVideo}`}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                   />
                              </PlayerWrapper>
                         </FilmBox>
                    </FilmContainer>


                     <div className="vidPlaybackGallery" style={{display: "inline-flex", flexWrap: "wrap", color: "red"}}> 
                 {this.state.videos.map(video => (
                   <ul key={video.id}>
                     <div >
                       <b onClick={()=> this.chooseVideo(video) }>{video.title}</b>
                     
                     </div>
                     <img  alt="" src={video.thumbnail}/>
                     </ul>

                 ))}
                    </div> 
                   
                    {/* <div className="playbackGallComments" style={{display: "grid", marginTop: "1px", marginBottom: "1px"}}> */}
                    {/* {this.state.allComments.length > 0? */}
                   
                   {comments.map(comment => (
                         <CommentFrame>
                     <Comment >
                         <Comment.Text style={{color: "red", flexWrap: "wrap", marginLeft: "80px"}}  key={comment.id} >{comment.comment} 
                         <p style={{textAlign: "right"}}>  - {comment.username} </p>
                         </Comment.Text>
                          <img alt="" src={`/${comment.avatar}`} style={{display: "flex", marginTop: "-50px", width: "50px"}} />
                         </Comment>
                         </CommentFrame>  
          ))} 
                         
                        
                         {/* </div>                    */}
                         {/* : null} */}


               <Form >
                 < TextArea style={{width: "900px", marginTop: "50px"}}  placeholder='Comments' name="comment" value={this.state.comment} onChange={this.changeHandler} />   
               </Form>  
               <Button 
                               onClick={this.submitComment}
                               content='Add Review'
                               labelPosition='right'
                               icon='pencil'
                              color='red'
                              position="right"
              
                              />
               
               </Background>
               </>
          )
     }


}

export default VideoPlayback

const Back = styled.div`
text-align: right
`

const PlayerWrapper = styled.div`
margin: auto;
position: relative;
padding-top: 56.25%;
`

const FilmBox = styled.div`
height: 500px;
width: 100%;
max-width: 800px;
`

const FilmContainer = styled.div`
width: 100%
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

`


const CommentFrame = styled.div`
border-color: red;
border-style: ridge;
border-width: 5px;
width: 400px;
height: 100px;
background-color: #343A40;
margin: 10px auto;
display: grid;
align-items: flex-end;

`

const Background = styled.section`
background-color: black;
height: 200vh;
`
