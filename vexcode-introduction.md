---
layout: dynamic-sidebar
title: VexCode Introduction
permalink: /curriculum/vexcode-introduction/
---

## What is VexCode?

VexCode is the official programming environment for VEX Robotics competitions. While VexCode traditionally refers to the standalone IDE, we'll be using the **VexCode extension for Visual Studio Code**, which provides a more professional development experience with better code management and team collaboration.

> **Key Features of VexCode VS Code Extension:**
> - Full C++ development environment in VS Code
> - Built-in VEX API support and autocomplete
> - Real-time error checking and syntax highlighting
> - Code-based device configuration (no visual tools needed)
> - Built-in documentation and IntelliSense
> - Direct upload to V5 Brain
> - Git integration for team collaboration
> - Competition-ready program structure

## Competition Program Structure

**Every VEX program starts with `int main()`** - this is where your program begins execution. However, for competition robotics, we use a special structure that separates autonomous and driver control periods.

```cpp
#include "vex.h"

using namespace vex;

int main() {
    // Competition initialization
    Competition.autonomous(autonomous);
    Competition.drivercontrol(usercontrol);
    
    // Pre-autonomous setup
    pre_auton();
    
    // Main competition loop
    while (true) {
        wait(100, msec);
    }
}
```

**Understanding the Competition Structure:**
- **`autonomous()`**: Runs during the 15-second autonomous period
- **`usercontrol()`**: Runs during the 1-minute 45-second driver control period  
- **`pre_auton()`**: Setup code that runs before autonomous starts
- **`main()`**: Initializes the competition and keeps the program running

This structure is essential for VEX competitions - it automatically switches between autonomous and driver control based on the match timing.

## Setting Up VexCode in VS Code

