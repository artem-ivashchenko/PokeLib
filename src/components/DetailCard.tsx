import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Pokemon } from "../types/Pokemon";
import formatStr from "../utils/formatStr";
import { COLORS } from "../utils/colors";

type Props = {
  pokemon: Pokemon;
};

const DetailCard: React.FC<Props> = ({ pokemon }) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "max-content",
        boxShadow: 5,
        gap: 1,
        p: 1,
      }}
    >
      <img
        src={pokemon.sprite}
        style={{ display: "block", marginInline: "auto", width: "75%" }}
      />

      <Typography variant="h6" textAlign={"center"}>
        {`${formatStr(pokemon.name)} #${pokemon.id}`}
      </Typography>
      
      <Table>
        <TableBody>
          {pokemon.stats.map((stat) => (
            <TableRow key={stat[0]}>
              <TableCell>{formatStr(stat[0])}</TableCell>
              <TableCell align="right">{stat[1]}</TableCell>
            </TableRow>
          ))}

          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell>Type</TableCell>

            <TableCell align="right" sx={{ display: "flex", gap: 0.5 }}>
              {pokemon.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  sx={{ backgroundColor: COLORS[type] }}
                />
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
};

export default DetailCard;
