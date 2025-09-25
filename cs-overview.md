---
layout: dynamic-sidebar
title: Computer Science Overview
permalink: /curriculum/cs-overview/
---

## What language we'll use
We use **C++** with the VEX libraries. C++ is fast and lets us talk directly to hardware.

> Assignment: In one sentence, explain why a systems language like C++ is useful.
<details>
  <summary>Show example answer</summary>
  It's fast and gives low-level control over memory and devices while still supporting high-level features.
</details>

## What is code?
Think of code as a recipe. Each line is a step that tells the computer what to do. A program is the full recipe with all the steps.

> Assignment: Write two steps of a "recipe" a computer could follow (not robotics-specific).
<details>
  <summary>Show example answer</summary>
  1) Ask the user for their name. 2) Print "Hello, &lt;name&gt;!".
</details>

## Bits, bytes, and binary
- **Bit**: The smallest piece of information a computer stores: a 0 or 1 (off/on).
- **Byte**: 8 bits grouped together. A byte can represent 256 different values (0–255) because it's base‑2.
- **Binary (base‑2)**: Numbers written using only 0 and 1. Each place is a power of 2.
  - Example: 13 in decimal = 1101 in binary (8 + 4 + 0 + 1).
- Computers use binary because hardware is built from switches that are off/on.

> Assignment: Convert decimal 10 and 14 into binary.
<details>
  <summary>Show example answer</summary>
  10 = 1010₂, 14 = 1110₂.
</details>

## How your code runs (simple version)
- You type C++ code in an IDE.
- A tool called a compiler turns your code into machine language.
- The program runs on the computer's CPU.

### What is an IDE?
An IDE (Integrated Development Environment) is an app that helps you write, build, and run code. It usually includes a code editor, compiler integration, error list, and a way to run/debug programs.

### What is a compiler?
A compiler is like a translator. It takes human‑readable code and turns it into machine instructions.

<details>
  <summary><strong>What compiler does VEXcode use? (click to show)</strong></summary>
  <div>
    VEXcode uses an LLVM/Clang‑based C++ compiler. It cross‑compiles your C++ into code the VEX V5 Brain understands. VEXcode runs this for you automatically—no setup needed.
  </div>
</details>

> Assignment: In one sentence, describe what happens when you press Build/Run in an IDE.
<details>
  <summary>Show example answer</summary>
  The compiler translates the code and links it into an executable, which the IDE runs.
</details>

## The basic building blocks
- **Variable**: A named box that stores a value you can change.
- **Constant**: A named value you can't change.

### Variable Types and Terminology
**Primitive Data Types:**
- **`bool`**: Stores `true` or `false` (1 byte)
- **`int`**: Whole numbers like 5, -10, 1000 (4 bytes)
- **`double`**: Decimal numbers like 3.14, -2.5 (8 bytes)
- **`char`**: Single characters like 'A', 'z', '5' (1 byte)
- **`string`**: Text like "Hello", "Robot123" (variable size)

