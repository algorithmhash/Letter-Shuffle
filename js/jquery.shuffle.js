
(function($){
	
	$.fn.shuffle = function(shuff){
		
		var settings = $.extend({
			"step"		: 10,			// How many intervals the letters will be changed
			"fps"		: 30,			// FPS > change this to make it faster or slower
			"text"		: "", 			// Or use this instead of content
			"callback"	: function(){}	// Run only once after the animation is complete
		},shuff)
		
		return this.each(function(){
			
			var el = $(this),
				str = "";


			// Preventing parallel animations using a flag;

			if(el.data('animated')){
				return true;
			}
			
			el.data('animated',true);
			
			
			if(settings.text) {
				str = settings.text.split('');
			}
			else {
				str = el.text().split('');
			}
			
			// The types array holds the type for each character;
			// Letters holds the positions of non-space characters;
			
			var types = [],
				letters = [];

			// Looping through all the chars of the string
			
			for(var i=0;i<str.length;i++){
				
				var ch = str[i];
				
				if(ch == " "){
					types[i] = "space";
					continue;
				}
				else if(/[a-z]/.test(ch)){
					types[i] = "lowerLetter";
				}
				else if(/[A-Z]/.test(ch)){
					types[i] = "upperLetter";
				}
				else {
					types[i] = "symbol";
				}
				
				letters.push(i);
			}
			
			el.html("");			

			// Self executing named function expression:
			
			(function shuffle(start){
			
				// This code is run options.fps times per second
				// and updates the contents of the page element
					
				var i,
					len = letters.length, 
					strCopy = str.slice(0);	// Fresh copy of the string
					
				if(start>len){
					
					// The animation is complete. Updating the
					// flag and triggering the callback;
					
					el.data('animated',false);
					settings.callback(el);
					return;
				}
				
				// All the work gets done here
				for(i=Math.max(start,0); i < len; i++){

					// The start argument and options.step limit
					// the characters we will be working on at once
					
					if( i < start+settings.step){
						// Random character generation on this point
						strCopy[letters[i]] = characterGen(types[letters[i]]);
					}
					else {
						strCopy[letters[i]] = "";
					}
				}
				
				el.text(strCopy.join(""));
				
				setTimeout(function(){
					
					shuffle(start+1);
					
				},1000/options.fps);
				
			})(-options.step);
			

		});
	};
	
	function characterGen(type){
		var pool = "";
		
		if (type == "lowerLetter"){
		
		pool = "letters and number string lowercase"; //change these to have a string of letters, without spacing, of A-Z and 1-0
	}
	
	else if (type == "upperLetter"){
		
		pool = "LETTERS AND NUMBER STRING UPPERCASE"; //same as above but make sure the letters are all capitalized
	}
	
	else if (type == "symbol"){
		
		pool = "['5p3c14L Ch@r@c73r5']"; //and any special characters that are supported by browsers are accepted in this string
	} 
		var arr = pool.split('');
		return arr[Math.floor(Math.random()*arr.length)];
	}
	
})(jQuery);
