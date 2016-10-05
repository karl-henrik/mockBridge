(function () {

var Service, Characteristic;

var switchStatus = true;

module.exports = function(homebridge) {
    Service = homebridge.hap.Service;
    Characteristic = homebridge.hap.Characteristic;

    homebridge.registerAccessory("homebridge-mockswitch", "mockSwitch", mockSwitchAccessory);
}

function mockSwitchAccessory(log, config) {
    this.log = log;
    this.config = config;
    this.name = config["name"];

    this.service = new Service.Switch(this.name);
    this.service
        .getCharacteristic(Characteristic.On)
        .on('get', this.getOn.bind(this))
        .on('set', this.setOn.bind(this));
}

mockSwitchAccessory.prototype.getOn = function(callback) {
    callback(null,switchStatus);
}

mockSwitchAccessory.prototype.setOn = function(on, callback) {    
    switchStatus = on;
    console.log(switchStatus);
    callback(null,on);
}

mockSwitchAccessory.prototype.getServices = function() {
    return [this.service];
}

})();