**Variable Declaration vs Initialization:**
- **Declaration**: `int age;` (creates the variable but doesn't give it a value)
- **Initialization**: `int age = 15;` (creates the variable AND gives it a value)

**Why semicolons matter:**
- Semicolons (`;`) tell the compiler "this statement is complete"
- Missing semicolons cause compilation errors
- Think of semicolons like periods in sentences

**The Semicolon Pattern:**
Every statement in C++ must end with a semicolon. This is how the compiler knows where one instruction ends and the next begins.

```cpp
// Correct - each statement ends with semicolon
int age = 15;
double height = 5.6;
std::string name = "Alex";

// Wrong - missing semicolons
int age = 15        // ERROR: missing semicolon
double height = 5.6 // ERROR: missing semicolon
```

**Common semicolon mistakes:**
- Forgetting semicolons after variable declarations
- Missing semicolons after function calls
- Adding semicolons where they don't belong (after if statements, loops)

```cpp
// Correct usage
if (age > 18) {     // No semicolon after if condition
    std::cout << "Adult" << std::endl;  // Semicolon after statement
}

// Wrong usage
if (age > 18); {    // ERROR: semicolon after if condition
    std::cout << "Adult" << std::endl;
}
```

### Variable Declaration Patterns

**The Standard Pattern:**
Every variable follows the same pattern: `type name = value;`

```cpp
// Pattern: type name = value;
int count = 5;                    // Integer variable
double price = 19.99;             // Decimal variable
bool isReady = true;              // Boolean variable
std::string message = "Hello";    // Text variable
```

**Always Declare Before Use:**
You must declare a variable before you can use it. The compiler needs to know what type of data it will hold.

```cpp
// Correct - declare first, then use
int age;
age = 15;                    // Now we can use it
std::cout << age << std::endl;

// Wrong - trying to use before declaring
std::cout << age << std::endl;  // ERROR: age not declared yet
int age = 15;
```

**Declaration vs Assignment:**
- **Declaration**: Creating the variable (`int age;`)
- **Assignment**: Giving it a value (`age = 15;`)
- **Initialization**: Doing both at once (`int age = 15;`)

```cpp
// Method 1: Declaration then assignment
int score;
score = 100;

// Method 2: Declaration with initialization (preferred)
int score = 100;

// Method 3: Multiple variables of same type
int x = 10, y = 20, z = 30;
```

**Variable Naming Rules:**
- Must start with a letter or underscore
- Can contain letters, numbers, and underscores
- Cannot use spaces or special characters
- Case-sensitive (age ≠ Age ≠ AGE)

```cpp
// Good variable names
int studentAge = 16;
double averageScore = 85.5;
bool isPassing = true;
std::string firstName = "Alex";

// Bad variable names
int 2age = 16;           // ERROR: starts with number
double average score = 85.5;  // ERROR: contains space
bool is-passing = true;  // ERROR: contains hyphen
```

### Where do values live? (memory, simply)
- The computer has a giant shelf of numbered slots (bytes).
- A variable reserves some slots to store a value.
- The name helps your code find those slots.
- Different types use different space: `bool` ≈ 1 byte, `int` ≈ 4, `double` ≈ 8.

> Assignment: Declare a variable for age and a constant for sales tax.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Variable example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">int</span> count = <span style="color: #b5cea8;">5</span>;
    </div>
    <br>
    <strong>Constant example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">const</span> <span style="color: #569cd6;">double</span> pi = <span style="color: #b5cea8;">3.14159</span>;
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">int</span> age = <span style="color: #b5cea8;">13</span>;<br>
      <span style="color: #569cd6;">const</span> <span style="color: #569cd6;">double</span> salesTax = <span style="color: #b5cea8;">0.095</span>;
    </div>
  </div>
</details>

## Operators
Common symbols that do math, comparisons, and logic.
- Arithmetic: `+ - * / %`
- Comparison (give true/false): `== != < <= > >=`
- Logical (combine conditions): `&&` (and), `||` (or), `!` (not)
- Assignment: `=`; with math: `+= -= *= /=`
- Increment/decrement: `++ --`
Use parentheses to control order when in doubt.

> Assignment: Write a condition that checks if `score` is between 70 and 100 (inclusive).
<details>
  <summary>Show example answer</summary>
  (score >= 70) && (score <= 100)
</details>

## Robots: inputs and outputs
- Inputs: data that comes in (like user input from the keyboard or a file).
- Outputs: results your program produces (like printed text or a file).

> Assignment: Name one input and one output your favorite app uses.
<details>
  <summary>Show example answer</summary>
  Input: typing in a search box; Output: list of results on screen.
</details>

## Functions (method)
A function is a mini‑program you can reuse. It can take inputs and return an output.
Calling a function is like pressing a labeled button: you pass in inputs, it works, and gives you an answer back.

### Function Declaration Pattern

**The Standard Function Pattern:**
Every function follows the same pattern: `returnType functionName(parameters) { body }`

```cpp
// Pattern: returnType functionName(parameters) { body }
int addNumbers(int a, int b) {
    return a + b;
}

void printMessage(std::string text) {
    std::cout << text << std::endl;
}

double calculateArea(double length, double width) {
    return length * width;
}
```

**Always Declare Functions Before Use:**
Just like variables, functions must be declared before they can be used.

```cpp
// Method 1: Define function before main()
int multiply(int x, int y) {
    return x * y;
}

int main() {
    int result = multiply(5, 3);  // Can use it here
    return 0;
}

// Method 2: Declare function first, define later
int multiply(int x, int y);  // Declaration (prototype)

int main() {
    int result = multiply(5, 3);  // Can use it here
    return 0;
}

int multiply(int x, int y) {  // Definition
    return x * y;
}
```

### Function Terminology
**Parameters vs Arguments:**
- **Parameter**: The variable name in the function definition (like `int minutes`)
- **Argument**: The actual value you pass when calling the function (like `toSeconds(5)`)

**Function Parts:**
- **Return type**: What kind of data the function gives back (`int`, `void`, etc.)
- **Function name**: What you call it (`toSeconds`, `doubleIt`)
- **Parameters**: Inputs the function needs
- **Function body**: The code inside `{ }` that does the work

**Why curly braces `{ }` matter:**
- Curly braces group code together into blocks
- They tell the compiler "this code belongs together"
- Functions, loops, and if statements all use braces
- Missing braces cause syntax errors

**Function Call Pattern:**
When calling a function, you follow the pattern: `functionName(arguments);`

```cpp
// Function definition
int square(int number) {
    return number * number;
}

// Function calls (using the function)
int result1 = square(5);        // Call with argument 5
int result2 = square(10);       // Call with argument 10
int result3 = square(result1);  // Call with variable as argument

// Each call follows the pattern: functionName(argument);
```

> Assignment: Write a function `toSeconds(int minutes)` that returns minutes * 60.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Function example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">int</span> doubleIt(<span style="color: #569cd6;">int</span> x) {<br>
      &nbsp;&nbsp;<span style="color: #569cd6;">return</span> x * <span style="color: #b5cea8;">2</span>;<br>
      }
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">int</span> toSeconds(<span style="color: #569cd6;">int</span> minutes) {<br>
      &nbsp;&nbsp;<span style="color: #569cd6;">return</span> minutes * <span style="color: #b5cea8;">60</span>;<br>
      }
    </div>
  </div>
