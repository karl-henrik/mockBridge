(function () {

var Service, Characteristic;

var lampStatus = true;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-mocklamp", "mockLamp", mockLampAccessory);
}

function mockLampAccessory(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];

    this.service = new Service.Lightbulb(this.name);
    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));
}

mockLampAccessory.prototype.getOn = function(callback) {
    callback(null,lampStatus);
}

mockLampAccessory.prototype.setOn = function(on, callback) {    
    lampStatus = on;
    console.log(lampStatus);
    callback(null,on);
}

mockLampAccessory.prototype.getServices = function() {
    return [this.service];
}

})();