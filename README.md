# tradie-plugin-serve

A tradie plugin for serving files while watching.

## Installation

    npm --save-dev tradie-plugin-serve

## Usage

1. Configure `.tradierc`:

  ```json
  {
    "plugins": [["serve", {
      "host": "0.0.0.0",
      "port": 5000,
      "directory": "./dist"
    }]]
  }
  ```

2. Run `tradie build --watch` and navigate to `http://localhost:5000`.
