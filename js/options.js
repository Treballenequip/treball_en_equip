"use strict";

var options = function(){

    var options_data = {
        dificulty:"easy"
    };
    
    var save = function(){
        localStorage.setItem("options", JSON.stringify(options_data));
    };

    var vue_instance = new Vue({
		el: "#options_id",
		data: {
			dificulty: "easy"
		},
		created: function(){
			this.dificulty = options_data.dificulty;
		},
		methods: { 
			discard: function(){    //"DISCARD"
				this.dificulty = options_data.dificulty;
				console.log(this.dificulty);
			},
			save: function(){		//"SAVE"
				options_data.dificulty = this.dificulty;
				save();
				loadpage("../");
			},
			exit_menu: function(){  //"SEXIT"
				loadpage("../");
			}
		}
	});
    return {
		getDificulty: function (){
			return options_data.dificulty;
		}
	}; 
}();