</details>

## Making decisions and repeating work (control flow)
- `if/else` chooses what to do.
- `switch` picks from many options based on a single value.
- Short‑circuiting: in `a && b`, if `a` is false, `b` isn't checked.
- Loops repeat actions: `for`, `while`, `do...while`.

### Control Flow Patterns

**The If Statement Pattern:**
Every if statement follows the pattern: `if (condition) { code }`

```cpp
// Pattern: if (condition) { code }
if (age >= 18) {
    std::cout << "You are an adult" << std::endl;
}

// Pattern: if (condition) { code } else { code }
if (score >= 70) {
    std::cout << "Pass" << std::endl;
} else {
    std::cout << "Fail" << std::endl;
}

// Pattern: if (condition) { code } else if (condition) { code } else { code }
if (grade >= 90) {
    std::cout << "A" << std::endl;
} else if (grade >= 80) {
    std::cout << "B" << std::endl;
} else {
    std::cout << "C or below" << std::endl;
}
```

**The For Loop Pattern:**
Every for loop follows the pattern: `for (initialization; condition; update) { code }`

```cpp
// Pattern: for (initialization; condition; update) { code }
for (int i = 1; i <= 5; i++) {
    std::cout << i << std::endl;
}

// Breaking it down:
// int i = 1;     - Start with i = 1
// i <= 5;        - Continue while i is less than or equal to 5
// i++            - After each loop, add 1 to i
```

**The While Loop Pattern:**
Every while loop follows the pattern: `while (condition) { code }`

```cpp
// Pattern: while (condition) { code }
int count = 1;
while (count <= 5) {
    std::cout << count << std::endl;
    count++;  // Don't forget to update the condition!
}
```

