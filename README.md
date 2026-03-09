# Pokémon Battle App

A small React single-page application that loads random Pokémon from the PokéAPI and compares their primary types to determine battle outcomes.

---

# Features

- Load a random Pokémon from the PokéAPI
- Display Pokémon name, sprite, height, weight and types
- Compare the current Pokémon with the previously loaded one
- Determine battle outcome based on type effectiveness
- Track battle statistics:
  - Type matches
  - New Pokémon wins
  - Previous Pokémon wins
- Display loading and error states
- Clean component-based architecture
- Unit tests for core business logic

---

# Tech Stack

- React
- JavaScript
- Vite
- PokéAPI
- Vitest (unit testing)

---

# How to Run the Project

Clone the repository:


git clone https://github.com/OgnyanNankov/pokemon-battle-app.git


Install dependencies:


npm install


Start the development server:


npm run dev


Run tests:


npm test


---

# Application Architecture

The project follows a modular structure to separate concerns.


src
components/
services/
utils/
constants/
tests/


### components

Contains reusable UI components.

Examples:
- `PokemonCard`
- `PlaceholderCard`
- `BattleResult`
- `CountersPanel`
- `LoadPokemonButton`

These components are mostly **presentational** and receive data via props.

---

### services

Responsible for **external API communication**.

Example:

`pokemonService.js`

Handles:

- Fetching Pokémon data
- Fetching Pokémon type data

This keeps network logic separate from UI logic.

---

### utils

Contains **pure functions with business logic**.

Examples:

`battleUtils.js`

- Determines battle results
- Updates battle counters

`pokemonUtils.js`

- Normalizes PokéAPI responses
- Extracts primary Pokémon types

---

### constants

Stores reusable constants.

Example:

`battleMessages.js`

Contains the predefined battle result messages used across the app.

---

### tests

Contains **unit tests for core logic functions**.

Tested modules:

- `battleUtils`
- `pokemonUtils`

The tests validate battle logic, counter updates, and Pokémon data mapping.

---

# State Management

The application uses **React local state** managed inside `App.jsx`.

Main state variables:

- `previousPokemon`
- `currentPokemon`
- `battleResult`
- `counters`
- `loading`
- `error`

When a new Pokémon is loaded:

1. The current Pokémon becomes the previous Pokémon
2. A new Pokémon is fetched from the API
3. Type effectiveness data is retrieved
4. Battle logic is executed
5. Counters and UI are updated

---

# API Integration

The application uses the **PokéAPI**.

Endpoints used:

### Pokémon data

https://pokeapi.co/api/v2/pokemon/{id}

Used to retrieve:

- name
- image
- height
- weight
- types
- base stats

### Type data

https://pokeapi.co/api/v2/type/{type}

Used to determine **type effectiveness** through the `damage_relations` field.

---

# Performance Optimization

The application uses React performance hooks:

### useCallback

Used to memoize the Pokémon loading handler.

This prevents unnecessary re-creation of the function on every render and avoids unnecessary re-renders in child components.

### useMemo

Used to compute derived battle statistics summary.

This prevents recalculating expensive derived values on every render.

---

# Testing

Unit tests were written using **Vitest**.

The tests focus on **pure utility functions** that contain the core business logic.

Tested scenarios include:

- Battle outcome calculation
- Counter updates
- Pokémon data normalization
- Edge cases such as missing type data

---

# Future Improvements

Possible enhancements include:

- Pokémon battle animations
- Strongest Pokémon tracker based on total stats
- Persistent battle history
- Component-level testing