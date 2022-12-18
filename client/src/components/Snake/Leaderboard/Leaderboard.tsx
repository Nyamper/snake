import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useAxios } from '../../../hooks/useAxios';

const Leaderboard: React.FC<{}> = ({}) => {
  const { board, error, isLoading } = useAxios();
  return (
    <>
      {isLoading && !error && <div>loading...</div>}
      {error && <div>something went wrong</div>}
      {board && !error && !isLoading && (
        <Container>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Username</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Score</TableCell>
                  <TableCell align="right">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {board.map((player) => (
                  <TableRow
                    key={player.username}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {player.username}
                    </TableCell>
                    <TableCell align="right">{player.time}</TableCell>
                    <TableCell align="right">{player.score}</TableCell>
                    <TableCell align="right">{player.createdAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      )}
    </>
  );
};

export default Leaderboard;

// import { useEffect, useState } from 'react';
// import { TLeaderboard } from '../../../types/types';
// import { getLeaderboard } from '../../../api/leaderboard';

// const Leaderboard: React.FC<{}> = () => {
//   const [data, setData] = useState<TLeaderboard[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     getLeaderboardData();
//   }, []);

//   const getLeaderboardData = async () => {
//     try {
//       setLoading(true);
//       const board = await getLeaderboard();
//       setData(board);
//       setLoading(false);
//     } catch (error: any) {
//       setError(error);
//     }
//   };

//   return (
//     <>
//       {loading && !error && <div>Loading ...</div>}
//       {error && <div>Something went wrong!</div>}
//       {!loading &&
//         !error &&
//         data.map((element) => {
//           console.log(element);
//           return (
//             <div key={Math.random()}>
//               {element.username} {element.time} {element.score}
//             </div>
//           );
//         })}
//     </>
//   );
// };

// export default Leaderboard;