### Control Flow Terminology
**Conditional Statements:**
- **`if`**: "If this condition is true, do this"
- **`else`**: "Otherwise, do this instead"
- **`else if`**: "If the first condition is false, check this one"

**Loop Types:**
- **`for` loop**: Repeat a specific number of times
- **`while` loop**: Repeat while a condition is true
- **`do...while` loop**: Do once, then repeat while condition is true

**Why braces are crucial in control flow:**
- Each `if`, `else`, and loop needs braces to define its scope
- Without braces, only the next line is part of the condition/loop
- Proper indentation helps show what belongs where

**Common Control Flow Mistakes:**
```cpp
// Wrong - missing braces
if (age >= 18)
    std::cout << "Adult" << std::endl;  // Only this line is in the if
    std::cout << "Always printed" << std::endl;  // This always runs!

// Correct - with braces
if (age >= 18) {
    std::cout << "Adult" << std::endl;
    std::cout << "Only printed if adult" << std::endl;
}
```

> Assignment: Write a `for` loop that prints 1 to 5 (inclusive).
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Loop example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">for</span> (<span style="color: #569cd6;">int</span> i = <span style="color: #b5cea8;">1</span>; i &lt;= <span style="color: #b5cea8;">5</span>; ++i) {<br>
      &nbsp;&nbsp;std::cout &lt;&lt; i &lt;&lt; <span style="color: #ce9178;">"\n"</span>;<br>
      }
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">for</span> (<span style="color: #569cd6;">int</span> i = <span style="color: #b5cea8;">1</span>; i &lt;= <span style="color: #b5cea8;">5</span>; ++i) {<br>
      &nbsp;&nbsp;std::cout &lt;&lt; i &lt;&lt; <span style="color: #ce9178;">"\n"</span>;<br>
      }
    </div>
  </div>
</details>

## Lists of things: arrays and vectors
- **Array**: Fixed size. Good when you know the count.
- **Vector**: Growable list.

### Data Structure Terminology
**Arrays:**
- **Index**: The position of an item (starts at 0)
- **Element**: An individual item in the array
- **Size**: How many items the array can hold
- **Bounds**: The valid range of indices (0 to size-1)

**Vectors:**
- **Dynamic**: Can grow and shrink as needed
- **Capacity**: How much space is currently allocated
- **Size**: How many items are currently stored
- **Methods**: Functions like `push_back()`, `size()`, `at()`

**Common Operations:**
- **Access**: Getting a value at a specific position
- **Insert**: Adding a new item
- **Delete**: Removing an item
- **Search**: Finding if an item exists

> Assignment: Add a number to a vector and print the new size.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Array example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">int</span> a[<span style="color: #b5cea8;">3</span>] = {<span style="color: #b5cea8;">40</span>, <span style="color: #b5cea8;">60</span>, <span style="color: #b5cea8;">80</span>};
    </div>
    <br>
    <strong>Vector example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">#include</span> <span style="color: #ce9178;">&lt;vector&gt;</span><br>
      std::vector&lt;<span style="color: #569cd6;">int</span>&gt; v = {<span style="color: #b5cea8;">1</span>, <span style="color: #b5cea8;">2</span>, <span style="color: #b5cea8;">3</span>};<br>
      v.push_back(<span style="color: #b5cea8;">4</span>);
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">#include</span> <span style="color: #ce9178;">&lt;vector&gt;</span><br>
      <span style="color: #569cd6;">#include</span> <span style="color: #ce9178;">&lt;iostream&gt;</span><br>
      <br>
      <span style="color: #569cd6;">int</span> main() {<br>
      &nbsp;&nbsp;std::vector&lt;<span style="color: #569cd6;">int</span>&gt; v = {<span style="color: #b5cea8;">1</span>, <span style="color: #b5cea8;">2</span>, <span style="color: #b5cea8;">3</span>};<br>
      &nbsp;&nbsp;v.push_back(<span style="color: #b5cea8;">4</span>);<br>
      &nbsp;&nbsp;std::cout &lt;&lt; v.size(); <span style="color: #6a9955;">// prints 4</span><br>
      &nbsp;&nbsp;<span style="color: #569cd6;">return</span> <span style="color: #b5cea8;">0</span>;<br>
      }
    </div>
  </div>