### Step 1: Install Visual Studio Code
1. Download and install [Visual Studio Code](https://code.visualstudio.com/)
2. Open VS Code and go to the Extensions view (Ctrl+Shift+X)
3. Search for "VexCode" and install the official VexCode extension
4. Restart VS Code after installation

### Step 2: Create Your First VexCode Project
1. Open VS Code
2. Go to File → New Folder and create a new project folder
3. Open the Command Palette (Ctrl+Shift+P)
4. Type "VexCode: New Project" and select it
5. Choose "V5 Brain" as your device
6. Select "C++" as your language
7. Give your project a descriptive name

### Step 3: Understanding the Project Structure
After creating a new project, you'll see this directory structure:

```
MyRobotProject/
├── src/
│   ├── main.cpp              // Main program file
│   ├── robot-config.cpp      // Hardware configuration
│   └── robot-config.h        // Hardware declarations
├── include/
│   └── vex.h                 // VEX API header
├── .vscode/
│   └── settings.json         // VS Code project settings
└── README.md                 // Project documentation
```

**Key Files:**
- **`main.cpp`**: Your main program with autonomous and user control functions
- **`robot-config.cpp`**: All motor and sensor configurations in code
- **`robot-config.h`**: Header file with device declarations
- **`vex.h`**: VEX API library (automatically included)

## Code-Based Hardware Configuration

Unlike the visual VexCode IDE, the VS Code extension requires you to configure all hardware through code. This approach gives you more control and makes your configuration part of your source code.

### Motor Configuration in Code
All motors are configured in the `robot-config.cpp` file:

```cpp
// robot-config.cpp
#include "vex.h"

using namespace vex;

// Drive train motors
motor leftFront = motor(PORT1, ratio18_1, false);   // Port 1, Red gear, not reversed
motor leftBack = motor(PORT2, ratio18_1, false);    // Port 2, Red gear, not reversed
motor rightFront = motor(PORT3, ratio18_1, true);   // Port 3, Red gear, reversed
motor rightBack = motor(PORT4, ratio18_1, true);    // Port 4, Red gear, reversed

// Intake motor
motor intakeMotor = motor(PORT5, ratio36_1, false); // Port 5, Green gear, not reversed

// Lift motor
motor liftMotor = motor(PORT6, ratio6_1, false);    // Port 6, Blue gear, not reversed
```

**Configuration Parameters:**
- **Port**: Which port on the V5 Brain (1-21)
- **Gear Setting**: 
  - `ratio18_1` - Red gear (fast, less torque)
  - `ratio36_1` - Green gear (medium speed/torque)
  - `ratio6_1` - Blue gear (slow, high torque)
- **Reversed**: `true` if motor should spin opposite direction

### Sensor Configuration in Code
Sensors are also configured in the `robot-config.cpp` file:

```cpp
// Encoders for tracking distance
encoder leftEncoder = encoder(PORT7, PORT8, false);  // Ports 7&8, not reversed
encoder rightEncoder = encoder(PORT9, PORT10, true); // Ports 9&10, reversed

// Gyro for turning
gyro gyroSensor = gyro(PORT11);

// Distance sensor
distance distanceSensor = distance(PORT12);

// Color sensor
optical colorSensor = optical(PORT13);

// Controller
controller Controller1 = controller(primary);
```

### Header File Declarations
The `robot-config.h` file contains all the declarations:

```cpp
// robot-config.h
#ifndef ROBOT_CONFIG_H
#define ROBOT_CONFIG_H

#include "vex.h"

// Motor declarations
extern motor leftFront;
extern motor leftBack;
extern motor rightFront;
extern motor rightBack;
extern motor intakeMotor;
extern motor liftMotor;

// Sensor declarations
extern encoder leftEncoder;
extern encoder rightEncoder;
extern gyro gyroSensor;
extern distance distanceSensor;
extern optical colorSensor;

// Controller declaration
extern controller Controller1;

#endif
```

## Main Program Structure

Your main program in `main.cpp` follows this structure:

```cpp
// main.cpp
#include "vex.h"
#include "robot-config.h"

using namespace vex;

// Pre-autonomous setup function
void pre_auton() {
    // Initialize sensors, reset encoders, etc.
    // This runs before autonomous starts
    gyroSensor.calibrate();
    wait(2, seconds);
    
    leftEncoder.resetPosition();
    rightEncoder.resetPosition();
}

// Autonomous function - runs during 15-second autonomous period
void autonomous() {
    // Your autonomous routine goes here
    leftFront.spin(forward, 50, percent);
    leftBack.spin(forward, 50, percent);
    rightFront.spin(forward, 50, percent);
    rightBack.spin(forward, 50, percent);
    
    wait(2, seconds);
    
    leftFront.stop();
    leftBack.stop();
    rightFront.stop();
    rightBack.stop();
}

// User control function - runs during driver control period
void usercontrol() {
    while (true) {
        // Tank drive control
        int leftSpeed = Controller1.Axis3.position();
        int rightSpeed = Controller1.Axis2.position();
        
        leftFront.spin(forward, leftSpeed, percent);
        leftBack.spin(forward, leftSpeed, percent);
        rightFront.spin(forward, rightSpeed, percent);
        rightBack.spin(forward, rightSpeed, percent);
        
        // Intake control
        if (Controller1.ButtonL1.pressing()) {
            intakeMotor.spin(forward, 80, percent);
        } else if (Controller1.ButtonL2.pressing()) {
            intakeMotor.spin(reverse, 80, percent);
        } else {
            intakeMotor.stop();
        }
        
        wait(20, msec);  // Small delay to prevent overwhelming the brain
    }
}

// Main function - initializes competition
int main() {
    Competition.autonomous(autonomous);
    Competition.drivercontrol(usercontrol);
    
    pre_auton();
    
    while (true) {
        wait(100, msec);
    }
}
```

## Building and Uploading Your Code

### Building Your Project
1. In VS Code, open the Command Palette (Ctrl+Shift+P)
2. Type "VexCode: Build" and select it
3. The extension will compile your code and show any errors in the Problems panel
4. Fix any compilation errors before proceeding

### Uploading to the V5 Brain
1. Connect your V5 Brain to your computer via USB
2. Make sure the Brain is powered on
3. In VS Code, open the Command Palette (Ctrl+Shift+P)
4. Type "VexCode: Download" and select it
5. The extension will upload your compiled code to the Brain

### VS Code Features for VexCode Development

**IntelliSense and Autocomplete:**
- Type `motor.` and VS Code will show all available motor functions
- Hover over functions to see documentation
- Get real-time error checking as you type

**Integrated Terminal:**
- Use the built-in terminal for Git commands
- Run build commands directly from VS Code
- Access all your development tools in one place

**Source Control:**
- Built-in Git integration for team collaboration
- Track changes to your robot code
- Share code with teammates easily

**Extensions:**
- C/C++ extension for enhanced C++ support
- GitLens for advanced Git features
- Bracket Pair Colorizer for better code readability

## Best Practices for Code-Based Development

**File Organization** - Keep your code well-organized:
- Keep all hardware configuration in `robot-config.cpp`
- Put function declarations in header files
- Use meaningful file names and folder structure
- Comment your code thoroughly

**Naming Conventions** - Use clear, descriptive names:
- Use descriptive names: `leftFrontMotor` instead of `motor1`
- Be consistent: `leftFront`, `leftBack`, `rightFront`, `rightBack`
- Use camelCase for variables and functions
- Use UPPER_CASE for constants

**Port Management** - Document your hardware connections:
```cpp
// robot-config.cpp
// Drive Train - Ports 1-4
motor leftFront = motor(PORT1, ratio18_1, false);   // Left front drive
motor leftBack = motor(PORT2, ratio18_1, false);    // Left back drive
motor rightFront = motor(PORT3, ratio18_1, true);   // Right front drive (reversed)
motor rightBack = motor(PORT4, ratio18_1, true);    // Right back drive (reversed)

// Intake System - Ports 5-6
motor intakeMotor = motor(PORT5, ratio36_1, false); // Intake motor
motor liftMotor = motor(PORT6, ratio6_1, false);    // Lift motor

// Sensors - Ports 7-13
encoder leftEncoder = encoder(PORT7, PORT8, false); // Left encoder
encoder rightEncoder = encoder(PORT9, PORT10, true); // Right encoder
gyro gyroSensor = gyro(PORT11);                     // Gyro sensor
distance distanceSensor = distance(PORT12);         // Distance sensor
optical colorSensor = optical(PORT13);              // Color sensor
```

**Code Organization** - Structure your code for clarity:
- Group related devices together with comments
- Use consistent indentation and formatting
- Keep functions small and focused
- Use meaningful variable names

**Testing and Debugging** - Develop systematically:
- Test each component individually before combining
- Use `Brain.Screen.print()` for debug information
- Start with simple movements and build complexity gradually
- Use version control (Git) to track changes

## Common Issues and Solutions

**Code Won't Compile** - Common fixes:
1. Check for syntax errors (missing semicolons, brackets)
2. Verify all device names are spelled correctly in `robot-config.cpp`
3. Make sure you've included `#include "vex.h"` and `#include "robot-config.h"`
4. Check that all ports are unique (no two devices on same port)
5. Ensure header file declarations match the implementation

**Motor Not Moving** - Troubleshooting steps:
1. Check port connections on the V5 Brain
2. Verify motor configuration in `robot-config.cpp` (port, gear ratio, direction)
3. Check if motor is physically blocked or disconnected
4. Verify the motor is being called correctly in your code
5. Use `Brain.Screen.print()` to debug motor commands

**Robot Behavior is Unexpected** - Debugging approach:
1. Verify motor directions in `robot-config.cpp` (some may need to be reversed)
2. Check sensor readings using `Brain.Screen.print()`
3. Ensure your logic matches your robot's physical setup
4. Test with small movements first
5. Use the VS Code debugger to step through your code

**VS Code Extension Issues** - Troubleshooting:
1. Make sure the VexCode extension is properly installed
2. Restart VS Code if the extension isn't working
3. Check that your project was created using "VexCode: New Project"
4. Verify the `.vscode/settings.json` file is present
5. Use the Command Palette (Ctrl+Shift+P) to access VexCode commands

## Next Steps

Now that you understand the basics of VexCode in VS Code:
1. **Practice**: Create a simple program that drives forward and backward
2. **Experiment**: Try different motor speeds and directions
3. **Add sensors**: Incorporate encoders or gyros into your programs
4. **Build complexity**: Combine multiple behaviors into autonomous routines
5. **Use Git**: Start tracking your code changes with version control

> **Assignment**: Create a new VexCode project in VS Code and write a program that:
> 1. Drives forward for 3 seconds
> 2. Turns right for 1 second  
> 3. Drives backward for 2 seconds
> 4. Stops
> 
> <details>
>   <summary>Show example answer</summary>
>   
> **robot-config.cpp:**
> ```cpp
> #include "vex.h"
> 
> using namespace vex;
> 
> // Configure motors
> motor leftMotor = motor(PORT1, ratio18_1, false);
> motor rightMotor = motor(PORT2, ratio18_1, true);
> ```
> 
> **main.cpp:**
> ```cpp
> #include "vex.h"
> #include "robot-config.h"
> 
> using namespace vex;
> 
> void autonomous() {
>     // Drive forward for 3 seconds
>     leftMotor.spin(forward, 50, percent);
>     rightMotor.spin(forward, 50, percent);
>     wait(3, seconds);
>     
>     // Turn right for 1 second
>     leftMotor.spin(forward, 50, percent);
>     rightMotor.spin(reverse, 50, percent);
>     wait(1, seconds);
>     
>     // Drive backward for 2 seconds
>     leftMotor.spin(reverse, 50, percent);
>     rightMotor.spin(reverse, 50, percent);
>     wait(2, seconds);
>     
>     // Stop
>     leftMotor.stop();
>     rightMotor.stop();
> }
> 
> void usercontrol() {
>     while (true) {
>         wait(20, msec);
>     }
> }
> 
> int main() {
>     Competition.autonomous(autonomous);
>     Competition.drivercontrol(usercontrol);
>     
>     while (true) {
>         wait(100, msec);
>     }
> }
> ```
> 
> </details>

## Advanced VEXcode Features

### Project Management
**Organizing Your Code:**
- **Multiple files**: Break large programs into logical modules
- **Header files**: Separate declarations from implementations
- **Libraries**: Create reusable code components
- **Project templates**: Save time with pre-configured setups

```cpp
// main.cpp - Main program file
#include "vex.h"
#include "robot_config.h"
#include "autonomous.h"
#include "user_control.h"

using namespace vex;

int main() {
    // Competition initialization
    Competition.autonomous(autonomous);
    Competition.drivercontrol(usercontrol);
    
    // Pre-autonomous setup
    pre_auton();
    
    // Main competition loop
    while (true) {
        wait(100, msec);
    }
}
```

**Project Structure Best Practices:**
```
MyRobotProject/
├── main.cpp              // Main program entry point
├── robot_config.h        // Hardware configuration
├── robot_config.cpp      // Hardware setup functions
├── autonomous.h          // Autonomous routine declarations
├── autonomous.cpp        // Autonomous routine implementations
├── user_control.h        // User control declarations
├── user_control.cpp      // User control implementations
├── utilities.h           // Helper functions
├── utilities.cpp         // Helper function implementations
└── README.md             // Project documentation
```

### Debugging and Troubleshooting

#### Built-in Debugging Tools
**Console Output:**
- Use `Brain.Screen.print()` for debugging information
- Display sensor values, motor speeds, and program state
- Format output for easy reading

```cpp
// Debug output examples
void debugSensors() {
    Brain.Screen.clearScreen();
    Brain.Screen.setCursor(1, 1);
    Brain.Screen.print("Left Encoder: %d", leftEncoder.position(degrees));
    Brain.Screen.newLine();
    Brain.Screen.print("Right Encoder: %d", rightEncoder.position(degrees));
    Brain.Screen.newLine();
    Brain.Screen.print("Gyro Heading: %.2f", gyroSensor.heading(degrees));
}

// Conditional debugging
#ifdef DEBUG
    Brain.Screen.print("Debug: Motor speed set to %d", motorSpeed);
#endif
```

**Error Handling:**
```cpp
// Safe sensor reading with error checking
double safeSensorRead(analog_in& sensor, double defaultValue = 0.0) {
    double value = sensor.value();
    if (value < 0.0 || value > 1.0) {
        Brain.Screen.print("Warning: Invalid sensor reading: %.3f", value);
        return defaultValue;
    }
    return value;
}

// Motor safety checks
void safeMotorSpin(motor& m, directionType dir, double speed, velocityUnits units) {
    if (speed < 0 || speed > 100) {
        Brain.Screen.print("Error: Invalid motor speed: %.2f", speed);
        return;
    }
    m.spin(dir, speed, units);
}
```

#### Common Issues and Solutions

**Motor Issues:**
- **Motor not moving**: Check port connections, gear ratio, and direction
- **Motor moving wrong direction**: Reverse the motor direction in configuration
- **Motor stuttering**: Check for mechanical binding or power issues
- **Inconsistent speed**: Verify gear ratio and check for slipping

**Sensor Issues:**
- **Inconsistent readings**: Check connections and calibration
- **Sensor not responding**: Verify port assignment and power
- **Unexpected values**: Check sensor range and mounting
- **Calibration problems**: Follow manufacturer calibration procedures

**Code Issues:**
- **Compilation errors**: Check syntax, includes, and device names
- **Runtime crashes**: Add error checking and debug output
- **Unexpected behavior**: Use debug prints to trace execution
- **Performance issues**: Optimize loops and sensor reading frequency

### Advanced Hardware Configuration

#### Motor Groups and Chaining
**Motor Groups:**
```cpp
// Create motor groups for coordinated control
motor_group leftDrive = motor_group(leftFront, leftBack);
motor_group rightDrive = motor_group(rightFront, rightBack);
motor_group allMotors = motor_group(leftFront, leftBack, rightFront, rightBack);

// Control entire groups
leftDrive.spin(forward, 50, percent);
rightDrive.spin(forward, 50, percent);

// Stop all motors at once
allMotors.stop();
```

**Motor Chaining:**
```cpp
// Chain motors for synchronized movement
motor leftMotor1 = motor(PORT1, ratio18_1, false);
motor leftMotor2 = motor(PORT2, ratio18_1, false);

// Chain motors (second motor follows first)
leftMotor2.setReversed(true);  // Reverse if needed
leftMotor1.spin(forward, 50, percent);
leftMotor2.spin(forward, 50, percent);
```

#### Advanced Sensor Configuration
**Multiple Sensor Types:**
```cpp
// Encoder configuration with custom settings
encoder leftEncoder = encoder(PORT5, PORT6, false);
encoder rightEncoder = encoder(PORT7, PORT8, true);

// Gyro with calibration
gyro gyroSensor = gyro(PORT9);
gyroSensor.calibrate();
wait(2, seconds);  // Wait for calibration

// Distance sensor with filtering
distance distanceSensor = distance(PORT10);

// Color sensor with multiple modes
optical colorSensor = optical(PORT11);
colorSensor.setLight(ledState::on);
colorSensor.setLightPower(50, percent);
```

**Sensor Fusion:**
```cpp
class SensorFusion {
private:
    gyro& gyroRef;
    encoder& leftEncRef;
    encoder& rightEncRef;
    
public:
    SensorFusion(gyro& g, encoder& le, encoder& re) 
        : gyroRef(g), leftEncRef(le), rightEncRef(re) {}
    
    // Combine multiple sensors for better accuracy
    double getHeading() {
        return gyroRef.heading(degrees);
    }
    
    double getDistance() {
        double leftDist = leftEncRef.position(degrees) * 0.1;  // Convert to cm
        double rightDist = rightEncRef.position(degrees) * 0.1;
        return (leftDist + rightDist) / 2.0;  // Average
    }
    
    bool isMoving() {
        static double lastLeft = 0, lastRight = 0;
        double currentLeft = leftEncRef.position(degrees);
        double currentRight = rightEncRef.position(degrees);
        
        bool moving = (abs(currentLeft - lastLeft) > 1) || (abs(currentRight - lastRight) > 1);
        lastLeft = currentLeft;
        lastRight = currentRight;
        return moving;
    }
};
```

### Autonomous vs User Control

**Understanding the Two Control Modes:**

**Autonomous Control** - The robot operates independently using pre-programmed instructions:
- Runs for a fixed time period (typically 15 seconds in competitions)
- No human input during execution
- Perfect for precise, repeatable movements
- Uses sensors and timing to navigate and complete tasks

**User Control** - The robot responds to human input through a controller:
- Runs continuously until stopped
- **Always requires a loop** to continuously read controller inputs
- Allows real-time decision making and adaptation
- Perfect for complex maneuvers and interactive tasks

**Key Programming Difference:**
```cpp
// Autonomous - runs once, then stops
void autonomous() {
    leftMotor.spin(forward, 50, percent);
    rightMotor.spin(forward, 50, percent);
    wait(2, seconds);
    leftMotor.stop();
    rightMotor.stop();
}

// User Control - MUST have a loop to continuously read inputs
void usercontrol() {
    while (true) {  // This loop is essential!
        int leftSpeed = Controller1.Axis3.position();
        int rightSpeed = Controller1.Axis2.position();
        
        leftMotor.spin(forward, leftSpeed, percent);
        rightMotor.spin(forward, rightSpeed, percent);
        
        wait(20, msec);  // Small delay to prevent overwhelming the brain
    }
}
```

**Why User Control Needs a Loop:**
- Controllers send continuous input signals
- Without a loop, the program would read inputs only once and stop
- The loop ensures the robot responds to controller changes in real-time
- The `wait(20, msec)` prevents the brain from being overwhelmed with too many updates

### VEXcode-Specific Features

#### Built-in Documentation System
**Accessing Help:**
- Use the Help menu in VEXcode for API documentation
- Right-click on functions for quick help
- Built-in code examples for common tasks
- Troubleshooting guides for hardware issues

**Code Documentation in VEXcode:**
```cpp
// VEXcode supports standard C++ comments
// Single line comments explain what the code does

/* 
 * Multi-line comments for longer explanations
 * Perfect for documenting complex functions
 */

/**
 * @brief Controls robot movement using tank drive
 * @param leftSpeed Speed for left side motors (-100 to 100)
 * @param rightSpeed Speed for right side motors (-100 to 100)
 * @param duration How long to move in seconds (0 = continuous)
 */
void tankDrive(int leftSpeed, int rightSpeed, double duration = 0) {
    // Clamp speeds to valid range
    leftSpeed = std::max(-100, std::min(100, leftSpeed));
    rightSpeed = std::max(-100, std::min(100, rightSpeed));
    
    // Apply speeds to motor groups
    leftDrive.spin(forward, leftSpeed, percent);
    rightDrive.spin(forward, rightSpeed, percent);
    
    // Wait for specified duration if provided
    if (duration > 0) {
        wait(duration, seconds);
        leftDrive.stop();
        rightDrive.stop();
    }
}
```

#### VEX Brain Screen Display
**Using the Brain Screen:**
```cpp
// Clear and set up the screen
Brain.Screen.clearScreen();
Brain.Screen.setCursor(1, 1);

// Display text and values
Brain.Screen.print("Robot Status: Ready");
Brain.Screen.newLine();
Brain.Screen.print("Left Encoder: %d", leftEncoder.position(degrees));
Brain.Screen.print("Right Encoder: %d", rightEncoder.position(degrees));

// Display sensor readings in real-time
void displaySensorData() {
    Brain.Screen.clearScreen();
    Brain.Screen.setCursor(1, 1);
    Brain.Screen.print("Distance: %.1f cm", distanceSensor.objectDistance(cm));
    Brain.Screen.newLine();
    Brain.Screen.print("Gyro: %.1f degrees", gyroSensor.heading(degrees));
    Brain.Screen.newLine();
    Brain.Screen.print("Battery: %.1f%%", Brain.Battery.capacity(percent));
}
```

#### VEX-Specific Timing Functions
**Using VEX Timing:**
```cpp
// Wait functions specific to VEX
wait(1, seconds);        // Wait 1 second
wait(500, msec);         // Wait 500 milliseconds
wait(1000, timeUnits::msec);  // Alternative syntax

// Non-blocking timing
double startTime = Brain.timer(msec);
while (Brain.timer(msec) - startTime < 2000) {
    // Do something for 2 seconds
    leftMotor.spin(forward, 50, percent);
    wait(10, msec);  // Small delay to prevent overwhelming the brain
}
leftMotor.stop();
```

---

**Ready to start coding?** You now have a comprehensive understanding of VEXcode and are ready to build sophisticated robot programs. 

**Next Steps:**
1. **Practice**: Create projects using the techniques covered in this guide
2. **Experiment**: Try different sensor combinations and control methods
3. **Build**: Implement the code examples and modify them for your robot
4. **Compete**: Use these skills to build competition-ready autonomous routines

**Continue Learning:**
- Move on to [Computer Science Overview](/curriculum/cs-overview/) for deeper programming concepts
- Jump to [Advanced Robotics Programming](/curriculum/advanced-robotics-programming/) for sophisticated control systems
- Practice with real robot hardware to solidify your understanding

Remember: The best way to learn VEX programming is by doing. Start with simple programs, build your confidence, and gradually tackle more complex challenges. Every expert was once a beginner! 🤖
