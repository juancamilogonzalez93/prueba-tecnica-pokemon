export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string | undefined | null;
    other?: {
      'official-artwork'?: {
        front_default?: string;
      };
      dream_world?: {
        front_default?: string;
      };
    };
  };
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: {
    ability: {
      name: string;
      url: string;
    };
    is_hidden: boolean;
    slot: number;
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
  species: {
    name: string;
    url: string;
  };
}

export type Pokemon = PokemonDetails;

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}
