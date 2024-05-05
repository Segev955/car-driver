class Driving {
    constructor(date, time, averageTemperature, averageRpm, averageSpeed, averageThrottle, fuel) {
        this._date = date;
        this._time = time;
        this._averageTemperature = averageTemperature;
        this._averageRpm = averageRpm;
        this._averageSpeed = averageSpeed;
        this._averageThrottle = averageThrottle;
        this._fuel = fuel;
    }

    // Getters
    get date() {
        return this._date;
    }

    get time() {
        return this._time;
    }

    get averageTemperature() {
        return this._averageTemperature;
    }

    get averageRpm() {
        return this._averageRpm;
    }

    get averageSpeed() {
        return this._averageSpeed;
    }

    get averageThrottle() {
        return this._averageThrottle;
    }

    get fuel() {
        return this._fuel;
    }

    // Setters
    set date(date) {
        this._date = date;
    }

    set time(time) {
        this._time = time;
    }

    set averageTemperature(averageTemperature) {
        this._averageTemperature = averageTemperature;
    }

    set averageRpm(averageRpm) {
        this._averageRpm = averageRpm;
    }

    set averageSpeed(averageSpeed) {
        this._averageSpeed = averageSpeed;
    }

    set averageThrottle(averageThrottle) {
        this._averageThrottle = averageThrottle;
    }

    set fuel(fuel) {
        this._fuel = fuel;
    }

    ////////////////

        // Method to convert User object to plain JavaScript object
        toJSON() {
            return {
                date: this._date,
                time: this._time,
                averageTemperature: this._averageTemperature,
                averageRpm: this._averageRpm,
                averageSpeed: this._averageSpeed,
                averageThrottle: this._averageThrottle,
                fuel: this._fuel
            };
        }
    
        // Method to create User object from plain JavaScript object
        static fromJSON(json) {
            return new Driving(
                json.date,
                json.formattedTime,
                json.averageTemperature,
                json.averageRpm,
                json.averageSpeed,
                json.averageThrottle,
                json.fuel // Corrected from json.faul
            );
        }
        
    
}
module.exports = {Driving};