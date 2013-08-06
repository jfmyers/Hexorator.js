/*
    jQuery Hexorator Plugin
    https://github.com/Jim-LE/jquery.hexorator.js
 
	MIT licensed
    (C) 2013 Jim Myers, https://github.com/Jim-LE
   
   This jQuery plugin can be used to assign unqiue colors to pieces of text, such as a tag.
   Each tag is assigned a unique color. The plugin uses a color algorithm based on a base color
   to generate aesthetically pleasing groups of colors.

 */

(function ($) {
	/*
		Hex Object
		-Assigns unqiue colors to existing pieces of text
		-Uses the ColorAlgorithm to generate new colors
	*/
	var hexObject = function($el,options){
		//declare variables
		this.$selector = $el;
		this.$text = $.trim(this.$selector.text());
		this.$colorProperty = options.colorProperty;
		this.$existingHex = options.existingHex;
		this.$baseColor = options.baseColor == 0 ? options.baseColor = 11 : parseInt(options.baseColor); //avoid divide by zero errors
		
		//Should we use an existing HEX value or generate a new HEX value?
		if(this.getHex() != undefined){
			this.$hex = this.getHex();
		}else{
			//Looks like we haven't assigned a HEX value to this piece of text. Generate & assign a new HEX value.
			var colorAlgObj = new colorAlgorithm(this.$baseColor);
			this.$hex = colorAlgObj.$colorHex;
			this.setHex();
		}
		//Style the selected HTML element with the HEX value.
		this.addCSS();
	};
	hexObject.prototype.addCSS = function(){
		this.$selector.css(this.$colorProperty,this.$hex)
	};
	hexObject.prototype.setHex = function(){
		this.$existingHex[this.$text] = this.$hex;
	};
	hexObject.prototype.getHex = function(){
		return this.$existingHex[this.$text];
	};
	
	/*
		Color Algorithm,
		Uses a base color to generate aesthetically pleasing groups of colors.
	*/
	var colorAlgorithm = function(baseColor){
		//Define variable(s)
		this.$baseColor = baseColor;
		//Generate the HEX value
		this.$colorHex = this.generateHexValue();	
	}
	colorAlgorithm.prototype.generateHexValue = function(){
		var red = Math.floor((Math.random()*15)+1);
		var green = Math.floor((Math.random()*15)+1);
		var blue = Math.floor((Math.random()*15)+1);
		
		// Blend r,g,b colors with the base color. This makes the generated colors more aesthetically pleasing...
		red = this.forceZero(Math.floor((red + this.$baseColor)/2));
		
		green = this.forceZero(Math.floor((green + this.$baseColor)/2));
		blue = this.forceZero(Math.floor((blue + this.$baseColor)/2));
		
		var characters = this.makeHexSafe(""+red+""+green+""+blue);
		return characters;
	}
	colorAlgorithm.prototype.makeHexSafe = function(characters){
		//Convert generated numbers between 10 and 16 to their corresponding HEX letter values
		var charSplit = characters.match(/.{1,2}/g);
		var numToLetterObj={10:"AA",11:"BB",12:"CC",13:"DD",14:"EE",15:"FF"}; //HEX letter values
		var hex = "";
		for(i in charSplit){
			var pair = charSplit[i];
			if(pair > 9 && pair < 16){
				pair = numToLetterObj[pair];
			}
			hex = hex+pair;
		}
		return "#"+hex;
	}
	colorAlgorithm.prototype.forceZero = function(pair){
		//Ensure that all pairs are 2 digits. If not multiply by 10.
		if(pair < 10){
			pair = pair *10;
		}
		return pair;
	}
	
	/*Plugin Methods*/
	var methods = {
		init: function(options){
			var options = options;
			if(this.length){
				//default properties
				var defaults = {
					colorProperty: "background",//the property the color will be assigned to
					baseColor:"15",//establishes a base for all colors
					existingHex: {} //keep track of existing colors per text, assigning unqiue colors to each word
				};
				
				var options = $.extend(defaults, options);
				
				return this.each(function(i){	
					/*	
						The Hex Object uses the color aglorithm to gen. a color,
						it then assigns the color to a corresponding HTML element specified by the jquery Selector,
						it also adds values to the existingHex object to keep track of what colors have been used per piece of text...
					*/		
					new hexObject($(this),options);
				})
			}
		},
		update: function(options){
			var hex = {};
			this.each(function(item){				
				var background = $.trim($(this).css("background-color")) == "rgba(0, 0, 0, 0)" ? "" : $.trim($(this).css("background-color"));
					background = background == "rgb(0, 0, 0, 0)" ? "" : background;					
				var text = $.trim($(this).text());
				if(text != "" && background != ""){
					if(hex[text] == undefined ){
						hex[text]=background;
					}
				}
			})
			var options = {colorProperty:"background",baseColor:10,existingHex:hex};
			return this.each(function(i){
				new hexObject($(this),options);
			})
		}
	}
	
	$.fn.hexorator = function (method) {
		if(methods[method]){
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		}else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}else{
			$.error( 'Method ' +  method + ' does not exist on jQuery.pluginName' );
		}
	};
	
})(jQuery);