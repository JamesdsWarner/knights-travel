# Knight's Travel

A React & TypeScript application that solves the **Knight’s Travel** problem. This project demonstrates a backtracking algorithm optimised with **Warnsdorff's rule** on a chessboard.

## The Challenge

A knight must visit every square on an $N \times N$ board exactly once.

## The Solution: Backtracking + Warnsdorff's Rule

To solve the Travel efficiently, this application implements **Warnsdorff's rule**:

1.  At each step, the algorithm evaluates all 8 possible knight moves.
2.  It chooses the move that leads to a square with the fewest onward moves available.
3.  A backtracking algorithm is implemented allowing it to recover from dead ends if they occur.

## Tech Stack

- **React 18** - UI and State Management.
- **TypeScript** - Strong typing for matrix structures and movement coordinates.
- **Vite** - High-performance build tool.
- **Vitest** - Unit testing framework.

## How to Get Up and Running

Follow these steps to clone, install, and run the project locally.

### 1. Clone the Repository

Open your terminal and run the following commands:

```bash
git clone https://github.com/jamesdswarner/knights-travel.git
cd knights-travel
```

### 2. Install Dependencies

Ensure you have Node.js installed, then run:

npm install

### 3. Start the Development Server

npm run dev

### 4. Access the Application

Once the server is running, the terminal will display a local URL:

http://localhost:5173

Copy and paste this into your browser to view the chess board and the moves made.

## Changing board size

To test its performance with different board sizes, change the value of `BOARD_SIZE` at `src/constants.ts`.

By default, it is 8 to simulate a real chess board.

NOTE: below 5, it is impossible to solve due to constraints of movement for the knight. At some size, the maximum call stack size is exceeded, for me it was 70.

## Running Tests

The project uses **Vitest**. You can run the test suite using:

```bash
npx vitest run
```
