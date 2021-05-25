 function Diagram(id,values,set) {

 	var _ = this;

 	_.maxVal = 0;
 	_.context = null;
 	_.startingAngle = 1.5*Math.PI;
 	_.centerX = 80;
 	_.centerY = 80;

 	_.set = set || {};

 	_.init = function(id,values) {

 		var canvas = document.getElementById(id);

 		if (canvas && values) {
 			_.context = canvas.getContext('2d');

 			if (_.set.type) {
 				_.centerX = 70;
 				_.centerY = 70;

 				if (_.set.type == 'percent') {
 					_.maxVal = 100;
 					_.draw(values[0], _.set.color, true, _.set.pid);
 				}

 			} else {
 				for (var i = 0; i < values.length; i++) {
 					_.maxVal += values[i];
 				}

 				if (_.set.animate) {
 					_.animate(values);
 				} else {
 					for (var i = 0; i < values.length; i++) {
 						_.draw(values[i],i);
 					}
 				}

 			}

 		}

 	};

 	_.draw = function(val,i,once,pid) {

 		var endingAngle = _.calcPath(val),
 		style = _.pathStyle(i);

 		if (once) {
 			style.r = 63;
 		}

 		if (pid) {
 			$('#'+ pid).html(val);
 		}

 		
 		_.context.beginPath();
 		_.context.arc(_.centerX, _.centerY, style.r, _.startingAngle, endingAngle);
 		_.context.lineWidth = 11;
 		_.context.strokeStyle = style.c;
 		_.context.stroke();

 	};

 	_.calcPath = function(val) {
 		var pi2 = 2*Math.PI;
 		return (pi2*val/_.maxVal+_.startingAngle);
 	};

 	_.pathStyle = function(i) {
 		var style = {};
 		switch (i) {
 			case 0:
 			style = {r: 69, c: '#fd8d40'}
 			break;
 			case 1:
 			style = {r: 57, c: '#d0295e'}
 			break;
 			case 2:
 			style = {r: 45, c: '#78c574'}
 			break;
 			case 3:
 			style = {r: 33, c: '#5195cb'}
 			break;
 		}
 		return style;
 	};

 	_.animate = function(values) {

 		
 		var newVal = new Array(values.length);
 		
 		for (var i = 0; i < newVal.length; i++) {
 			newVal[i] = 0;
 		}

 		setTimeout(function anim(st) {

 			_.context.clearRect(0,0,(_.centerX*2),(_.centerY*2));

			var c = 0;
 			for (var i = 0; i < values.length; i++) {
 				if (newVal[i] < values[i]) {
 					newVal[i] = newVal[i] + 2;
 					c++;
 				}
 				_.draw(newVal[i],i);
 				$('#'+ _.set.numId + i).html(newVal[i]);
 			}

 			if (c) {
 				setTimeout(anim, 1);
 			} else {
 				_.context.clearRect(0,0,(_.centerX*2),(_.centerY*2));
 				for (var i = 0; i < values.length; i++) {
 					_.draw(values[i],i);
 					$('#'+ _.set.numId + i).html(values[i]);
 				}
 			}

 		},1);

 	};

 	_.init(id,values,set);
 	
 }

 var diagramObject = [];
 function diagram(id,values,set) {
 	if (!(diagramObject[id] instanceof Diagram)) {
 		diagramObject[id] = new Diagram(id,values,set);
 	}
 }