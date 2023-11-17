import { MAX_CLEAR_VISIBILITY, MAX_VISIBILITY } from '../constants/config';
import { CellData } from '../typings/cell';
import { Position } from '../typings/position';
import { getSurroundingPositions } from '../utils/getSurroundingPositions';
import { getVisibility } from '../utils/getVisibility';

export const updateVisibility = (position: Position, gameMap: CellData[][]): CellData[][] => {
  const newGameMap = gameMap;
  const mapHeight = newGameMap.length;
  const mapWidth = newGameMap[0].length;
  // TODO: Only set to 'dim' to cells that just went out of visibility
  // Then we should be able to remove "Set dark revealed cells to dim"
  // First reset all cells to dark
  newGameMap.forEach((row) => {
    row.forEach((cell) => {
      cell.visibility = 'dark';
    });
  });

  // Get surroundingPositions
  const options = { position, radius: MAX_VISIBILITY, mapWidth, mapHeight };
  const surroundingPositions = getSurroundingPositions(options);

  // Visibility
  surroundingPositions.forEach((p) => {
    if (!newGameMap[p[1]] || !newGameMap[p[1]][p[0]]) {
      // This can happen if the map is smaller than the surroundingPositions array
      return;
    }
    const visibility = getVisibility({
      position: p,
      playerPosition: position,
      gameMap: newGameMap,
      maxClearVisibility: MAX_CLEAR_VISIBILITY,
      maxVisibility: MAX_VISIBILITY,
    });
    newGameMap[p[1]][p[0]].visibility = visibility;

    // Update revealed for visible cells
    const visible = visibility === 'clear';
    if (visible && newGameMap[p[1]][p[0]].revealed === false) {
      newGameMap[p[1]][p[0]].revealed = true;
    }
  });

  return newGameMap;
};
