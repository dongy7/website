This post assumes that you have a basic understanding of [bitwise](https://en.wikipedia.org/wiki/Bitwise_operation) operations. I’ll also be using [TypeScript](https://www.typescriptlang.org/docs/tutorial.html) in my examples because it offers a very nice type system to work with. If you know JavaScript, then you’ll be able to follow along with a basic understanding of the type system offered by TypeScript.

I’ve been solving various problems on the [Advent of Code](http://adventofcode.com/) and I came
across a pretty interesting problem on [day 7](http://adventofcode.com/2015/day/7).

The problem has to do with circuits and in particular, we are looking for
the output value of a certain wire, in this case `A`. Let’s break the problem down into its essential part, i.e. how do we get the value of a given wire? If you take a look at the test input, then you’ll
notice that the wires on the right hand side of the `->` are all unique.

If you know a little bit about digital logic, then you know that a wire
can carry either a `HIGH (1)` or `LOW (0)`. This is why a wire can’t have more than one output.

Now that we know that a wire’s output is determined from exactly one of these rules, we can compute its output. For example, take a look at the following rule:

```
x AND y -> z
```
From the rule we can determine that `z`’s value is the result
of bitwise ANDing wire `x` and wire `y`’s values. So
we just need to get the value of wire `x` and wire `y` and we have found wire `z`’s value.

However, there is a small problem. What if we don’t know the values of
`x` or `y` when we are trying to compute `z`? Well, we know that some of these rules can be evaluated
without any knowledge of the state of other wires, such as the rule `123 -> x`. So, after all of these rules have been evaluated, we can evaluate the rules that depend on the wires that have now been
initialized.

We can keep repeating this process, and eventually all of the wires will
be evaluated. In JavaScript, this is very simple, as we can add a callback
to our wire objects that will poll the values according to the rule for
that specific wire.

Suppose we have the following interfaces representing an instruction and a
wire:

```
interface Instruction {
  type: number; // the instruction type e.g. AND or OR
  dest: string; // the wire ID that is on the right hand side of the arrow
  src: string;  // source wire ID for assignment instruction
  srcA: string; // source wire IDs for instructions that take in two operands e.g. AND
  srcB: string;
  amount: number; // shift amount for LSHIFT/RSHIFT
};

interface Wire {
  poll: Function; // function for computing the wire's output value
  output: number; // wire's output value
};

// Maps a wire ID to the Wire Object
interface Circuit {
  [id: string]: Wire;
};
```

Now we can build the function that assembles the board:

```
const assemble = (instructions: Instruction[]): Circuit => {
  let board: Circuit = {};

  // loop over the instructions
  for (const inst of instructions) {
    let pollFunc;

    switch (inst.type) {
      case 'AND':
        pollFunc = () => {
          const opA = getVal(board, inst.srcA);
          const opB = getVal(board, inst.srcB);
          if (opA === undefined || opB === undefined) {
            return undefined;
          }

          return opA & opB;
        }
      // other cases omitted
    }
  }
}
```

Remember that board is a mapping from an identifier to the wire. We close
over the `board` variable in our `pollFunc` so that
all of the wires are polling from the same board. For the `AND` case, we simply poll operand `A`
and operand `B`. If either of these operands is `undefined`, we simply return `undefined`. Otherwise
we return the bitwise AND of the two operands.

```
const solve = (board: Circuit, wireB: number): Circuit => {
  let count = 0;

  // loop until all of the wires have output defined
  while (count < Object.keys(board).length) {

    // loop over all of the wires
    for (const key of Object.keys(board)) {
      const wire = board[key];

      // poll the operand wire values if the wire's
      // output is currently undefined
      if (wire.output === undefined) {
        const polledVal = wire.poll();
        if (polledVal !== undefined) {
          wire.output = polledVal;
          count++;
        }
      }
    }
  }

  return board;
};
```

Here, we simply loop through all of the wires and check if its value is
defined. If so we skip over it, since its value won’t change once
evaluated. Otherwise we call the polling function that we’ve set in our
assembly function. When all of the values have been evaluated, we can
return the board.

This was a pretty fun problem that gives some insight into how digital
circuits actually work. If you want to try running the code, you can find
my full solution [here](https://github.com/dongy7/adventofcode-2015/blob/master/src/day7.ts).