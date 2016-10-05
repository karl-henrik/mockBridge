(function (){
    
var Service, Characteristic;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-mocktempsensor", "mockTempSensor", mockTempSensor);
}

function getRandomTemperature() {
    var x = Math.random();
    return 23.0 + x;
}

function mockTempSensor(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];
    var t = this;
    this.service = new Service.TemperatureSensor(this.name);
    var tempCar = this.service
        .getCharacteristic(Characteristic.CurrentTemperature);

    tempCar.on('get', this.getOn.bind(this));
    
    setInterval(function() {
        var temp = getRandomTemperature();    
        var tempCar = t.service.getCharacteristic(Characteristic.CurrentTemperature);

        tempCar.setValue(temp);
        console.log("Trigg ", temp);
    }, 60000);

    console.log(this.service);
}

mockTempSensor.prototype.getOn = function(callback) {
    
    var temp = getRandomTemperature();

    console.log("Temp is", temp);
    callback(null,temp);
}


mockTempSensor.prototype.getServices = function() {
    return [this.service];
    
}
})();