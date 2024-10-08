import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { resetGame, setDifficulty } from "../../slices/gameSlice";
import {
  Chip,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { SButton } from "./styled";
import "./styles.scss";
import { DifficultyEnum } from "../../types";

const Header: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { difficulty, timer, attempts, score } = useSelector(
    (state: RootState) => state.game
  );

  const handleDifficultyChange = (event: SelectChangeEvent<DifficultyEnum>) => {
    dispatch(setDifficulty(event.target.value as DifficultyEnum));
    dispatch(resetGame());
  };

  const handleReset = () => dispatch(resetGame());

  return (
    <div className="header">
      <Typography component="h1" variant="h4">
        Memory Match Game
      </Typography>
      <div className="controls">
        <Select
          className="controls-level"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          {Object.values(DifficultyEnum).map((level, index) => (
            <MenuItem value={level} key={index}>
              {level}
            </MenuItem>
          ))}
        </Select>
        <SButton variant="contained" color="primary" onClick={handleReset}>
          Reset
        </SButton>
      </div>
      <div className="info">
        <Chip
          className="info-chip"
          color="secondary"
          label={`Time: ${timer}`}
        />
        <Chip
          className="info-chip"
          color="secondary"
          label={`Attempts: ${attempts}`}
        />
        <Chip
          className="info-chip"
          color="secondary"
          label={`Score: ${score}`}
        />
      </div>
    </div>
  );
};

export default Header;
