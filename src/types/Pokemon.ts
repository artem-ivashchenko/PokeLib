export type Pokemon = {
  id: number,
  name: string,
  types: string[],
  stats: Stat[],
  sprite: string,
  moves: number
}

export type Stat = [string, number];