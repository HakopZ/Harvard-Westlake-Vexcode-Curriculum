---
layout: dynamic-sidebar
title: VexCode Introduction
permalink: /curriculum/vexcode-introduction/
---

## What is VexCode?

VexCode is the official programming environment for VEX Robotics competitions. It's an Integrated Development Environment (IDE) that lets you write, compile, and upload C++ code to your VEX V5 Brain for competitive robotics.

> **Key Features for Competition:**
> - Built-in C++ compiler (LLVM/Clang-based)
> - Real-time error checking
> - Device configuration tools
> - Built-in documentation
> - Direct upload to V5 Brain
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

## VexCode IDE Components

![VexCode IDE Overview]({{ '/assets/images/vexcode-ide-overview.svg' | relative_url }})
*Figure 1: VexCode IDE with main components labeled*

**Code Editor** - The main area where you write your C++ code. Features include:
- **Syntax highlighting**: Code is color-coded for better readability
- **Auto-completion**: Suggests function names and parameters
- **Error highlighting**: Shows syntax errors in real-time
- **Line numbers**: Helps with debugging and navigation

![Code Editor]({{ '/assets/images/vexcode-code-editor.svg' | relative_url }})
*Figure 2: Code editor with syntax highlighting and line numbers*

**Device Configuration** - Located in the left sidebar, this tool helps you:
- **Configure motors**: Set motor ports, gear ratios, and directions
- **Setup sensors**: Configure encoders, gyros, and other sensors
- **Name devices**: Give meaningful names to your hardware
- **Set up controllers**: Configure V5 Controller buttons and joysticks

![Device Configuration]({{ '/assets/images/vexcode-device-config.svg' | relative_url }})
*Figure 3: Device configuration panel showing motor and sensor setup*

**Build and Run Tools** - Essential for compiling and uploading your code:
- **Build button**: Compiles your code and checks for errors
- **Download button**: Uploads compiled code to the V5 Brain
- **Console**: Shows build messages, errors, and debug output

![Build Tools]({{ '/assets/images/vexcode-build-tools.svg' | relative_url }})
*Figure 4: Build and download buttons with console output*

**Help and Documentation** - Your reference guide:
- **Built-in help**: Access VEX API documentation
- **Code examples**: Sample programs for common tasks
- **Troubleshooting guides**: Solutions to common problems

![Help Documentation]({{ '/assets/images/vexcode-help.svg' | relative_url }})
*Figure 5: Built-in help system with API documentation*

## Setting Up Your First Project

### Step 1: Create a New Project
1. Open VexCode
2. Click "New Project"
3. Choose "V5 Brain" as your device
4. Select "C++" as your language
5. Give your project a descriptive name

### Step 2: Configure Your Robot
Before writing code, you need to tell VexCode about your robot's hardware:

#### Motor Configuration
```cpp
// Example: Configure a drive motor
vex::motor leftMotor = vex::motor(vex::PORT1, vex::gearSetting::ratio18_1, false);
```

**Configuration Options:**
- **Port**: Which port on the V5 Brain (1-21)
- **Gear Setting**: 
  - `ratio18_1` - Red gear (fast, less torque)
  - `ratio36_1` - Green gear (medium speed/torque)
  - `ratio6_1` - Blue gear (slow, high torque)
- **Reversed**: `true` if motor should spin opposite direction

#### Sensor Configuration
```cpp
// Example: Configure an encoder
vex::encoder leftEncoder = vex::encoder(vex::PORT2, vex::PORT3, false);

// Example: Configure a gyro
vex::gyro gyroSensor = vex::gyro(vex::PORT4);
```

### Step 3: Competition Program Structure
Every competition VexCode program follows this structure:

```cpp
#include "vex.h"

using namespace vex;

// Declare your devices here
motor leftMotor = motor(PORT1, ratio18_1, false);
motor rightMotor = motor(PORT2, ratio18_1, true);

// Pre-autonomous setup function
void pre_auton() {
    // Initialize sensors, reset encoders, etc.
    // This runs before autonomous starts
}

// Autonomous function - runs during 15-second autonomous period
void autonomous() {
    // Your autonomous routine goes here
    leftMotor.spin(forward, 50, percent);
    rightMotor.spin(forward, 50, percent);
    wait(2, seconds);
    leftMotor.stop();
    rightMotor.stop();
}

// User control function - runs during driver control period
void usercontrol() {
    while (true) {
        // Tank drive control
        int leftSpeed = Controller1.Axis3.position();
        int rightSpeed = Controller1.Axis2.position();
        
        leftMotor.spin(forward, leftSpeed, percent);
        rightMotor.spin(forward, rightSpeed, percent);
        
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

## Common Hardware Setup

![Hardware Setup Overview]({{ '/assets/images/vexcode-hardware-setup.svg' | relative_url }})
*Figure 6: Common VEX hardware components and their connections*

**Drive Train Setup** - Most robots need a drive train. Here's a typical configuration:

```cpp
// Left side motors
motor leftFront = motor(PORT1, ratio18_1, false);
motor leftBack = motor(PORT2, ratio18_1, false);

