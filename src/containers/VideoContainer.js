import React, { useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer.js';
import {Segment, Input} from 'semantic-ui-react'



let api_key = process.env.REACT_APP_YT_API_KEY
class VideoContainer extends React.Component {


     state = {
      
          searchTerm: "",
          videoList: [],
          videoPick: ""

     }



     searchYoutube() {
          fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${this.state.searchTerm}&key=${api_key}`, {
               method: "GET",
               header: 'Accept: application/json'
          })
               .then(resp => resp.json())
               .then(data => {
                    console.log(data)
                    this.setState({videoList: data.items})
               })
     }


   


     searchChange = (e) => {
          this.setState({ searchTerm: e.target.value })
     }

     keyDown = (e) => {
          if (e.keyCode === 13) {
         
               this.searchYoutube()


          }
     }


     chooseVideo = (item) => {
        this.setState({videoPick: item.id.videoId})
     } 



     render() {
          return (
               <>
                    <p>inside the video container</p>

                    <Segment textAlign="right" inverted color="black">
                         <Input icon='search' type="text" name="search" placeholder='Search Videos' onKeyDown={this.keyDown} value={this.state.searchTerm} onChange={this.searchChange} />
                    </Segment>
                    {/* <VideoSearch searchChange={this.searchChange} searchTerm={this.state.searchTerm} keyDown={this.keyDown}/> */}
                    <VideoPlayer videoPick={this.state.videoPick}/>

<div className="vidGallery" style={{display: "inline-flex"}} >
     <>
            {/* {this.state.videoList &&
              (this.state.videoList.length === 0
             ? <p>No results</p>
             : ( */}
            Choose a video title to play
                 {this.state.videoList.map(item => (
                   <ul key={item.id.videoId}>
                     <div >
                       <b onClick={() => this.chooseVideo(item)}>{item.snippet.title}</b>
                     
                     </div>
                     <img  alt="" src={item.snippet.thumbnails.default.url}/>
                     </ul>
                    
                 ))}
                     </>
                   </div> 
                
     
           
         




               </>
          )
     }







}

export default VideoContainer