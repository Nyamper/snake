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
        <Container maxWidth="md" sx={{ mt: 5 }}>
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
                    key={Math.random()}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {player.username}
                    </TableCell>
                    <TableCell align="right">{player.time}</TableCell>
                    <TableCell align="right">{player.score}</TableCell>
                    <TableCell align="right">
                      {player.createdAt.slice(0, 10)}
                    </TableCell>
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