// Right side motors  
motor rightFront = motor(PORT3, ratio18_1, true);
motor rightBack = motor(PORT4, ratio18_1, true);

// Create motor groups for easier control
motor_group leftDrive = motor_group(leftFront, leftBack);
motor_group rightDrive = motor_group(rightFront, rightBack);
```

**Controller Setup** - Configure your V5 Controller for robot control:
![V5 Controller]({{ '/assets/images/vexcode-controller.svg' | relative_url }})
*Figure 7: V5 Controller with button and joystick labels*

```cpp
// V5 Controller
controller Controller1 = controller(primary);

// Access controller inputs
void usercontrol() {
    while (true) {
        // Get joystick values (-100 to 100)
        int leftSpeed = Controller1.Axis3.position();
        int rightSpeed = Controller1.Axis2.position();
        
        // Drive the robot
        leftDrive.spin(forward, leftSpeed, percent);
        rightDrive.spin(forward, rightSpeed, percent);
        
        wait(20, msec); // Small delay to prevent overwhelming the brain
    }
}
```

**Sensor Setup** - Configure various sensors for your robot:
```cpp
// Encoders for tracking distance
encoder leftEncoder = encoder(PORT5, PORT6, false);
encoder rightEncoder = encoder(PORT7, PORT8, true);

// Gyro for turning
gyro gyroSensor = gyro(PORT9);

// Distance sensor
distance distanceSensor = distance(PORT10);

// Color sensor
optical colorSensor = optical(PORT11);
```

## Best Practices

**Naming Conventions** - Use clear, descriptive names:
- Use descriptive names: `leftDriveMotor` instead of `motor1`
- Be consistent: `leftFront`, `leftBack`, `rightFront`, `rightBack`
- Use camelCase for variables and functions

**Port Management** - Keep track of your hardware connections:
- Keep a list of which devices use which ports
- Use comments to document your port assignments
- Leave some ports free for future additions

**Code Organization** - Structure your code for clarity:
```cpp
// Group related devices together
// Drive train
motor leftMotor = motor(PORT1, ratio18_1, false);
motor rightMotor = motor(PORT2, ratio18_1, true);

// Sensors
encoder leftEncoder = encoder(PORT3, PORT4, false);
gyro gyroSensor = gyro(PORT5);

// Controller
controller Controller1 = controller(primary);
```

**Testing and Debugging** - Develop systematically:
- Test each component individually before combining
- Use the console to print debug information
- Start with simple movements and build complexity gradually

## Common Issues and Solutions

**Motor Not Moving** - Troubleshooting steps:
1. Check port connections
2. Verify motor configuration (port, gear ratio, direction)
3. Ensure motor is not in brake mode when it should be coasting
4. Check if motor is physically blocked

**Code Won't Compile** - Common fixes:
1. Check for syntax errors (missing semicolons, brackets)
2. Verify all device names are spelled correctly
3. Make sure you've included `#include "vex.h"`
4. Check that all ports are unique

**Robot Behavior is Unexpected** - Debugging approach:
1. Verify motor directions (some may need to be reversed)
2. Check sensor readings in the console
3. Ensure your logic matches your robot's physical setup
4. Test with small movements first

## Next Steps

Now that you understand the basics of VexCode:
1. **Practice**: Create a simple program that drives forward and backward
2. **Experiment**: Try different motor speeds and directions
3. **Add sensors**: Incorporate encoders or gyros into your programs
4. **Build complexity**: Combine multiple behaviors into autonomous routines

> **Assignment**: Create a new VexCode project and write a program that:
> 1. Drives forward for 3 seconds
> 2. Turns right for 1 second  
> 3. Drives backward for 2 seconds
> 4. Stops
> 
> <details>
>   <summary>Show example answer</summary>
>   
> ```cpp
> #include "vex.h"
> 
> using namespace vex;
> 
> // Configure motors
> motor leftMotor = motor(PORT1, ratio18_1, false);
> motor rightMotor = motor(PORT2, ratio18_1, true);
> 
> int main() {
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
>     
>     return 0;
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
