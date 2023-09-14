import { gql } from 'graphql-tag';


export const getPokemon = (pokemon: string) => gql(`{
    getPokemon(pokemon: ${pokemon}, takeFlavorTexts: 1) {
        species
        baseForme
        key
        height
        legendary
        mythical
        num
        shinySprite
        sprite
        weight
        abilities {
            first {
              key
              desc
              isFieldAbility
              name
              shortDesc
            }
            hidden {
              key
              desc
              isFieldAbility
              name
              shortDesc
            }
            second {
              key
              desc
              isFieldAbility
              name
              shortDesc
            }
            special {
              key
              desc
              isFieldAbility
              name
              shortDesc
            }
          }
          baseStats {
            attack
            defense
            hp
            specialattack
            specialdefense
            speed
          }
          baseStatsTotal
          evolutions {
            key
          }
          flavorTexts {
            flavor
            game
          }
          preevolutions {
            key
          }
          types {
            name
            matchup {
              attacking {
                doubleEffectiveTypes
                doubleResistedTypes
                effectiveTypes
                effectlessTypes
                normalTypes
                resistedTypes
              }
              defending {
                doubleEffectiveTypes
                doubleResistedTypes
                effectiveTypes
                effectlessTypes
                normalTypes
                resistedTypes
              }
            }
          }
        }
}`)

/*
{
    "errors": [
        {
            "message": "Field \"abilities\" of type \"Abilities!\" must have a selection of subfields. Did you mean \"abilities { ... }\"?",
            "locations": [
                {
                    "line": 3,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        },
        {
            "message": "Field \"baseStats\" of type \"Stats!\" must have a selection of subfields. Did you mean \"baseStats { ... }\"?",
            "locations": [
                {
                    "line": 4,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        },
        {
            "message": "Field \"evolutions\" of type \"[Pokemon!]\" must have a selection of subfields. Did you mean \"evolutions { ... }\"?",
            "locations": [
                {
                    "line": 6,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        },
        {
            "message": "Field \"flavorTexts\" of type \"[Flavor!]!\" must have a selection of subfields. Did you mean \"flavorTexts { ... }\"?",
            "locations": [
                {
                    "line": 8,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        },
        {
            "message": "Field \"preevolutions\" of type \"[Pokemon!]\" must have a selection of subfields. Did you mean \"preevolutions { ... }\"?",
            "locations": [
                {
                    "line": 12,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        },
        {
            "message": "Field \"types\" of type \"[PokemonType!]!\" must have a selection of subfields. Did you mean \"types { ... }\"?",
            "locations": [
                {
                    "line": 15,
                    "column": 5
                }
            ],
            "extensions": {
                "code": "GRAPHQL_VALIDATION_FAILED"
            }
        }
    ]
}
*/