</details>

## Pass-by-value vs reference
- **By value**: the function gets a copy. Changes inside don't affect the original.
- **By reference**: the function works on the original. Use references when you want to modify an argument or avoid copying big objects.

### Parameter Passing Terminology
**Pass by Value:**
- **Copy**: The function receives a duplicate of the original value
- **Local**: Changes only affect the copy inside the function
- **Safe**: Original data can't be accidentally modified
- **Memory**: Uses more memory for large objects

**Pass by Reference:**
- **Alias**: The function works directly with the original variable
- **Modification**: Changes inside the function affect the original
- **Efficient**: No copying of large objects
- **Dangerous**: Can accidentally change original data

**When to use each:**
- **By value**: For small data types (int, double, bool) or when you don't want changes
- **By reference**: For large objects (strings, vectors) or when you need to modify the original

> Assignment: Write a function that appends "!" to a `std::string` by reference.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>By value example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">void</span> addOne(<span style="color: #569cd6;">int</span> x) {<br>
      &nbsp;&nbsp;x = x + <span style="color: #b5cea8;">1</span>;<br>
      }
    </div>
    <br>
    <strong>By reference example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">void</span> addOneRef(<span style="color: #569cd6;">int</span> &x) {<br>
      &nbsp;&nbsp;x = x + <span style="color: #b5cea8;">1</span>;<br>
      }
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">void</span> addBang(std::string &s) {<br>
      &nbsp;&nbsp;s += <span style="color: #ce9178;">"!"</span>;<br>
      }
    </div>
  </div>
</details>

## Classes vs. structs (simple idea)
Both bundle data together. Use a `struct` for simple data, and a `class` when you also want behavior (functions) and privacy.

### What is a Class?
**A class is like a blueprint or template** that describes what an object should look like and what it can do. Think of it like a cookie cutter - the class is the cutter, and objects are the cookies you make with it.

**Real-world analogy:**
- **Class**: "Car" (the blueprint)
- **Object**: "My red Honda Civic" (a specific car made from the blueprint)
- **Data**: color, model, speed, fuel level
- **Behavior**: start(), stop(), accelerate(), turn()

### Why Classes are Useful
**Classes help you organize your code by:**
- **Grouping related data together**: All car data (color, speed, fuel) stays together
- **Bundling behavior with data**: Car functions (start, stop) work with car data
- **Hiding complexity**: You can use a car without knowing how the engine works
- **Reusing code**: Make many cars from the same blueprint

### Object-Oriented Terminology
**Class Components:**
- **Member variables**: Data that belongs to the class (also called attributes or fields)
- **Member functions**: Functions that belong to the class (also called methods)
- **Constructor**: Special function that runs when you create an object
- **Destructor**: Special function that runs when an object is destroyed

**Class vs Struct:**
- **Struct**: All members are public by default (anyone can access them)
- **Class**: All members are private by default (only the class can access them)
- **Inheritance**: Classes can inherit from other classes, structs cannot
- **Usage**: Use structs for simple data containers, classes for complex objects with behavior

### How Classes Relate to Objects
**The relationship between classes and objects:**
- **Class**: The template or blueprint
- **Object**: A specific instance created from the class
- **One class can create many objects**

```cpp
// Class definition (the blueprint)
class Car {
private:
    std::string color;
    int speed;
    
public:
    void start() {
        speed = 0;
        std::cout << "Car started!" << std::endl;
    }
    
    void accelerate() {
        speed += 10;
    }
};

// Creating objects from the class
Car myCar;        // Object 1
Car yourCar;      // Object 2
Car familyCar;    // Object 3

// Each object is independent
myCar.start();    // Only affects myCar
yourCar.start();  // Only affects yourCar
```

