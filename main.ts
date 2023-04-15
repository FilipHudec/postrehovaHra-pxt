const leftSensorPin = DigitalPin.P14;
const rightSensorPin = DigitalPin.P15;

pins.setPull(leftSensorPin, PinPullMode.PullNone);
pins.setPull(rightSensorPin, PinPullMode.PullNone);

let minDelay = 2000;
let maxDelay = 6000;

let elapsed = 0;
let target = 0;
let playerOne = pins.digitalReadPin(leftSensorPin) == 0;
let playerTwo = pins.digitalReadPin(rightSensorPin) == 0;



basic.forever(function(){



    // Display countdown before random delay
    for (let i = 3; i > 0; i--) {
        basic.showNumber(i);
        basic.pause(200);
    }
    basic.clearScreen();

    // Random delay between minDelay and maxDelay
    target = Math.randomRange(minDelay, maxDelay);
    let startTime = control.millis();
    let cheater = false;
    while (control.millis() - startTime < target) {
          
            if (playerOne && !playerTwo) {
                basic.showString("A");
                cheater = true;
                break;
            } else if (!playerOne && playerTwo) {
                basic.showString("B");
                cheater = true
                break;
            } else if (playerOne && playerTwo) {
                basic.showString("C");
                cheater = true
                break;
            }
            basic.clearScreen();
        

        
        basic.pause(10);
    }

    if (!cheater) {
        let elapsed = 0;
        basic.showIcon(IconNames.Heart, 0);
        control.inBackground(function(){
         music.playTone(Note.C, 1500);
        })
        while (elapsed < 1500) {
            if (playerOne && !playerTwo) {
                basic.showNumber(1);
                break;
            } else if (!playerOne && playerTwo) {
                basic.showNumber(2);
                break;
            } else if (playerOne && playerTwo) {
                basic.showString("R");
                break;
            }
            elapsed += 10;
            basic.pause(10);
        }
    }else{
        control.inBackground(function () {
            music.playTone(Note.C3, 1500);
        })
    }
    
    
    basic.pause(3000);
    basic.clearScreen();
}
)
control.inBackground(function(){
    basic.forever(function () {
        playerOne = pins.digitalReadPin(leftSensorPin) == 0;
        playerTwo = pins.digitalReadPin(rightSensorPin) == 0;
    })
})
