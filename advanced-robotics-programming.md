---
layout: dynamic-sidebar
title: Advanced Robotics Programming
permalink: /curriculum/advanced-robotics-programming/
---

## Introduction to Advanced Autonomous Programming

As you progress in robotics programming, you'll encounter more sophisticated methods for controlling your robot's movement. This guide covers the most important autonomous programming concepts, from basic time-based movement to advanced PID control systems.

## Mathematical Prerequisites

**Note:** While these math concepts are helpful for understanding advanced robotics programming, they are not strict requirements. You can start with basic concepts and learn the math as needed.

### Basic Algebra
- **Variables and equations:** Understanding how to set up and solve equations
- **Linear relationships:** How changes in one variable affect another
- **Proportional relationships:** Direct and inverse proportions

### Trigonometry
- **Angles and rotations:** Converting between degrees and radians
- **Sine, cosine, tangent:** Essential for calculating distances and angles
- **Pythagorean theorem:** Finding distances in 2D space

### Calculus Concepts (for PID)
- **Rate of change:** How quickly something is changing
- **Accumulation:** Adding up small changes over time
- **Error correction:** Understanding how to minimize differences

### Coordinate Systems
- **Cartesian coordinates:** X, Y positioning
- **Polar coordinates:** Distance and angle
- **Robot coordinate systems:** How your robot's position relates to the field