> Assignment: Create a `struct` `Book` with `title` and `pages` fields.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Struct example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">struct</span> Point {<br>
      &nbsp;&nbsp;<span style="color: #569cd6;">int</span> x;<br>
      &nbsp;&nbsp;<span style="color: #569cd6;">int</span> y;<br>
      };
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">struct</span> Book {<br>
      &nbsp;&nbsp;std::string title;<br>
      &nbsp;&nbsp;<span style="color: #569cd6;">int</span> pages;<br>
      };
    </div>
  </div>
</details>

## Who can see what: access keywords
Inside a class:
- `public`: anyone can use it
- `private`: only the class can use it
- `protected`: the class and its children can use it

### Access Control Terminology
**Access Modifiers:**
- **Public**: Can be accessed from anywhere (outside the class)
- **Private**: Can only be accessed from within the same class
- **Protected**: Can be accessed by the class and its derived classes

**Encapsulation Benefits:**
- **Data hiding**: Internal implementation details are hidden
- **Interface**: Only the public methods are the "interface" to your class
- **Maintenance**: You can change private implementation without breaking other code
- **Validation**: You can check data before allowing changes through public methods

### Why access modifiers matter
- They protect your data from accidental changes.
- They let you change internals later without breaking other code.
- They make the "public API" small and easy to learn.

> Assignment: Mark a class field `private` and add a `public` getter.
<details>
  <summary>Show example answer</summary>
  <div>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">class</span> User {<br>
      <span style="color: #569cd6;">private:</span><br>
      &nbsp;&nbsp;<span style="color: #569cd6;">int</span> age;<br>
      <span style="color: #569cd6;">public:</span><br>
      &nbsp;&nbsp;<span style="color: #569cd6;">int</span> getAge() <span style="color: #569cd6;">const</span> {<br>
      &nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #569cd6;">return</span> age;<br>
      &nbsp;&nbsp;}<br>
      };
    </div>
  </div>
</details>

## What is an object?
An object is a specific thing made from a blueprint (class). It has data (state) and functions (behavior).

> Assignment: List one object, one piece of its data, and one behavior.
<details>
  <summary>Show example answer</summary>
  Object: `Account`; Data: `balance`; Behavior: `deposit(amount)`.
</details>

## Why object‑oriented programming (OOP)?
- Helps you group related data and actions together.
- Makes code easier to understand.
- Encourages reuse.
- Hides details that beginners don't need to see (only the public parts are exposed).

> Assignment: In two sentences, describe a situation where grouping data and behavior helps.
<details>
  <summary>Show example answer</summary>
  A `Timer` groups the current time and functions like start/stop. Anywhere I need timing, I can reuse the same object.
</details>

## Planning and algorithms
Before you write code, plan what the program should do.
- **Goal**: What outcome do you want?
- **Steps**: Break the goal into small actions.
- **Inputs**: What data will you read?
- **Decisions**: What if an input isn't what you expect?
- **Outputs**: What should the program show or return?

### Pseudocode (writing the plan in plain words)
Turn pseudocode into functions so you can reuse steps.

> Assignment: Write 3–5 lines of pseudocode for a simple task.
<details>
    <summary>Show example answer</summary>
    <div>
      <strong>Example pseudocode:</strong><br>
      <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
        start<br>
        ask for two numbers<br>
        add them<br>
        print the sum<br>
        stop
      </div>
      <br>
      <strong>Assignment solution:</strong><br>
      start → read name → greet with "Hello, &lt;name&gt;!" → stop
    </div>
 </details>

## Debugging basics
- Read error messages from the compiler—start with the first error.
- Add small `print` statements to see values and trace what ran.
- Change one thing at a time and re‑test.
- Reduce the problem: comment out code to isolate the bug.

