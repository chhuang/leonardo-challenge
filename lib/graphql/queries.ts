import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        image
        origin {
          name
        }
        location {
          name
        }
        episode {
          id
        }
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        name
        type
        dimension
      }
      location {
        name
        type
        dimension
      }
      image
      created
      episode {
        id
        name
        episode
      }
    }
  }
`;

export const GET_LOCATIONS_WITH_RESIDENTS = gql`
  query GetLocationsWithResidents($page: Int) {
    locations(page: $page) {
      info {
        pages
        count
      }
      results {
        id
        name
        residents {
          id
          image
        }
      }
    }
  }
`;

export const GET_MULTIVERSE_STATS = gql`
  query GetMultiverseStats {
    total: characters {
      info {
        count
      }
    }
    humans: characters(filter: { species: "Human" }) {
      info {
        count
      }
    }
    aliens: characters(filter: { species: "Alien" }) {
      info {
        count
      }
    }
    alive: characters(filter: { status: "Alive" }) {
      info {
        count
      }
    }
    dead: characters(filter: { status: "Dead" }) {
      info {
        count
      }
    }
    unknown: characters(filter: { status: "unknown" }) {
      info {
        count
      }
    }
  }
`;
