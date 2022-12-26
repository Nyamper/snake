import { useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

const StartScreen: React.FC<{ handleGameStart: Function }> = ({
  handleGameStart,
}) => {
  const [name, setName] = useState('');

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value.trim();
    setName(name);
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            border: '3px solid black',
            textAlign: 'center',
            mt: 5,
            p: 5,
          }}
        >
          <Typography variant="h3" color={'green'} sx={{ my: 5 }}>
            Snake
          </Typography>
          <Typography variant="h4" color={'grey'}>
            Grey food 1 point
          </Typography>
          <Typography variant="h4" color={'blue'}>
            Blue food 5 points
          </Typography>
          <Typography variant="h4" color={'purple'}>
            Purple food 10 points
          </Typography>
          <Typography variant="h5" sx={{ mt: 5 }}>
            Speed up every 50 points
          </Typography>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            fullWidth
            sx={{ mt: 3 }}
            onChange={handleInput}
          />
          {name.length < 3 && (
            <div style={{ color: 'red' }}>name should not be empty</div>
          )}
          <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 3 }}
            onClick={() => name.length >= 3 && handleGameStart(name)}
          >
            START
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default StartScreen;
