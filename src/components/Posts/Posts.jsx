import React, { useState, useEffect } from 'react'
import AddPostForm from '../../components/AddPostForm/AddPostForm'
import * as postsApi from '../../utils/post-api'
import * as likesApi from '../../utils/likesService';

import {  Grid } from 'semantic-ui-react'

export default function Posts({user}){

    const [posts, setPosts] = useState([]);

    // Whereever your state is you'll probably 
    // have an api function defined in the same component that will end updating the state

    async function addLike(postId){
      try {
        const data = await likesApi.create(postId)
        console.log(data, ' response from addLike')
        getPosts() // get the updated posts
      } catch(err){
        console.log(err)
      }
    }

    async function removeLike(likeId){
      try{  
        const data = await likesApi.removeLike(likeId);
        console.log(data, ' response from removeLike')
        getPosts()
      } catch(err){
        console.log(err)
      }
    }


    async function handleAddPost(post){
        console.log('hanlde add Post')
        try {
            
            const data = await postsApi.create(post)
            console.log(data, ' the response from the create route')

            setPosts(posts => [data.post, ...posts])

        } catch(err){
            console.log(err)
        }
    }

    async function getPosts(){
    
        try {
          const data = await postsApi.getAll();
          setPosts([...data.posts])
        } catch(err){
          console.log(err, ' this is the error')
        }
      }

      useEffect(() => {
        getPosts()
      }, [])



    return (
      <Grid centered >
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 450 }}>
            <AddPostForm handleAddPost={handleAddPost}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{maxWidth: 450}}>
            {/* <Posts 
              user={user}
              posts={posts}  
              isProfile={false} 
              addLike={addLike} 
              removeLike={removeLike}
              /> */}
          </Grid.Column>
        </Grid.Row>
    </Grid>
    )
}