**Reference:** For detailed PID control theory and implementation, see the [George Gillard PID Control Document](https://georgegillard.com/documents/2-introduction-to-pid-controllers-with-python/).

## Autonomous Movement Methods

### Move by Time
**What it is:** The simplest autonomous method where you tell motors to run for a specific duration.

**How it works:**
- Set motor power to a fixed value
- Wait for a specific time period
- Stop the motors

**Pros:**
- Very simple to implement
- Predictable timing
- Good for basic movements
- No sensor feedback needed

**Cons:**
- Inconsistent results (battery voltage affects speed)
- No compensation for obstacles or slipping
- Can't adapt to different conditions
- May overshoot or undershoot targets

**Best for:** Simple, short movements where precision isn't critical.

### Move by Encoder
**What it is:** Using motor encoders to move a specific distance rather than a specific time.

**How it works:**
- Read encoder values to track wheel rotation
- Calculate distance based on wheel circumference
- Stop when target distance is reached

**Pros:**
- More consistent than time-based movement
- Compensates for battery voltage changes
- Can handle slight variations in terrain
- More precise distance control

**Cons:**
- Still can't handle major obstacles
- Wheel slipping affects accuracy
- Requires calibration for different surfaces
- More complex to implement

**Best for:** Medium-distance movements where you need reasonable precision.

### PID Control (Proportional-Integral-Derivative)
**What it is:** An advanced control system that continuously adjusts motor power to maintain precise position or speed.

**How it works:**
- **Proportional (P):** Adjusts power based on current error (how far off target you are)
- **Integral (I):** Accounts for accumulated error over time
- **Derivative (D):** Predicts future error based on current rate of change

**Pros:**
- Extremely precise control
- Handles obstacles and resistance automatically
- Self-correcting system
- Can maintain constant speed or position
- Industry-standard control method

**Cons:**
- Complex to tune and implement
- Requires understanding of control theory
- Can be unstable if not tuned properly
- More computational overhead

**Best for:** Precision tasks, maintaining constant speeds, or when you need the robot to adapt to changing conditions.


## Pneumatic Systems

**What they are:** Using compressed air to control mechanical components on your robot.

**Components:**
- **Compressor:** Generates compressed air
- **Solenoid valves:** Control air flow
- **Pneumatic cylinders:** Convert air pressure to linear motion
- **Pressure sensors:** Monitor air pressure

**Programming considerations:**
- Pressure monitoring
- Valve control timing
- Safety interlocks
- Energy management

**Advantages:**
- Fast, powerful actuation
- Simple mechanical design
- Reliable operation
- Good for grabbing mechanisms

**Disadvantages:**
- Requires air compressor
- Limited by air pressure
- Can be noisy
- Air leaks can cause problems

**Example Code:**
```cpp
class PneumaticController {
private:
    digital_out& valve1;
    digital_out& valve2;
    analog_in& pressureSensor;
    double minPressure = 40.0;  // PSI
    
public:
    PneumaticController(digital_out& v1, digital_out& v2, analog_in& sensor) 
        : valve1(v1), valve2(v2), pressureSensor(sensor) {}
    
    // Extend cylinder
    void extend() {
        if (getPressure() > minPressure) {
            valve1.set(true);
            valve2.set(false);
        } else {
            Brain.Screen.print("Low pressure warning!");
        }
    }
    
    // Retract cylinder
    void retract() {
        if (getPressure() > minPressure) {
            valve1.set(false);
            valve2.set(true);
        } else {
            Brain.Screen.print("Low pressure warning!");
        }
    }
    
    // Stop cylinder
    void stop() {
        valve1.set(false);
        valve2.set(false);
    }
    
    // Get current pressure
    double getPressure() {
        return pressureSensor.value() * 120.0;  // Convert to PSI
    }
    
    // Check if system is ready
    bool isReady() {
        return getPressure() > minPressure;
    }
};

// Usage
PneumaticController claw(ClawValve1, ClawValve2, PressureSensor);

void autonomous() {
    if (claw.isReady()) {
        claw.extend();  // Open claw
        wait(1, seconds);
        claw.retract(); // Close claw
    }
}
```

## Advanced Programming Concepts

### Switch Statements
**What they are:** A more efficient way to handle multiple conditions compared to long if-else chains.

**When to use:**
- Multiple discrete values to check
- Menu systems
- State machines
- Game controllers

**Benefits:**
- Cleaner, more readable code
- Better performance than multiple if statements
- Easier to add new cases
- Less prone to errors

**Example Code:**
```cpp
// Game controller button handling
void handleControllerInput(int button) {
    switch(button) {
        case 1:
            // Move forward
            leftMotor.spin(forward, 50, percent);
            rightMotor.spin(forward, 50, percent);
            break;
        case 2:
            // Turn left
            leftMotor.spin(reverse, 30, percent);
            rightMotor.spin(forward, 30, percent);
            break;
        case 3:
            // Turn right
            leftMotor.spin(forward, 30, percent);
            rightMotor.spin(reverse, 30, percent);
            break;
        case 4:
            // Stop
            leftMotor.stop();
            rightMotor.stop();
            break;
        default:
            // Unknown button
            Brain.Screen.print("Unknown button: %d", button);
            break;
    }
}
```

### Writing Classes for Robotics

**Class Structure and Best Practices:**
When writing classes for robotics, follow these guidelines to create clean, maintainable code.

#### Class Components
**Every class should have:**
- **Private member variables**: Data that belongs to the class
- **Public methods**: Functions that provide controlled access to the data
- **Constructor**: Initializes the object when created
- **Destructor**: Cleans up when object is destroyed

#### Class Design Principles
**Encapsulation:** Keep data private and provide controlled access through methods.

**Single Responsibility:** Each class should have one clear purpose.

**Clear Interface:** Public methods should be easy to understand and use.

#### Example: Motor Controller Class
```cpp
class MotorController {
private:
    // Private data - only this class can access
    motor& motorRef;           // Reference to the actual motor
    double maxSpeed;           // Maximum allowed speed
    double currentSpeed;       // Current speed setting
    bool isEnabled;            // Whether motor is enabled
    
public:
    // Constructor - initializes the object
    MotorController(motor& m, double maxSpd) 
        : motorRef(m), maxSpeed(maxSpd), currentSpeed(0), isEnabled(true) {}
    
    // Public methods - controlled access to private data
    void setSpeed(double speed) {
        if (!isEnabled) return;  // Safety check
        
        // Clamp speed to valid range
        if (speed > maxSpeed) speed = maxSpeed;
        if (speed < -maxSpeed) speed = -maxSpeed;
        
        currentSpeed = speed;
        motorRef.spin(forward, speed, percent);
    }
    
    void stop() {
        currentSpeed = 0;
        motorRef.stop();
    }
    
    void enable() {
        isEnabled = true;
    }
    
    void disable() {
        isEnabled = false;
        stop();  // Stop motor when disabled
    }
    
    // Getter methods - read-only access to private data
    double getCurrentSpeed() const {
        return currentSpeed;
    }
    
    double getMaxSpeed() const {
        return maxSpeed;
    }
    
    bool getEnabled() const {
        return isEnabled;
    }
};

// Usage
MotorController leftMotorCtrl(leftMotor, 80.0);  // Max 80% speed
leftMotorCtrl.setSpeed(50.0);  // Set to 50% speed
double current = leftMotorCtrl.getCurrentSpeed();  // Get current speed
```

#### Class Ownership and Responsibility
**What a class should own:**
- **Its own data**: Member variables that belong to the class
- **Its behavior**: Methods that operate on that data
- **Its lifecycle**: Constructor and destructor

**What a class should NOT own:**
- **Global resources**: Things shared across the entire program
- **Other objects**: Unless it's specifically managing them
- **Hardware directly**: Use references or pointers to hardware

#### Advanced Class Features
**Const Methods:** Methods that don't change the object's state.

**Method Overloading:** Multiple methods with the same name but different parameters.

**Hint at Polymorphism:** Classes can be designed to work with different types through inheritance.

```cpp
// Example showing const methods and method overloading
class SensorReader {
private:
    analog_in& sensor;
    double lastReading;
    
public:
    SensorReader(analog_in& s) : sensor(s), lastReading(0.0) {}
    
    // Method overloading - same name, different parameters
    double read() {
        lastReading = sensor.value();
        return lastReading;
    }
    
    double read(double scale) {
        lastReading = sensor.value() * scale;
        return lastReading;
    }
    
    // Const method - doesn't change object state
    double getLastReading() const {
        return lastReading;
    }
    
    // Const method - doesn't change object state
    bool isValid() const {
        return lastReading >= 0.0 && lastReading <= 1.0;
    }
};
```

### Global Constants and Configuration
**Why use global constants:**
- Centralized configuration
- Easy to modify values without hunting through code
- Prevents magic numbers
- Makes code more maintainable

**Best practices:**
- Use descriptive names
- Group related constants together
- Consider using enums for related values
- Document what each constant represents

**Example Code:**
```cpp
// Global constants for robot configuration
namespace RobotConfig {
    // Motor settings
    const double MAX_MOTOR_SPEED = 100.0;
    const double DEFAULT_MOVE_SPEED = 60.0;
    const double TURN_SPEED = 40.0;
    
    // Timing constants
    const int AUTONOMOUS_TIME_LIMIT = 15000;  // 15 seconds
    const int DEBOUNCE_TIME = 200;  // milliseconds
    
    // Sensor thresholds
    const double ULTRASONIC_CLOSE_THRESHOLD = 10.0;  // cm
    const double ULTRASONIC_FAR_THRESHOLD = 50.0;    // cm
    
    // PID constants
    const double PID_KP = 0.5;
    const double PID_KI = 0.1;
    const double PID_KD = 0.05;
}

// Usage in code
void moveForward() {
    leftMotor.spin(forward, RobotConfig::DEFAULT_MOVE_SPEED, percent);
    rightMotor.spin(forward, RobotConfig::DEFAULT_MOVE_SPEED, percent);
}
```

### State Machines
**What they are:** A way to organize your robot's behavior into distinct states.

**Benefits:**
- Clear robot behavior
- Easy to debug
- Handles complex sequences
- Can pause and resume operations

**Common states:**
- Idle, Moving, Collecting, Depositing
- Autonomous phases
- Error handling states

**Example Code:**
```cpp
// Autonomous state machine
enum class AutoState {
    IDLE,
    MOVE_TO_GOAL,
    COLLECT_OBJECT,
    MOVE_TO_DEPOSIT,
    DEPOSIT_OBJECT,
    RETURN_HOME,
    COMPLETE
};

class AutonomousController {
private:
    AutoState currentState = AutoState::IDLE;
    int stateTimer = 0;
    
public:
    void update() {
        switch(currentState) {
            case AutoState::IDLE:
                // Wait for start signal
                if (Controller.ButtonA.pressing()) {
                    currentState = AutoState::MOVE_TO_GOAL;
                    stateTimer = 0;
                }
                break;
                
            case AutoState::MOVE_TO_GOAL:
                // Move towards goal
                leftMotor.spin(forward, 60, percent);
                rightMotor.spin(forward, 60, percent);
                
                // Check if reached goal
                if (distanceSensor.objectDistance(inches) < 5.0) {
                    currentState = AutoState::COLLECT_OBJECT;
                    stateTimer = 0;
                }
                break;
                
            case AutoState::COLLECT_OBJECT:
                // Collect object
                intakeMotor.spin(forward, 80, percent);
                stateTimer++;
                
                // Collect for 2 seconds
                if (stateTimer > 200) {  // 200 * 10ms = 2 seconds
                    intakeMotor.stop();
                    currentState = AutoState::MOVE_TO_DEPOSIT;
                    stateTimer = 0;
                }
                break;
                
            case AutoState::COMPLETE:
                // Stop all motors
                leftMotor.stop();
                rightMotor.stop();
                intakeMotor.stop();
                break;
        }
    }
};
```


## Error Handling and Debugging

### Exception Handling
- **Try-catch blocks:** Gracefully handling errors
- **Error logging:** Recording what went wrong
- **Recovery strategies:** What to do when things fail

### Sensor Validation
- **Range checking:** Ensuring sensor values are reasonable
- **Timeout handling:** What to do when sensors don't respond
- **Redundancy:** Using multiple sensors for critical measurements

### Performance Monitoring
- **Loop timing:** Ensuring your code runs fast enough
- **Memory usage:** Avoiding memory leaks
- **CPU utilization:** Making sure you're not overloading the processor

**Example Code:**
```cpp
class SensorValidator {
private:
    analog_in& sensor;
    double minValue, maxValue;
    int timeoutCount = 0;
    const int MAX_TIMEOUT = 10;
    
public:
    SensorValidator(analog_in& s, double min, double max) 
        : sensor(s), minValue(min), maxValue(max) {}
    
    // Validate sensor reading
    bool isValidReading(double value) {
        return (value >= minValue && value <= maxValue);
    }
    
    // Get sensor value with validation
    double getValidatedReading() {
        double reading = sensor.value();
        
        if (isValidReading(reading)) {
            timeoutCount = 0;  // Reset timeout counter
            return reading;
        } else {
            timeoutCount++;
            if (timeoutCount > MAX_TIMEOUT) {
                Brain.Screen.print("Sensor error: Invalid readings!");
                return -1.0;  // Error value
            }
            return reading;  // Return anyway, but log the issue
        }
    }
    
    // Check if sensor is working
    bool isSensorWorking() {
        return timeoutCount <= MAX_TIMEOUT;
    }
};

// Usage with error handling
void autonomous() {
    SensorValidator distanceSensor(DistanceSensor, 0.0, 1.0);
    
    while (true) {
        double distance = distanceSensor.getValidatedReading();
        
        if (distanceSensor.isSensorWorking()) {
            // Use the sensor reading
            if (distance < 0.5) {
                // Object detected
                leftMotor.stop();
                rightMotor.stop();
            } else {
                // Continue moving
                leftMotor.spin(forward, 50, percent);
                rightMotor.spin(forward, 50, percent);
            }
        } else {
            // Sensor failed, use backup strategy
            Brain.Screen.print("Using backup navigation");
            // Move for fixed time instead
            leftMotor.spin(forward, 50, percent);
            rightMotor.spin(forward, 50, percent);
            wait(2, seconds);
            leftMotor.stop();
            rightMotor.stop();
            break;
        }
        
        wait(10, msec);
    }
}
```

## Best Practices for Advanced Programming

### Code Organization
- **Modular design:** Breaking code into logical pieces
- **Clear naming:** Using descriptive variable and function names
- **Documentation:** Explaining complex algorithms
- **Version control:** Tracking changes and collaborating

### Testing and Validation
- **Unit testing:** Testing individual functions
- **Integration testing:** Testing how components work together
- **Simulation:** Testing code before running on real hardware
- **Iterative development:** Making small changes and testing frequently

### Performance Optimization
- **Efficient algorithms:** Choosing the right approach for the problem
- **Memory management:** Avoiding unnecessary allocations
- **Loop optimization:** Making loops as fast as possible
- **Sensor reading optimization:** Reading sensors at appropriate rates


## Conclusion

Advanced robotics programming combines mathematical concepts, sophisticated control systems, and careful software engineering. Start with simpler methods like move-by-time, then gradually work up to PID control and complex state machines. Remember that the best solution depends on your specific application - sometimes simple is better than complex.

The key to success is understanding the trade-offs between different approaches and choosing the right tool for each job. Practice with each method, understand the underlying mathematics, and always test thoroughly before competition.