> Assignment: Add a print statement to show a variable before and after a change.
<details>
  <summary>Show example answer</summary>
  <div>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      std::cout &lt;&lt; <span style="color: #ce9178;">"before: "</span> &lt;&lt; x &lt;&lt; <span style="color: #ce9178;">"\n"</span>;<br>
      <span style="color: #6a9955;">// ... update x ...</span><br>
      std::cout &lt;&lt; <span style="color: #ce9178;">"after: "</span> &lt;&lt; x &lt;&lt; <span style="color: #ce9178;">"\n"</span>;
    </div>
  </div>
</details>

## Helpful habits and best practices
### Comment your code
- Explain why you chose an approach or number.
- Keep comments short and updated when code changes.

### Naming conventions
- **PascalCase**: Each word capitalized, no underscores. Good for `ClassNames`.
- **camelCase**: First word lowercase, next words capitalized. Good for `variables` and `functions`.
- Be consistent across the project: `maxItems`, `printReport()`.

### General tips
- Use clear names (avoid `tmp`, `data1`).
- Keep functions short and focused.
- Avoid magic numbers; use named constants.
- Use early returns to avoid deep nesting.
- Handle errors: check for bad values.
- Group reusable code into functions/classes.
- Test in small steps.
- Commit code often with clear messages.

> Assignment: Rename two variables or add a comment to improve clarity.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Comment example:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #569cd6;">const</span> <span style="color: #569cd6;">double</span> tax = <span style="color: #b5cea8;">0.095</span>; <span style="color: #6a9955;">// LA county sales tax</span>
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      <span style="color: #6a9955;">// Before: unclear variable names</span><br>
      <span style="color: #569cd6;">int</span> x = <span style="color: #b5cea8;">5</span>;<br>
      <span style="color: #569cd6;">const</span> <span style="color: #569cd6;">double</span> tax = <span style="color: #b5cea8;">0.095</span>;<br>
      <br>
      <span style="color: #6a9955;">// After: clear names and comments</span><br>
      <span style="color: #569cd6;">int</span> itemsInCart = <span style="color: #b5cea8;">5</span>;<br>
      <span style="color: #569cd6;">const</span> <span style="color: #569cd6;">double</span> tax = <span style="color: #b5cea8;">0.095</span>; <span style="color: #6a9955;">// LA county sales tax rate</span>
    </div>
  </div>
</details>

## Git and GitHub
### Why use Git?
Git lets you save versions of your code, try ideas safely, and go back if something breaks.

### Key ideas
- **Repository (repo)**: Your project folder tracked by Git.
- **Commit**: A snapshot of your changes with a message.
- **Branch**: A separate line of work.
- **Remote**: A copy stored online (GitHub).

### Typical flow for students
1. Clone your repo from GitHub to your laptop.
2. Make small changes that do one thing.
3. `git add .` to stage changes.
4. `git commit -m "clear message"` to save a snapshot.
5. `git push` to send to GitHub.
6. Open a Pull Request on GitHub for a teammate to review.

> Assignment: Make a tiny change, commit with a clear message, and push.
<details>
  <summary>Show example answer</summary>
  <div>
    <strong>Simple commands to remember:</strong><br>
    <div style="background-color: var(--code-bg); color: var(--code-text); padding: 10px; border-radius: 5px; font-family: monospace; border: 1px solid var(--border-color);">
      git status<br>
      git add .<br>
      git commit -m <span style="color: #ce9178;">"explain the change"</span><br>
      git push
    </div>
    <br>
    <strong>Assignment solution:</strong><br>
    Edit README → `git add .` → `git commit -m "Fix typo in README"` → `git push`.
  </div>
</details>

## Working with Multiple Data Items

### Arrays - Fixed Size Collections
**What arrays are:** A way to store multiple values of the same type in a single variable.

**Key characteristics:**
- Fixed size (you must know how many items you need)
- All items must be the same type
- Access items by their position (index)
- Index starts at 0, not 1

```cpp
// Array declaration and initialization
int scores[5] = {85, 92, 78, 96, 88};  // Array of 5 integers

// Accessing array elements
int firstScore = scores[0];  // 85 (first element)
int thirdScore = scores[2];  // 78 (third element)
int lastScore = scores[4];   // 88 (last element)

// Changing array values
scores[1] = 95;  // Change second score to 95

// Common mistake - accessing beyond array size
// int invalid = scores[5];  // ERROR: array only has indices 0-4
```

