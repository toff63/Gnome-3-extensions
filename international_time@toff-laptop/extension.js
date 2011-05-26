const St = imports.gi.St;
const Mainloop = imports.mainloop;
const PanelMenu = imports.ui.panelMenu;
const Lang = imports.lang;

const Main = imports.ui.main;

function ClockButton() {
    this._init();
}

ClockButton.prototype = {
    _init: function() {
        this.actor = new St.Bin({ style_class: 'panel-button',
                                  reactive: true,
                                  can_focus: true,
                                  x_fill: true,
                                  y_fill: false,
                                  track_hover: true });
        this.actor._delegate = this;

        this._clock = new St.Label();
        this.actor.set_child(this._clock);

				Main.panel._centerBox.add(this.actor, { y_fill: true});
        // Start the clock
        this._updateClock();
    },

    _updateClock: function() {
				global.log("Updated dates")
				function localeDate()  {
    				let d = new Date();
    				let localTime = d.getTime();
    				let localOffset = d.getTimezoneOffset() * 60000;
    				this.utc = localTime + localOffset;
						let ensureTwoDigitNumber = function(i){
							if(i < 10) return "0" + i;
							return i;
						}
						let format = function(d){
							return ensureTwoDigitNumber(d.getHours()) + ":" + ensureTwoDigitNumber(d.getMinutes());
						};
						this.locale = function(offset) {
							return format(new Date(this.utc + (3600000*offset))); 
						};
				}
				let l = new localeDate();
        let dateDisplay = "London: " + l.locale(1);
				dateDisplay += "\tClermont-Fd: " + l.locale(2);
				dateDisplay += "\tToronto: " + l.locale(-4);
        this._clock.set_text(dateDisplay);
				Mainloop.timeout_add(30000, Lang.bind(this, function(){
						  global.log("callback called " + new Date());
						  global.log("this is:  " + this);
							this._updateClock(); 
						}));
        return false;
    }
};


function main() {
	let londonButton = new ClockButton();	
}
