import { Box, Button, Typography } from '@mui/material';

import { initialState } from '../../../constants';

const Stats: React.FC<{
  score: number;
  gameStart: boolean;
  time: { seconds: number; minutes: number; hours: number };
  handleGamePause: Function;
}> = ({ handleGamePause, score, time, gameStart }) => {
  const { canvasHeight, canvasWidth } = initialState;
  const { seconds, minutes, hours } = time;

  return (
    <>
      <Box
        style={{
          border: '3px solid black',
          width: canvasWidth / 3,
          height: canvasHeight,
          marginRight: 5,
        }}
      >
        <Box sx={{ mt: 10 }}>
          <Typography variant="h4" align="center">
            {hours < 10 ? `0${hours}` : hours}
            {minutes < 10 ? `:0${minutes}` : `:${minutes}`}
            {seconds < 10 ? `:0${seconds}` : `:${seconds}`}
          </Typography>
          <Typography variant="h3" align="center" sx={{ my: 5 }}>
            score: {score}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
          <Button
            size={'small'}
            variant={'outlined'}
            onClick={() => handleGamePause()}
          >
            {gameStart ? 'pause' : 'unpause'}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Stats;
