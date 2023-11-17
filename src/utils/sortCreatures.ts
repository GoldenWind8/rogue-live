import { CreatureEntity } from '../constants/creatures';
import { CellData } from '../typings/cell';
import { Hit } from '../typings/hit';

interface Options {
  creatures: { [id: string]: CreatureEntity };
  currentMap: CellData[][];
  hitsLastRound: Hit[];
}

// BUG: Goblins placed in front of rat even if further away?

export const sortCreatures = (options: Options): CreatureEntity[] => {
  const array = Object.keys(options.creatures).map((id) => options.creatures[id]);
  return (
    array
      // Only keep creatures that are visible
      .filter((v) => {
        const position = v.position;
        return options.currentMap[position[1]][position[0]].visibility === 'clear';
      })
      // Sort by walking distance to player
      .sort((a, b) => {
        return a.walkingDistanceToPlayer - b.walkingDistanceToPlayer;
      })
      // Place creatures that have been hit at the top
      .sort((a, b) => {
        if (
          options.hitsLastRound.map((hit) => hit.creatureId).includes(a.id) &&
          !options.hitsLastRound.map((hit) => hit.creatureId).includes(b.id)
        ) {
          return -1;
        }
        return 0;
      })
  );
};
