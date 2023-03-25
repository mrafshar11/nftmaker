import React, {useState} from 'react';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress'
import useSwr from 'swr';


const PostDetail = ({post}) => {
  console.log(post);

  const [comments, setComments] = useState([]);

  const {data, error} = useSwr("http://localhost:3001/commentss?postId=" + post.id, axios)

  // useEffect(() => {
  //   axios.get("http://localhost:3001/comments?postId=" + post.id)
  //     .then(res => {
  //       console.log(res.data);
  //       setComments(res.data);
  //     }).catch(err => {
  //     console.log(err)
  //   });
  // }, []);
  console.log(data);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.desc}</p>
      <hr/>
      {error ? <h3>مشکل در لود نظرات</h3> : !data && <CircularProgress></CircularProgress>}
      {
        data && <ul>
          {data.data.map((item, index) => <li key={index}><h3>{item.sender}</h3><p>{item.message}</p></li>)}
        </ul>
      }
    </div>
  );
};

export async function getStaticProps({params}) {
  const response = await axios.get("http://localhost:3001/posts/" + params.id);
  return {
    props: {
      post: response.data,
    }
  }
};

export async function getStaticPaths() {
  const response = await axios.get("http://localhost:3001/posts");
  const paths = response.data.map(post => `/posts/${post.id}`)

  return {
    paths,
    fallback: false
  }
}

export default PostDetail;