**Array operations:**
```cpp
int numbers[10] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};

// Find array size (number of elements)
int size = sizeof(numbers) / sizeof(numbers[0]);  // 10

// Loop through array
for (int i = 0; i < size; i++) {
    std::cout << numbers[i] << " ";
}
```

### Vectors - Dynamic Lists
**What vectors are:** Like arrays, but they can grow and shrink as needed.

**Key advantages over arrays:**
- Can change size during program execution
- Built-in methods for common operations
- Safer than arrays (less likely to cause crashes)
- More convenient to use

```cpp
#include <vector>

// Vector declaration and initialization
std::vector<int> scores = {85, 92, 78};  // Start with 3 elements

// Adding elements
scores.push_back(96);  // Add 96 to the end
scores.push_back(88);  // Add 88 to the end

// Accessing elements (same as arrays)
int firstScore = scores[0];  // 85
int lastScore = scores[4];   // 88

// Vector methods
int size = scores.size();        // Get number of elements (5)
scores.pop_back();               // Remove last element
bool isEmpty = scores.empty();   // Check if vector is empty
```

**Common vector operations:**
```cpp
std::vector<std::string> names;

// Add names
names.push_back("Alice");
names.push_back("Bob");
names.push_back("Charlie");

// Loop through vector
for (int i = 0; i < names.size(); i++) {
    std::cout << names[i] << std::endl;
}

// Alternative loop syntax (range-based for loop)
for (const std::string& name : names) {
    std::cout << name << std::endl;
}
```

### When to Use Arrays vs Vectors
**Use arrays when:**
- You know exactly how many items you need
- The size never changes
- You want maximum performance
- Working with simple, small collections

**Use vectors when:**
- You don't know how many items you'll need
- The size might change
- You want convenience and safety
- Working with larger or more complex data

```cpp
// Array example - fixed number of motor speeds
double motorSpeeds[4] = {50.0, 60.0, 70.0, 80.0};

// Vector example - dynamic list of sensor readings
std::vector<double> sensorReadings;
sensorReadings.push_back(25.3);
sensorReadings.push_back(26.1);
sensorReadings.push_back(24.8);
// Can add more readings as needed
```

## Testing and Quality Assurance

### Unit Testing in Robotics
**What unit testing is:** Testing individual functions or components of your robot code to make sure they work correctly.

**Why testing is important in robotics:**
- **Catch bugs early**: Find problems before they cause your robot to fail
- **Ensure reliability**: Make sure your robot behaves consistently
- **Build confidence**: Know that your code works before competition
- **Document behavior**: Tests show how your code is supposed to work

**Types of testing for robots:**
- **Unit tests**: Test individual functions (like a distance calculation)
- **Integration tests**: Test how different parts work together
- **Hardware tests**: Test with real robot components
- **Simulation tests**: Test code in a virtual environment

**Testing approach for VEX robots:**
- Test each sensor reading function individually
- Test motor control functions with different inputs
- Test autonomous routines step by step
- Test error handling and edge cases
- Practice with real hardware under competition conditions

### Code Review Best Practices
**Why review code?**
- Catch bugs before they cause problems
- Share knowledge between team members
- Maintain consistent coding style
- Learn from each other

**What to look for:**
- **Correctness**: Does the code do what it's supposed to do?
- **Readability**: Is the code easy to understand?
- **Performance**: Are there any obvious inefficiencies?
- **Style**: Does it follow team conventions?

**Review checklist:**
- [ ] Code compiles without warnings
- [ ] Functions have clear names and purposes
- [ ] Complex logic is commented
- [ ] No magic numbers (use named constants)
- [ ] Error handling is appropriate
- [ ] Code follows team style guidelines

---

**Next up:** We'll apply these programming concepts to build sophisticated robot behaviors, starting with basic movement and progressing to advanced autonomous systems!