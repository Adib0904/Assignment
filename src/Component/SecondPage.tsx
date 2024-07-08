import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
// import { Post } from '../types/Post';
import { Container, Typography } from '@mui/material';
import DepartmentList from './DepartmentList';

const SecondPage: React.FC = () => {
  interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const columns: GridColDef[] = [
    { field: 'userId', headerName: 'User ID', width: 90 },
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'title', headerName: 'Title', width: 250 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Posts
        </Typography>
        <div style={{ height: 600, width: '100%' }}>
          <DataGrid rows={posts}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[10]}

            disableRowSelectionOnClick />
        </div>
      </Container>
      <DepartmentList />

    </>

  );
};

export default SecondPage;

