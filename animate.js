(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [
		{name:"animate_atlas_1", frames: [[0,0,1400,1400]]},
		{name:"animate_atlas_2", frames: [[842,0,404,954],[0,0,840,1137]]}
];


(lib.AnMovieClip = function(){
	this.actionFrames = [];
	this.ignorePause = false;
	this.currentSoundStreamInMovieclip;
	this.soundStreamDuration = new Map();
	this.streamSoundSymbolsList = [];

	this.gotoAndPlayForStreamSoundSync = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.gotoAndPlay = function(positionOrLabel){
		this.clearAllSoundStreams();
		var pos = this.timeline.resolve(positionOrLabel);
		if (pos != null) { this.startStreamSoundsForTargetedFrame(pos); }
		cjs.MovieClip.prototype.gotoAndPlay.call(this,positionOrLabel);
	}
	this.play = function(){
		this.clearAllSoundStreams();
		this.startStreamSoundsForTargetedFrame(this.currentFrame);
		cjs.MovieClip.prototype.play.call(this);
	}
	this.gotoAndStop = function(positionOrLabel){
		cjs.MovieClip.prototype.gotoAndStop.call(this,positionOrLabel);
		this.clearAllSoundStreams();
	}
	this.stop = function(){
		cjs.MovieClip.prototype.stop.call(this);
		this.clearAllSoundStreams();
	}
	this.startStreamSoundsForTargetedFrame = function(targetFrame){
		for(var index=0; index<this.streamSoundSymbolsList.length; index++){
			if(index <= targetFrame && this.streamSoundSymbolsList[index] != undefined){
				for(var i=0; i<this.streamSoundSymbolsList[index].length; i++){
					var sound = this.streamSoundSymbolsList[index][i];
					if(sound.endFrame > targetFrame){
						var targetPosition = Math.abs((((targetFrame - sound.startFrame)/lib.properties.fps) * 1000));
						var instance = playSound(sound.id);
						var remainingLoop = 0;
						if(sound.offset){
							targetPosition = targetPosition + sound.offset;
						}
						else if(sound.loop > 1){
							var loop = targetPosition /instance.duration;
							remainingLoop = Math.floor(sound.loop - loop);
							if(targetPosition == 0){ remainingLoop -= 1; }
							targetPosition = targetPosition % instance.duration;
						}
						instance.loop = remainingLoop;
						instance.position = Math.round(targetPosition);
						this.InsertIntoSoundStreamData(instance, sound.startFrame, sound.endFrame, sound.loop , sound.offset);
					}
				}
			}
		}
	}
	this.InsertIntoSoundStreamData = function(soundInstance, startIndex, endIndex, loopValue, offsetValue){ 
 		this.soundStreamDuration.set({instance:soundInstance}, {start: startIndex, end:endIndex, loop:loopValue, offset:offsetValue});
	}
	this.clearAllSoundStreams = function(){
		this.soundStreamDuration.forEach(function(value,key){
			key.instance.stop();
		});
 		this.soundStreamDuration.clear();
		this.currentSoundStreamInMovieclip = undefined;
	}
	this.stopSoundStreams = function(currentFrame){
		if(this.soundStreamDuration.size > 0){
			var _this = this;
			this.soundStreamDuration.forEach(function(value,key,arr){
				if((value.end) == currentFrame){
					key.instance.stop();
					if(_this.currentSoundStreamInMovieclip == key) { _this.currentSoundStreamInMovieclip = undefined; }
					arr.delete(key);
				}
			});
		}
	}

	this.computeCurrentSoundStreamInstance = function(currentFrame){
		if(this.currentSoundStreamInMovieclip == undefined){
			var _this = this;
			if(this.soundStreamDuration.size > 0){
				var maxDuration = 0;
				this.soundStreamDuration.forEach(function(value,key){
					if(value.end > maxDuration){
						maxDuration = value.end;
						_this.currentSoundStreamInMovieclip = key;
					}
				});
			}
		}
	}
	this.getDesiredFrame = function(currentFrame, calculatedDesiredFrame){
		for(var frameIndex in this.actionFrames){
			if((frameIndex > currentFrame) && (frameIndex < calculatedDesiredFrame)){
				return frameIndex;
			}
		}
		return calculatedDesiredFrame;
	}

	this.syncStreamSounds = function(){
		this.stopSoundStreams(this.currentFrame);
		this.computeCurrentSoundStreamInstance(this.currentFrame);
		if(this.currentSoundStreamInMovieclip != undefined){
			var soundInstance = this.currentSoundStreamInMovieclip.instance;
			if(soundInstance.position != 0){
				var soundValue = this.soundStreamDuration.get(this.currentSoundStreamInMovieclip);
				var soundPosition = (soundValue.offset?(soundInstance.position - soundValue.offset): soundInstance.position);
				var calculatedDesiredFrame = (soundValue.start)+((soundPosition/1000) * lib.properties.fps);
				if(soundValue.loop > 1){
					calculatedDesiredFrame +=(((((soundValue.loop - soundInstance.loop -1)*soundInstance.duration)) / 1000) * lib.properties.fps);
				}
				calculatedDesiredFrame = Math.floor(calculatedDesiredFrame);
				var deltaFrame = calculatedDesiredFrame - this.currentFrame;
				if((deltaFrame >= 0) && this.ignorePause){
					cjs.MovieClip.prototype.play.call(this);
					this.ignorePause = false;
				}
				else if(deltaFrame >= 2){
					this.gotoAndPlayForStreamSoundSync(this.getDesiredFrame(this.currentFrame,calculatedDesiredFrame));
				}
				else if(deltaFrame <= -2){
					cjs.MovieClip.prototype.stop.call(this);
					this.ignorePause = true;
				}
			}
		}
	}
}).prototype = p = new cjs.MovieClip();
// symbols:



(lib.CachedBmp_10 = function() {
	this.initialize(img.CachedBmp_10);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2172,954);


(lib.CachedBmp_9 = function() {
	this.initialize(ss["animate_atlas_2"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_8 = function() {
	this.initialize(img.CachedBmp_8);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2348,954);


(lib.CachedBmp_7 = function() {
	this.initialize(img.CachedBmp_7);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,4656,954);


(lib.CachedBmp_6 = function() {
	this.initialize(img.CachedBmp_6);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,5363,954);


(lib.CachedBmp_5 = function() {
	this.initialize(img.CachedBmp_5);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2324,466);


(lib.CachedBmp_4 = function() {
	this.initialize(ss["animate_atlas_1"]);
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_3 = function() {
	this.initialize(ss["animate_atlas_2"]);
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.CachedBmp_14 = function() {
	this.initialize(img.CachedBmp_14);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2050,2050);


(lib.CachedBmp_13 = function() {
	this.initialize(img.CachedBmp_13);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,2050,2050);// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop, this.reversed));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Group = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_10();
	this.instance.setTransform(692.35,298.7,0.2584,0.2584);

	this.instance_1 = new lib.CachedBmp_9();
	this.instance_1.setTransform(600.6,298.7,0.2584,0.2584);

	this.instance_2 = new lib.CachedBmp_8();
	this.instance_2.setTransform(-2,298.7,0.2584,0.2584);

	this.instance_3 = new lib.CachedBmp_7();
	this.instance_3.setTransform(-2,118.7,0.2584,0.2584);

	this.instance_4 = new lib.CachedBmp_6();
	this.instance_4.setTransform(-2,-61.15,0.2584,0.2584);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4},{t:this.instance_3},{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Group, new cjs.Rectangle(-2,-61.1,1386,606.4), null);


(lib.Символ4 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f().s("#000000").p("EhP/hP/MCf/AAAMAAACf/Mif/AAAg");
	this.shape.setTransform(512,512);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#000000").s().p("EhP/BQAMAAAif/MCf/AAAMAAACf/g");
	this.shape_1.setTransform(512,512);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.shape}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ4, new cjs.Rectangle(-1,-1,1026,1026), null);


(lib.Символ1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_3();
	this.instance.setTransform(0,0,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ1, new cjs.Rectangle(0,0,420,568.5), null);


(lib.Path_1 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EghIA66QtOkzr2pQQj9jHjHjEQidiZgRgnQQJnZRrqmQTmrxQRsqQSfuYLjtkQNEvWDLtKQAMgyB+CQQCICdCkEPQHBLnDfNgQErSDjfQJQkWUJwxPZQ0YSs2LD3QltBAlwAAQsMAAsVkeg");
	this.shape.setTransform(435.1179,405.4234);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path_1, new cjs.Rectangle(0,-0.2,870.3,811.3000000000001), null);


(lib.Path = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("Egc5AtoQrziiqrmJQjriHiziIQiThvgPghQGJi0KIkTQLzk9GJioQWxpvN6nZQThqZLVqRQNfsNDIs/QAzCaArEIQBWIPgmIjQg0L+kkK4QlsNlrQLGQwjQWy8FCQoPCMoeAAQnNAAnYhlg");
	this.shape.setTransform(386.3693,302.1146);

	this.timeline.addTween(cjs.Tween.get(this.shape).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Path, new cjs.Rectangle(0,0,772.8,604.3), null);


(lib.Символ3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.CachedBmp_5();
	this.instance.setTransform(1543.4,1195.25,0.5,0.5);

	this.instance_1 = new lib.Group();
	this.instance_1.setTransform(1340.85,586.95,1.9346,1.9346,0,0,0,691.1,242.2);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ3, new cjs.Rectangle(0,0.1,2705.4,1428.2), null);


(lib.Символ2 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	// Слой_1
	this.instance = new lib.Path();
	this.instance.setTransform(4.05,6.95,0.0102,0.0102,0,0,180,383.8,300.2);
	this.instance.alpha = 0.1914;

	this.instance_1 = new lib.Path_1();
	this.instance_1.setTransform(4.45,5.85,0.0102,0.0102,0,0,180,432.9,408.4);
	this.instance_1.alpha = 0.1914;

	this.instance_2 = new lib.CachedBmp_4();
	this.instance_2.setTransform(0.05,0,0.0071,0.0071);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

	this._renderFirstFrame();

}).prototype = getMCSymbolPrototype(lib.Символ2, new cjs.Rectangle(0,0,10,10.1), null);


// stage content:
(lib.Безымянный3 = function(mode,startPosition,loop,reversed) {
if (loop == null) { loop = true; }
if (reversed == null) { reversed = false; }
	var props = new Object();
	props.mode = mode;
	props.startPosition = startPosition;
	props.labels = {};
	props.loop = loop;
	props.reversed = reversed;
	cjs.MovieClip.apply(this,[props]);

	this.actionFrames = [0];
	this.streamSoundSymbolsList[0] = [{id:"Driftingat432HzUnicornHeads",startFrame:0,endFrame:554,loop:1,offset:0}];
	// timeline functions:
	this.frame_0 = function() {
		this.clearAllSoundStreams();
		 
		var soundInstance = playSound("Driftingat432HzUnicornHeads",0);
		this.InsertIntoSoundStreamData(soundInstance,0,554,1);
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(554));

	// Темныйслой
	this.instance = new lib.Символ4();
	this.instance.setTransform(512,512,1,1,0,0,0,512,512);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(520).to({_off:false},0).wait(1).to({alpha:0.0303},0).wait(1).to({alpha:0.0606},0).wait(1).to({alpha:0.0909},0).wait(1).to({alpha:0.1212},0).wait(1).to({alpha:0.1515},0).wait(1).to({alpha:0.1818},0).wait(1).to({alpha:0.2121},0).wait(1).to({alpha:0.2424},0).wait(1).to({alpha:0.2727},0).wait(1).to({alpha:0.303},0).wait(1).to({alpha:0.3333},0).wait(1).to({alpha:0.3636},0).wait(1).to({alpha:0.3939},0).wait(1).to({alpha:0.4242},0).wait(1).to({alpha:0.4545},0).wait(1).to({alpha:0.4848},0).wait(1).to({alpha:0.5152},0).wait(1).to({alpha:0.5455},0).wait(1).to({alpha:0.5758},0).wait(1).to({alpha:0.6061},0).wait(1).to({alpha:0.6364},0).wait(1).to({alpha:0.6667},0).wait(1).to({alpha:0.697},0).wait(1).to({alpha:0.7273},0).wait(1).to({alpha:0.7576},0).wait(1).to({alpha:0.7879},0).wait(1).to({alpha:0.8182},0).wait(1).to({alpha:0.8485},0).wait(1).to({alpha:0.8788},0).wait(1).to({alpha:0.9091},0).wait(1).to({alpha:0.9394},0).wait(1).to({alpha:0.9697},0).wait(1).to({alpha:1},0).wait(1));

	// Круг (mask)
	var mask = new cjs.Shape();
	mask._off = true;
	var mask_graphics_447 = new cjs.Graphics().p("EgT0AxgQoOoOAArnQAAroIOoOQINoNLnAAQLoAAININQIOIOAALoQAALnoOIOQoNIOroAAQrnAAoNoOg");
	var mask_graphics_448 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_449 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_450 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_451 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_452 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_453 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_454 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_455 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_456 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_457 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_458 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_459 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_460 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_461 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_462 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_463 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_464 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_465 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_466 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_467 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_468 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_469 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_470 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_471 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_472 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_473 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_474 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_475 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_476 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_477 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_478 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_479 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_480 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_481 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_482 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_483 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_484 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_485 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_486 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_487 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_488 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_489 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_490 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_491 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_492 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_493 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_494 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_495 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_496 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_497 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_498 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_499 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_500 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_501 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_502 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_503 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_504 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_505 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_506 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_507 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_508 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_509 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_510 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_511 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_512 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_513 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_514 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_515 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_516 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_517 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_518 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_519 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_520 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_521 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_522 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_523 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_524 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_525 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_526 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_527 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_528 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_529 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_530 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_531 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_532 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_533 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_534 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_535 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_536 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_537 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_538 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_539 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_540 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_541 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_542 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIPoNLmAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrmAAoPoOg");
	var mask_graphics_543 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_544 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQIOoNLmAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrmAAoOoOg");
	var mask_graphics_545 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_546 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_547 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_548 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_549 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoNoOg");
	var mask_graphics_550 = new cjs.Graphics().p("Az0T1QoOoNAAroQAArnIOoOQINoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoNoOg");
	var mask_graphics_551 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLnAAIOINQIOIOAALnQAALooOINQoOIOrnAAQrnAAoOoOg");
	var mask_graphics_552 = new cjs.Graphics().p("Az1T1QoNoNAAroQAArnINoOQIOoNLnAAQLoAAININQIOIOAALnQAALooOINQoNIOroAAQrnAAoOoOg");
	var mask_graphics_553 = new cjs.Graphics().p("EAgIAxgQoOoOAArnQAAroIOoOQIOoNLnAAQLnAAIOINQIOIOAALoQAALnoOIOQoOIOrnAAQrnAAoOoOg");

	this.timeline.addTween(cjs.Tween.get(mask).to({graphics:null,x:0,y:0}).wait(447).to({graphics:mask_graphics_447,x:179.5,y:369.375}).wait(1).to({graphics:mask_graphics_448,x:185.75,y:559.25}).wait(1).to({graphics:mask_graphics_449,x:192.05,y:559.25}).wait(1).to({graphics:mask_graphics_450,x:198.3,y:559.25}).wait(1).to({graphics:mask_graphics_451,x:204.6,y:559.25}).wait(1).to({graphics:mask_graphics_452,x:210.85,y:559.25}).wait(1).to({graphics:mask_graphics_453,x:217.15,y:559.25}).wait(1).to({graphics:mask_graphics_454,x:223.4,y:559.25}).wait(1).to({graphics:mask_graphics_455,x:229.7,y:559.25}).wait(1).to({graphics:mask_graphics_456,x:235.95,y:559.25}).wait(1).to({graphics:mask_graphics_457,x:242.25,y:559.25}).wait(1).to({graphics:mask_graphics_458,x:248.5,y:559.25}).wait(1).to({graphics:mask_graphics_459,x:254.8,y:559.25}).wait(1).to({graphics:mask_graphics_460,x:261.05,y:559.25}).wait(1).to({graphics:mask_graphics_461,x:267.35,y:559.25}).wait(1).to({graphics:mask_graphics_462,x:273.6,y:559.25}).wait(1).to({graphics:mask_graphics_463,x:279.9,y:559.25}).wait(1).to({graphics:mask_graphics_464,x:286.15,y:559.25}).wait(1).to({graphics:mask_graphics_465,x:292.45,y:559.25}).wait(1).to({graphics:mask_graphics_466,x:298.7,y:559.25}).wait(1).to({graphics:mask_graphics_467,x:304.95,y:559.25}).wait(1).to({graphics:mask_graphics_468,x:311.25,y:559.25}).wait(1).to({graphics:mask_graphics_469,x:317.5,y:559.25}).wait(1).to({graphics:mask_graphics_470,x:323.8,y:559.25}).wait(1).to({graphics:mask_graphics_471,x:330.05,y:559.25}).wait(1).to({graphics:mask_graphics_472,x:336.35,y:559.25}).wait(1).to({graphics:mask_graphics_473,x:342.6,y:559.25}).wait(1).to({graphics:mask_graphics_474,x:348.9,y:559.25}).wait(1).to({graphics:mask_graphics_475,x:355.15,y:559.25}).wait(1).to({graphics:mask_graphics_476,x:361.45,y:559.25}).wait(1).to({graphics:mask_graphics_477,x:367.7,y:559.25}).wait(1).to({graphics:mask_graphics_478,x:374,y:559.25}).wait(1).to({graphics:mask_graphics_479,x:380.25,y:559.25}).wait(1).to({graphics:mask_graphics_480,x:386.55,y:559.25}).wait(1).to({graphics:mask_graphics_481,x:392.8,y:559.25}).wait(1).to({graphics:mask_graphics_482,x:399.05,y:559.25}).wait(1).to({graphics:mask_graphics_483,x:405.35,y:559.25}).wait(1).to({graphics:mask_graphics_484,x:411.6,y:559.25}).wait(1).to({graphics:mask_graphics_485,x:417.9,y:559.25}).wait(1).to({graphics:mask_graphics_486,x:424.15,y:559.25}).wait(1).to({graphics:mask_graphics_487,x:430.45,y:559.25}).wait(1).to({graphics:mask_graphics_488,x:436.7,y:559.25}).wait(1).to({graphics:mask_graphics_489,x:443,y:559.25}).wait(1).to({graphics:mask_graphics_490,x:449.25,y:559.25}).wait(1).to({graphics:mask_graphics_491,x:455.55,y:559.25}).wait(1).to({graphics:mask_graphics_492,x:461.8,y:559.25}).wait(1).to({graphics:mask_graphics_493,x:468.1,y:559.25}).wait(1).to({graphics:mask_graphics_494,x:474.35,y:559.25}).wait(1).to({graphics:mask_graphics_495,x:480.65,y:559.25}).wait(1).to({graphics:mask_graphics_496,x:486.9,y:559.25}).wait(1).to({graphics:mask_graphics_497,x:493.2,y:559.25}).wait(1).to({graphics:mask_graphics_498,x:499.45,y:559.25}).wait(1).to({graphics:mask_graphics_499,x:505.75,y:559.25}).wait(1).to({graphics:mask_graphics_500,x:512,y:559.25}).wait(1).to({graphics:mask_graphics_501,x:518.25,y:559.25}).wait(1).to({graphics:mask_graphics_502,x:524.55,y:559.25}).wait(1).to({graphics:mask_graphics_503,x:530.8,y:559.25}).wait(1).to({graphics:mask_graphics_504,x:537.1,y:559.25}).wait(1).to({graphics:mask_graphics_505,x:543.35,y:559.25}).wait(1).to({graphics:mask_graphics_506,x:549.65,y:559.25}).wait(1).to({graphics:mask_graphics_507,x:555.9,y:559.25}).wait(1).to({graphics:mask_graphics_508,x:562.2,y:559.25}).wait(1).to({graphics:mask_graphics_509,x:568.45,y:559.25}).wait(1).to({graphics:mask_graphics_510,x:574.75,y:559.25}).wait(1).to({graphics:mask_graphics_511,x:581,y:559.25}).wait(1).to({graphics:mask_graphics_512,x:587.3,y:559.25}).wait(1).to({graphics:mask_graphics_513,x:593.55,y:559.25}).wait(1).to({graphics:mask_graphics_514,x:599.85,y:559.25}).wait(1).to({graphics:mask_graphics_515,x:606.1,y:559.25}).wait(1).to({graphics:mask_graphics_516,x:612.4,y:559.25}).wait(1).to({graphics:mask_graphics_517,x:618.65,y:559.25}).wait(1).to({graphics:mask_graphics_518,x:624.95,y:559.25}).wait(1).to({graphics:mask_graphics_519,x:631.2,y:559.25}).wait(1).to({graphics:mask_graphics_520,x:637.45,y:559.25}).wait(1).to({graphics:mask_graphics_521,x:643.75,y:559.25}).wait(1).to({graphics:mask_graphics_522,x:650,y:559.25}).wait(1).to({graphics:mask_graphics_523,x:656.3,y:559.25}).wait(1).to({graphics:mask_graphics_524,x:662.55,y:559.25}).wait(1).to({graphics:mask_graphics_525,x:668.85,y:559.25}).wait(1).to({graphics:mask_graphics_526,x:675.1,y:559.25}).wait(1).to({graphics:mask_graphics_527,x:681.4,y:559.25}).wait(1).to({graphics:mask_graphics_528,x:687.65,y:559.25}).wait(1).to({graphics:mask_graphics_529,x:693.95,y:559.25}).wait(1).to({graphics:mask_graphics_530,x:700.2,y:559.25}).wait(1).to({graphics:mask_graphics_531,x:706.5,y:559.25}).wait(1).to({graphics:mask_graphics_532,x:712.75,y:559.25}).wait(1).to({graphics:mask_graphics_533,x:719.05,y:559.25}).wait(1).to({graphics:mask_graphics_534,x:725.3,y:559.25}).wait(1).to({graphics:mask_graphics_535,x:731.55,y:559.25}).wait(1).to({graphics:mask_graphics_536,x:737.85,y:559.25}).wait(1).to({graphics:mask_graphics_537,x:744.1,y:559.25}).wait(1).to({graphics:mask_graphics_538,x:750.4,y:559.25}).wait(1).to({graphics:mask_graphics_539,x:756.65,y:559.25}).wait(1).to({graphics:mask_graphics_540,x:762.95,y:559.25}).wait(1).to({graphics:mask_graphics_541,x:769.2,y:559.25}).wait(1).to({graphics:mask_graphics_542,x:775.5,y:559.25}).wait(1).to({graphics:mask_graphics_543,x:781.75,y:559.25}).wait(1).to({graphics:mask_graphics_544,x:788.05,y:559.25}).wait(1).to({graphics:mask_graphics_545,x:794.3,y:559.25}).wait(1).to({graphics:mask_graphics_546,x:800.6,y:559.25}).wait(1).to({graphics:mask_graphics_547,x:806.85,y:559.25}).wait(1).to({graphics:mask_graphics_548,x:813.15,y:559.25}).wait(1).to({graphics:mask_graphics_549,x:819.4,y:559.25}).wait(1).to({graphics:mask_graphics_550,x:825.7,y:559.25}).wait(1).to({graphics:mask_graphics_551,x:831.95,y:559.25}).wait(1).to({graphics:mask_graphics_552,x:838.25,y:559.25}).wait(1).to({graphics:mask_graphics_553,x:512,y:369.375}).wait(1));

	// Текст
	this.instance_1 = new lib.Символ3();
	this.instance_1.setTransform(570.85,578.95,1,1,0,0,0,1352.9,714.1);
	this.instance_1.alpha = 0;
	this.instance_1._off = true;

	var maskedShapeInstanceList = [this.instance_1];

	for(var shapedInstanceItr = 0; shapedInstanceItr < maskedShapeInstanceList.length; shapedInstanceItr++) {
		maskedShapeInstanceList[shapedInstanceItr].mask = mask;
	}

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(294).to({_off:false},0).wait(1).to({regX:1352.7,regY:714.2,scaleX:0.995,scaleY:0.995,x:570.7,y:579.05,alpha:0.0065},0).wait(1).to({scaleX:0.9901,scaleY:0.9901,alpha:0.0131},0).wait(1).to({scaleX:0.9851,scaleY:0.9851,alpha:0.0196},0).wait(1).to({scaleX:0.9802,scaleY:0.9802,x:570.65,y:579.1,alpha:0.0261},0).wait(1).to({scaleX:0.9752,scaleY:0.9752,alpha:0.0327},0).wait(1).to({scaleX:0.9703,scaleY:0.9703,y:579.05,alpha:0.0392},0).wait(1).to({scaleX:0.9653,scaleY:0.9653,alpha:0.0458},0).wait(1).to({scaleX:0.9603,scaleY:0.9603,x:570.7,alpha:0.0523},0).wait(1).to({scaleX:0.9554,scaleY:0.9554,y:579.1,alpha:0.0588},0).wait(1).to({scaleX:0.9504,scaleY:0.9504,alpha:0.0654},0).wait(1).to({scaleX:0.9455,scaleY:0.9455,y:579.05,alpha:0.0719},0).wait(1).to({scaleX:0.9405,scaleY:0.9405,x:570.65,alpha:0.0784},0).wait(1).to({scaleX:0.9356,scaleY:0.9356,alpha:0.085},0).wait(1).to({scaleX:0.9306,scaleY:0.9306,y:579.1,alpha:0.0915},0).wait(1).to({scaleX:0.9256,scaleY:0.9256,alpha:0.098},0).wait(1).to({scaleX:0.9207,scaleY:0.9207,x:570.7,y:579.05,alpha:0.1046},0).wait(1).to({scaleX:0.9157,scaleY:0.9157,alpha:0.1111},0).wait(1).to({scaleX:0.9108,scaleY:0.9108,alpha:0.1176},0).wait(1).to({scaleX:0.9058,scaleY:0.9058,y:579.1,alpha:0.1242},0).wait(1).to({scaleX:0.9009,scaleY:0.9009,alpha:0.1307},0).wait(1).to({scaleX:0.8959,scaleY:0.8959,x:570.65,y:579.05,alpha:0.1373},0).wait(1).to({scaleX:0.8909,scaleY:0.8909,alpha:0.1438},0).wait(1).to({scaleX:0.886,scaleY:0.886,alpha:0.1503},0).wait(1).to({scaleX:0.881,scaleY:0.881,x:570.7,alpha:0.1569},0).wait(1).to({scaleX:0.8761,scaleY:0.8761,y:579.1,alpha:0.1634},0).wait(1).to({scaleX:0.8711,scaleY:0.8711,y:579.05,alpha:0.1699},0).wait(1).to({scaleX:0.8662,scaleY:0.8662,alpha:0.1765},0).wait(1).to({scaleX:0.8612,scaleY:0.8612,alpha:0.183},0).wait(1).to({scaleX:0.8562,scaleY:0.8562,x:570.65,alpha:0.1895},0).wait(1).to({scaleX:0.8513,scaleY:0.8513,y:579.1,alpha:0.1961},0).wait(1).to({scaleX:0.8463,scaleY:0.8463,y:579.05,alpha:0.2026},0).wait(1).to({scaleX:0.8414,scaleY:0.8414,x:570.7,alpha:0.2092},0).wait(1).to({scaleX:0.8364,scaleY:0.8364,alpha:0.2157},0).wait(1).to({scaleX:0.8315,scaleY:0.8315,alpha:0.2222},0).wait(1).to({scaleX:0.8265,scaleY:0.8265,y:579.1,alpha:0.2288},0).wait(1).to({scaleX:0.8215,scaleY:0.8215,y:579.05,alpha:0.2353},0).wait(1).to({scaleX:0.8166,scaleY:0.8166,alpha:0.2418},0).wait(1).to({scaleX:0.8116,scaleY:0.8116,x:570.65,alpha:0.2484},0).wait(1).to({scaleX:0.8067,scaleY:0.8067,y:579,alpha:0.2549},0).wait(1).to({scaleX:0.8017,scaleY:0.8017,x:570.7,alpha:0.2614},0).wait(1).to({scaleX:0.7968,scaleY:0.7968,alpha:0.268},0).wait(1).to({scaleX:0.7918,scaleY:0.7918,alpha:0.2745},0).wait(1).to({scaleX:0.7868,scaleY:0.7868,alpha:0.281},0).wait(1).to({scaleX:0.7819,scaleY:0.7819,alpha:0.2876},0).wait(1).to({scaleX:0.7769,scaleY:0.7769,alpha:0.2941},0).wait(1).to({scaleX:0.772,scaleY:0.772,alpha:0.3007},0).wait(1).to({scaleX:0.767,scaleY:0.767,x:570.65,alpha:0.3072},0).wait(1).to({scaleX:0.7621,scaleY:0.7621,x:570.7,alpha:0.3137},0).wait(1).to({scaleX:0.7571,scaleY:0.7571,alpha:0.3203},0).wait(1).to({scaleX:0.7521,scaleY:0.7521,y:579.05,alpha:0.3268},0).wait(1).to({scaleX:0.7472,scaleY:0.7472,y:579,alpha:0.3333},0).wait(1).to({scaleX:0.7422,scaleY:0.7422,alpha:0.3399},0).wait(1).to({scaleX:0.7373,scaleY:0.7373,alpha:0.3464},0).wait(1).to({scaleX:0.7323,scaleY:0.7323,alpha:0.3529},0).wait(1).to({scaleX:0.7274,scaleY:0.7274,x:570.65,alpha:0.3595},0).wait(1).to({scaleX:0.7224,scaleY:0.7224,x:570.7,alpha:0.366},0).wait(1).to({scaleX:0.7174,scaleY:0.7174,x:570.75,alpha:0.3725},0).wait(1).to({scaleX:0.7125,scaleY:0.7125,x:570.7,alpha:0.3791},0).wait(1).to({scaleX:0.7075,scaleY:0.7075,alpha:0.3856},0).wait(1).to({scaleX:0.7026,scaleY:0.7026,alpha:0.3922},0).wait(1).to({scaleX:0.6976,scaleY:0.6976,y:579.05,alpha:0.3987},0).wait(1).to({scaleX:0.6927,scaleY:0.6927,y:579,alpha:0.4052},0).wait(1).to({scaleX:0.6877,scaleY:0.6877,x:570.75,alpha:0.4118},0).wait(1).to({scaleX:0.6827,scaleY:0.6827,x:570.7,alpha:0.4183},0).wait(1).to({scaleX:0.6778,scaleY:0.6778,x:570.75,alpha:0.4248},0).wait(1).to({scaleX:0.6728,scaleY:0.6728,y:579.05,alpha:0.4314},0).wait(1).to({scaleX:0.6679,scaleY:0.6679,x:570.7,y:579,alpha:0.4379},0).wait(1).to({scaleX:0.6629,scaleY:0.6629,alpha:0.4444},0).wait(1).to({scaleX:0.658,scaleY:0.658,alpha:0.451},0).wait(1).to({scaleX:0.653,scaleY:0.653,alpha:0.4575},0).wait(1).to({scaleX:0.648,scaleY:0.648,x:570.75,alpha:0.4641},0).wait(1).to({scaleX:0.6431,scaleY:0.6431,alpha:0.4706},0).wait(1).to({scaleX:0.6381,scaleY:0.6381,alpha:0.4771},0).wait(1).to({scaleX:0.6332,scaleY:0.6332,alpha:0.4837},0).wait(1).to({scaleX:0.6282,scaleY:0.6282,x:570.7,alpha:0.4902},0).wait(1).to({scaleX:0.6233,scaleY:0.6233,alpha:0.4967},0).wait(1).to({scaleX:0.6183,scaleY:0.6183,alpha:0.5033},0).wait(1).to({scaleX:0.6133,scaleY:0.6133,alpha:0.5098},0).wait(1).to({scaleX:0.6084,scaleY:0.6084,x:570.75,alpha:0.5163},0).wait(1).to({scaleX:0.6034,scaleY:0.6034,alpha:0.5229},0).wait(1).to({scaleX:0.5985,scaleY:0.5985,alpha:0.5294},0).wait(1).to({scaleX:0.5935,scaleY:0.5935,alpha:0.5359},0).wait(1).to({scaleX:0.5886,scaleY:0.5886,alpha:0.5425},0).wait(1).to({scaleX:0.5836,scaleY:0.5836,x:570.7,alpha:0.549},0).wait(1).to({scaleX:0.5786,scaleY:0.5786,alpha:0.5556},0).wait(1).to({scaleX:0.5737,scaleY:0.5737,alpha:0.5621},0).wait(1).to({scaleX:0.5687,scaleY:0.5687,x:570.75,y:578.95,alpha:0.5686},0).wait(1).to({scaleX:0.5638,scaleY:0.5638,y:579,alpha:0.5752},0).wait(1).to({scaleX:0.5588,scaleY:0.5588,alpha:0.5817},0).wait(1).to({scaleX:0.5539,scaleY:0.5539,alpha:0.5882},0).wait(1).to({scaleX:0.5489,scaleY:0.5489,alpha:0.5948},0).wait(1).to({scaleX:0.5439,scaleY:0.5439,x:570.7,y:578.95,alpha:0.6013},0).wait(1).to({scaleX:0.539,scaleY:0.539,y:579,alpha:0.6078},0).wait(1).to({scaleX:0.534,scaleY:0.534,alpha:0.6144},0).wait(1).to({scaleX:0.5291,scaleY:0.5291,x:570.75,alpha:0.6209},0).wait(1).to({scaleX:0.5241,scaleY:0.5241,alpha:0.6275},0).wait(1).to({scaleX:0.5192,scaleY:0.5192,alpha:0.634},0).wait(1).to({scaleX:0.5142,scaleY:0.5142,alpha:0.6405},0).wait(1).to({scaleX:0.5092,scaleY:0.5092,alpha:0.6471},0).wait(1).to({scaleX:0.5043,scaleY:0.5043,alpha:0.6536},0).wait(1).to({scaleX:0.4993,scaleY:0.4993,x:570.7,alpha:0.6601},0).wait(1).to({scaleX:0.4944,scaleY:0.4944,y:578.95,alpha:0.6667},0).wait(1).to({scaleX:0.4894,scaleY:0.4894,x:570.75,y:579,alpha:0.6732},0).wait(1).to({scaleX:0.4845,scaleY:0.4845,alpha:0.6797},0).wait(1).to({scaleX:0.4795,scaleY:0.4795,alpha:0.6863},0).wait(1).to({scaleX:0.4745,scaleY:0.4745,alpha:0.6928},0).wait(1).to({scaleX:0.4696,scaleY:0.4696,alpha:0.6993},0).wait(1).to({scaleX:0.4646,scaleY:0.4646,alpha:0.7059},0).wait(1).to({scaleX:0.4597,scaleY:0.4597,alpha:0.7124},0).wait(1).to({scaleX:0.4547,scaleY:0.4547,x:570.7,alpha:0.719},0).wait(1).to({scaleX:0.4497,scaleY:0.4497,x:570.75,alpha:0.7255},0).wait(1).to({scaleX:0.4448,scaleY:0.4448,alpha:0.732},0).wait(1).to({scaleX:0.4398,scaleY:0.4398,alpha:0.7386},0).wait(1).to({scaleX:0.4349,scaleY:0.4349,alpha:0.7451},0).wait(1).to({scaleX:0.4299,scaleY:0.4299,alpha:0.7516},0).wait(1).to({scaleX:0.425,scaleY:0.425,alpha:0.7582},0).wait(1).to({scaleX:0.42,scaleY:0.42,x:570.7,alpha:0.7647},0).wait(1).to({scaleX:0.415,scaleY:0.415,y:578.95,alpha:0.7712},0).wait(1).to({scaleX:0.4101,scaleY:0.4101,y:579,alpha:0.7778},0).wait(1).to({scaleX:0.4051,scaleY:0.4051,alpha:0.7843},0).wait(1).to({scaleX:0.4002,scaleY:0.4002,alpha:0.7908},0).wait(1).to({scaleX:0.3952,scaleY:0.3952,alpha:0.7974},0).wait(1).to({scaleX:0.3903,scaleY:0.3903,y:578.95,alpha:0.8039},0).wait(1).to({scaleX:0.3853,scaleY:0.3853,y:579,alpha:0.8105},0).wait(1).to({scaleX:0.3803,scaleY:0.3803,alpha:0.817},0).wait(1).to({scaleX:0.3754,scaleY:0.3754,x:570.75,alpha:0.8235},0).wait(1).to({scaleX:0.3704,scaleY:0.3704,x:570.7,alpha:0.8301},0).wait(1).to({scaleX:0.3655,scaleY:0.3655,y:578.95,alpha:0.8366},0).wait(1).to({scaleX:0.3605,scaleY:0.3605,y:579,alpha:0.8431},0).wait(1).to({scaleX:0.3556,scaleY:0.3556,alpha:0.8497},0).wait(1).to({scaleX:0.3506,scaleY:0.3506,alpha:0.8562},0).wait(1).to({scaleX:0.3456,scaleY:0.3456,alpha:0.8627},0).wait(1).to({scaleX:0.3407,scaleY:0.3407,y:578.95,alpha:0.8693},0).wait(1).to({scaleX:0.3357,scaleY:0.3357,x:570.75,alpha:0.8758},0).wait(1).to({scaleX:0.3308,scaleY:0.3308,y:579,alpha:0.8824},0).wait(1).to({scaleX:0.3258,scaleY:0.3258,x:570.7,alpha:0.8889},0).wait(1).to({scaleX:0.3209,scaleY:0.3209,x:570.75,alpha:0.8954},0).wait(1).to({scaleX:0.3159,scaleY:0.3159,x:570.7,y:578.95,alpha:0.902},0).wait(1).to({scaleX:0.3109,scaleY:0.3109,y:579,alpha:0.9085},0).wait(1).to({scaleX:0.306,scaleY:0.306,alpha:0.915},0).wait(1).to({scaleX:0.301,scaleY:0.301,alpha:0.9216},0).wait(1).to({scaleX:0.2961,scaleY:0.2961,x:570.75,alpha:0.9281},0).wait(1).to({scaleX:0.2911,scaleY:0.2911,y:578.95,alpha:0.9346},0).wait(1).to({scaleX:0.2862,scaleY:0.2862,x:570.7,alpha:0.9412},0).wait(1).to({scaleX:0.2812,scaleY:0.2812,x:570.75,y:579,alpha:0.9477},0).wait(1).to({scaleX:0.2762,scaleY:0.2762,alpha:0.9542},0).wait(1).to({scaleX:0.2713,scaleY:0.2713,x:570.7,alpha:0.9608},0).wait(1).to({scaleX:0.2663,scaleY:0.2663,y:578.95,alpha:0.9673},0).wait(1).to({scaleX:0.2614,scaleY:0.2614,alpha:0.9739},0).wait(1).to({scaleX:0.2564,scaleY:0.2564,x:570.75,y:579,alpha:0.9804},0).wait(1).to({scaleX:0.2515,scaleY:0.2515,alpha:0.9869},0).wait(1).to({scaleX:0.2465,scaleY:0.2465,alpha:0.9935},0).wait(1).to({scaleX:0.2415,scaleY:0.2415,y:578.95,alpha:1},0).wait(1).to({regX:1352.8,regY:714},0).wait(106));

	// Корабль
	this.instance_2 = new lib.Символ1();
	this.instance_2.setTransform(2.95,1023.7,0.6198,0.6198,18.9867,0,0,199.9,278.9);

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(1).to({regX:210,regY:284.2,scaleX:0.6178,scaleY:0.6178,rotation:19.3909,x:9.4,y:1027.2},0).wait(1).to({scaleX:0.6156,scaleY:0.6156,rotation:19.7942,x:11,y:1025.55},0).wait(1).to({scaleX:0.6136,scaleY:0.6136,rotation:20.1975,x:12.55,y:1023.95},0).wait(1).to({scaleX:0.6114,scaleY:0.6114,rotation:20.6007,x:14.15,y:1022.35},0).wait(1).to({scaleX:0.6093,scaleY:0.6093,rotation:21.004,x:15.75,y:1020.7},0).wait(1).to({scaleX:0.6072,scaleY:0.6072,rotation:21.4073,x:17.3,y:1019.1},0).wait(1).to({scaleX:0.6051,scaleY:0.6051,rotation:21.8106,x:18.95,y:1017.45},0).wait(1).to({scaleX:0.603,scaleY:0.603,rotation:22.2139,x:20.55,y:1015.85},0).wait(1).to({scaleX:0.6009,scaleY:0.6009,rotation:22.6172,x:22.15,y:1014.25},0).wait(1).to({scaleX:0.5988,scaleY:0.5988,rotation:23.0205,x:23.8,y:1012.7},0).wait(1).to({scaleX:0.5967,scaleY:0.5967,rotation:23.4237,x:25.45,y:1011},0).wait(1).to({scaleX:0.5946,scaleY:0.5946,rotation:23.827,x:27.05,y:1009.45},0).wait(1).to({scaleX:0.5925,scaleY:0.5925,rotation:24.2303,x:28.65,y:1007.8},0).wait(1).to({scaleX:0.5904,scaleY:0.5904,rotation:24.6336,x:30.25,y:1006.3},0).wait(1).to({scaleX:0.5883,scaleY:0.5883,rotation:25.0369,x:31.95,y:1004.65},0).wait(1).to({scaleX:0.5862,scaleY:0.5862,rotation:25.4402,x:33.55,y:1003.05},0).wait(1).to({scaleX:0.5841,scaleY:0.5841,rotation:25.8435,x:35.25,y:1001.4},0).wait(1).to({scaleX:0.582,scaleY:0.582,rotation:26.2467,x:36.8,y:999.85},0).wait(1).to({scaleX:0.5799,scaleY:0.5799,rotation:26.65,x:38.45,y:998.25},0).wait(1).to({scaleX:0.5778,scaleY:0.5778,rotation:27.0533,x:40.1,y:996.7},0).wait(1).to({scaleX:0.5757,scaleY:0.5757,rotation:27.4566,x:41.8,y:995.1},0).wait(1).to({scaleX:0.5736,scaleY:0.5736,rotation:27.8599,x:43.45,y:993.55},0).wait(1).to({scaleX:0.5715,scaleY:0.5715,rotation:28.2632,x:45.15,y:991.95},0).wait(1).to({scaleX:0.5694,scaleY:0.5694,rotation:28.6665,x:46.8,y:990.35},0).wait(1).to({scaleX:0.5673,scaleY:0.5673,rotation:29.0697,x:48.55,y:988.8},0).wait(1).to({scaleX:0.5652,scaleY:0.5652,rotation:29.473,x:50.2,y:987.25},0).wait(1).to({scaleX:0.5631,scaleY:0.5631,rotation:29.8763,x:51.95,y:985.65},0).wait(1).to({scaleX:0.561,scaleY:0.561,rotation:30.2796,x:53.6,y:984.1},0).wait(1).to({scaleX:0.5589,scaleY:0.5589,rotation:30.6829,x:55.3,y:982.55},0).wait(1).to({scaleX:0.5568,scaleY:0.5568,rotation:31.0862,x:57.05,y:980.9},0).wait(1).to({scaleX:0.5547,scaleY:0.5547,rotation:31.4895,x:58.75,y:979.45},0).wait(1).to({scaleX:0.5526,scaleY:0.5526,rotation:31.8927,x:60.45,y:977.85},0).wait(1).to({scaleX:0.5505,scaleY:0.5505,rotation:32.296,x:62.15,y:976.3},0).wait(1).to({scaleX:0.5484,scaleY:0.5484,rotation:32.6993,x:63.9,y:974.7},0).wait(1).to({scaleX:0.5463,scaleY:0.5463,rotation:33.1026,x:65.65,y:973.2},0).wait(1).to({scaleX:0.5442,scaleY:0.5442,rotation:33.5059,x:67.4,y:971.65},0).wait(1).to({scaleX:0.5421,scaleY:0.5421,rotation:33.9092,x:69.15,y:970.1},0).wait(1).to({scaleX:0.54,scaleY:0.54,rotation:34.3125,x:70.9,y:968.6},0).wait(1).to({scaleX:0.5379,scaleY:0.5379,rotation:34.7157,x:72.7,y:967.05},0).wait(1).to({scaleX:0.5358,scaleY:0.5358,rotation:35.119,x:74.45,y:965.55},0).wait(1).to({scaleX:0.5337,scaleY:0.5337,rotation:35.5223,x:76.15,y:963.95},0).wait(1).to({scaleX:0.5316,scaleY:0.5316,rotation:35.9256,x:78,y:962.45},0).wait(1).to({scaleX:0.5295,scaleY:0.5295,rotation:36.3289,x:79.8,y:960.95},0).wait(1).to({scaleX:0.5274,scaleY:0.5274,rotation:36.7322,x:81.55,y:959.45},0).wait(1).to({scaleX:0.5253,scaleY:0.5253,rotation:37.1355,x:83.35,y:957.9},0).wait(1).to({scaleX:0.5232,scaleY:0.5232,rotation:37.5387,x:85.15,y:956.4},0).wait(1).to({scaleX:0.5211,scaleY:0.5211,rotation:37.942,x:87,y:954.9},0).wait(1).to({scaleX:0.519,scaleY:0.519,rotation:38.3453,x:88.85,y:953.4},0).wait(1).to({scaleX:0.5169,scaleY:0.5169,rotation:38.7486,x:90.65,y:951.9},0).wait(1).to({scaleX:0.5148,scaleY:0.5148,rotation:39.1519,x:92.5,y:950.4},0).wait(1).to({scaleX:0.5127,scaleY:0.5127,rotation:39.5552,x:94.35,y:948.9},0).wait(1).to({scaleX:0.5106,scaleY:0.5106,rotation:39.9585,x:96.25,y:947.45},0).wait(1).to({scaleX:0.5085,scaleY:0.5085,rotation:40.3617,x:98.05,y:945.95},0).wait(1).to({scaleX:0.5064,scaleY:0.5064,rotation:40.765,x:100,y:944.5},0).wait(1).to({scaleX:0.5043,scaleY:0.5043,rotation:41.1683,x:101.85,y:943},0).wait(1).to({scaleX:0.5022,scaleY:0.5022,rotation:41.5716,x:103.75,y:941.6},0).wait(1).to({scaleX:0.5001,scaleY:0.5001,rotation:41.9749,x:105.7,y:940.1},0).wait(1).to({scaleX:0.498,scaleY:0.498,rotation:42.3782,x:107.6,y:938.65},0).wait(1).to({scaleX:0.4959,scaleY:0.4959,rotation:42.7815,x:109.55,y:937.25},0).wait(1).to({scaleX:0.4938,scaleY:0.4938,rotation:43.1847,x:111.45,y:935.8},0).wait(1).to({scaleX:0.4917,scaleY:0.4917,rotation:43.588,x:113.45,y:934.35},0).wait(1).to({scaleX:0.4896,scaleY:0.4896,rotation:43.9913,x:115.35,y:932.9},0).wait(1).to({scaleX:0.4875,scaleY:0.4875,rotation:44.3946,x:117.35,y:931.5},0).wait(1).to({scaleX:0.4854,scaleY:0.4854,rotation:44.7979,x:119.4,y:930.15},0).wait(1).to({scaleX:0.4833,scaleY:0.4833,rotation:45.2012,x:121.4,y:928.7},0).wait(1).to({scaleX:0.4812,scaleY:0.4812,rotation:45.6045,x:123.45,y:927.35},0).wait(1).to({scaleX:0.4791,scaleY:0.4791,rotation:46.0077,x:125.5,y:925.95},0).wait(1).to({scaleX:0.477,scaleY:0.477,rotation:46.411,x:127.5,y:924.55},0).wait(1).to({scaleX:0.4749,scaleY:0.4749,rotation:46.8143,x:129.6,y:923.2},0).wait(1).to({scaleX:0.4728,scaleY:0.4728,rotation:47.2176,x:131.75,y:921.85},0).wait(1).to({scaleX:0.4707,scaleY:0.4707,rotation:47.6209,x:133.8,y:920.5},0).wait(1).to({scaleX:0.4686,scaleY:0.4686,rotation:48.0242,x:135.95,y:919.2},0).wait(1).to({scaleX:0.4665,scaleY:0.4665,rotation:48.4275,x:138.1,y:917.95},0).wait(1).to({scaleX:0.4644,scaleY:0.4644,rotation:48.8307,x:140.35,y:916.65},0).wait(1).to({scaleX:0.4623,scaleY:0.4623,rotation:49.234,x:142.6,y:915.4},0).wait(1).to({scaleX:0.4602,scaleY:0.4602,rotation:49.6373,x:144.85,y:914.1},0).wait(1).to({scaleX:0.4581,scaleY:0.4581,rotation:50.0406,x:147.1,y:912.85},0).wait(1).to({scaleX:0.456,scaleY:0.456,rotation:50.4439,x:149.45,y:911.7},0).wait(1).to({scaleX:0.4539,scaleY:0.4539,rotation:50.8472,x:151.8,y:910.45},0).wait(1).to({scaleX:0.4518,scaleY:0.4518,rotation:51.2505,x:154.2,y:909.3},0).wait(1).to({scaleX:0.4497,scaleY:0.4497,rotation:51.6537,x:156.65,y:908.15},0).wait(1).to({scaleX:0.4476,scaleY:0.4476,rotation:52.057,x:159.2,y:907.1},0).wait(1).to({scaleX:0.4455,scaleY:0.4455,rotation:52.4603,x:161.75,y:906.05},0).wait(1).to({scaleX:0.4434,scaleY:0.4434,rotation:52.8636,x:164.45,y:905.05},0).wait(1).to({scaleX:0.4413,scaleY:0.4413,rotation:52.8741,x:167.65,y:904.05},0).wait(1).to({scaleX:0.4392,scaleY:0.4392,rotation:52.8847,x:171.7,y:903.05},0).wait(1).to({scaleX:0.4371,scaleY:0.4371,rotation:52.8952,x:176.6,y:902.15},0).wait(1).to({scaleX:0.435,scaleY:0.435,rotation:52.9058,x:182.15,y:901.25},0).wait(1).to({scaleX:0.4329,scaleY:0.4329,rotation:52.9163,x:188.3,y:900.45},0).wait(1).to({scaleX:0.4308,scaleY:0.4308,rotation:52.9269,x:195,y:899.7},0).wait(1).to({scaleX:0.4287,scaleY:0.4287,rotation:52.9374,x:202.1,y:899},0).wait(1).to({scaleX:0.4266,scaleY:0.4266,rotation:52.948,x:209.55,y:898.25},0).wait(1).to({scaleX:0.4245,scaleY:0.4245,rotation:52.9585,x:217.2,y:897.55},0).wait(1).to({scaleX:0.4224,scaleY:0.4224,rotation:52.9691,x:225,y:896.95},0).wait(1).to({scaleX:0.4203,scaleY:0.4203,rotation:52.9796,x:233,y:896.35},0).wait(1).to({scaleX:0.4182,scaleY:0.4182,rotation:52.9902,x:240.9,y:895.9},0).wait(1).to({scaleX:0.4161,scaleY:0.4161,rotation:53.0007,x:248.8,y:895.35},0).wait(1).to({scaleX:0.414,scaleY:0.414,rotation:53.0112,x:256.5,y:894.95},0).wait(1).to({scaleX:0.4119,scaleY:0.4119,rotation:53.0218,x:264.05,y:894.5},0).wait(1).to({scaleX:0.4098,scaleY:0.4098,rotation:53.0323,x:271.2,y:894.15},0).wait(1).to({scaleX:0.4077,scaleY:0.4077,rotation:53.0429,x:278.05,y:893.8},0).wait(1).to({scaleX:0.4056,scaleY:0.4056,rotation:53.0534,x:284.5,y:893.55},0).wait(1).to({scaleX:0.4035,scaleY:0.4035,rotation:53.064,x:290.45,y:893.3},0).wait(1).to({scaleX:0.4014,scaleY:0.4014,rotation:53.0745,x:295.85,y:893.15},0).wait(1).to({scaleX:0.3993,scaleY:0.3993,rotation:53.0851,x:300.6,y:892.95},0).wait(1).to({scaleX:0.3972,scaleY:0.3972,rotation:53.0956,x:304.8,y:892.85},0).wait(1).to({scaleX:0.3951,scaleY:0.3951,rotation:53.1062,x:308.2,y:892.7},0).wait(1).to({scaleX:0.393,scaleY:0.393,rotation:53.1167,x:310.9},0).wait(1).to({scaleX:0.3909,scaleY:0.3909,rotation:52.0103,x:315,y:892.65},0).wait(1).to({scaleX:0.3888,scaleY:0.3888,rotation:50.9039,x:320.95,y:892.55},0).wait(1).to({scaleX:0.3867,scaleY:0.3867,rotation:49.7975,x:327.85,y:892.45},0).wait(1).to({scaleX:0.3846,scaleY:0.3846,rotation:48.6911,x:335.35,y:892.35},0).wait(1).to({scaleX:0.3825,scaleY:0.3825,rotation:47.5847,x:343.3,y:892.25},0).wait(1).to({scaleX:0.3804,scaleY:0.3804,rotation:46.4783,x:351.45,y:892.15},0).wait(1).to({scaleX:0.3783,scaleY:0.3783,rotation:45.3719,x:359.85,y:892.1},0).wait(1).to({scaleX:0.3762,scaleY:0.3762,rotation:44.2655,x:368.4,y:891.9},0).wait(1).to({scaleX:0.3741,scaleY:0.3741,rotation:43.1591,x:377.05,y:891.8},0).wait(1).to({scaleX:0.372,scaleY:0.372,rotation:42.0528,x:385.8,y:891.6},0).wait(1).to({scaleX:0.3699,scaleY:0.3699,rotation:40.9464,x:394.5,y:891.5},0).wait(1).to({scaleX:0.3678,scaleY:0.3678,rotation:39.84,x:403.3,y:891.35},0).wait(1).to({scaleX:0.3657,scaleY:0.3657,rotation:38.7336,x:412,y:891.1},0).wait(1).to({scaleX:0.3636,scaleY:0.3636,rotation:37.6272,x:420.6,y:890.95},0).wait(1).to({scaleX:0.3615,scaleY:0.3615,rotation:36.5208,x:429.15,y:890.7},0).wait(1).to({scaleX:0.3594,scaleY:0.3594,rotation:35.4144,x:437.4,y:890.55},0).wait(1).to({scaleX:0.3573,scaleY:0.3573,rotation:34.308,x:445.4,y:890.25},0).wait(1).to({scaleX:0.3552,scaleY:0.3552,rotation:33.2016,x:452.75,y:889.95},0).wait(1).to({scaleX:0.3531,scaleY:0.3531,rotation:32.0952,x:458.9,y:889.55},0).wait(1).to({scaleX:0.351,scaleY:0.351,rotation:31.3429,x:463.85,y:889.1},0).wait(1).to({scaleX:0.3489,scaleY:0.3489,rotation:30.5905,x:468.55,y:888.65},0).wait(1).to({scaleX:0.3468,scaleY:0.3468,rotation:29.8382,x:472.9,y:888.15},0).wait(1).to({scaleX:0.3447,scaleY:0.3447,rotation:29.0859,x:477.05,y:887.6},0).wait(1).to({scaleX:0.3426,scaleY:0.3426,rotation:28.3335,x:480.95,y:887.1},0).wait(1).to({scaleX:0.3405,scaleY:0.3405,rotation:27.5812,x:484.6,y:886.5},0).wait(1).to({scaleX:0.3384,scaleY:0.3384,rotation:26.8289,x:488.15,y:885.95},0).wait(1).to({scaleX:0.3363,scaleY:0.3363,rotation:26.0765,x:491.5,y:885.4},0).wait(1).to({scaleX:0.3342,scaleY:0.3342,rotation:25.3242,x:494.65,y:884.8},0).wait(1).to({scaleX:0.3321,scaleY:0.3321,rotation:24.5719,x:497.6,y:884.2},0).wait(1).to({scaleX:0.33,scaleY:0.33,rotation:23.8195,x:500.5,y:883.6},0).wait(1).to({scaleX:0.3279,scaleY:0.3279,rotation:23.0672,x:503.2,y:883},0).wait(1).to({scaleX:0.3258,scaleY:0.3258,rotation:22.3148,x:505.8,y:882.3},0).wait(1).to({scaleX:0.3237,scaleY:0.3237,rotation:21.5625,x:508.25,y:881.7},0).wait(1).to({scaleX:0.3216,scaleY:0.3216,rotation:20.8102,x:510.6,y:881.05},0).wait(1).to({scaleX:0.3195,scaleY:0.3195,rotation:20.0578,x:512.85,y:880.35},0).wait(1).to({scaleX:0.3174,scaleY:0.3174,rotation:19.3055,x:515.05,y:879.65},0).wait(1).to({scaleX:0.3153,scaleY:0.3153,rotation:18.5532,x:517.05,y:878.95},0).wait(1).to({scaleX:0.3132,scaleY:0.3132,rotation:17.8008,x:519.05,y:878.25},0).wait(1).to({scaleX:0.3111,scaleY:0.3111,rotation:17.0485,x:520.95,y:877.55},0).wait(1).to({scaleX:0.309,scaleY:0.309,rotation:16.2962,x:522.75,y:876.85},0).wait(1).to({scaleX:0.3069,scaleY:0.3069,rotation:15.5438,x:524.5,y:876.05},0).wait(1).to({scaleX:0.3048,scaleY:0.3048,rotation:14.7915,x:526.15,y:875.4},0).wait(1).to({scaleX:0.3027,scaleY:0.3027,rotation:14.3387,x:527.75,y:874.65},0).wait(1).to({scaleX:0.3006,scaleY:0.3006,rotation:13.886,x:529.2,y:873.85},0).wait(1).to({scaleX:0.2985,scaleY:0.2985,rotation:13.4332,x:530.65,y:873.1},0).wait(1).to({scaleX:0.2964,scaleY:0.2964,rotation:12.9805,x:532.1,y:872.35},0).wait(1).to({scaleX:0.2943,scaleY:0.2943,rotation:12.5277,x:533.4,y:871.6},0).wait(1).to({scaleX:0.2922,scaleY:0.2922,rotation:12.075,x:534.7,y:870.85},0).wait(1).to({scaleX:0.2901,scaleY:0.2901,rotation:11.6222,x:535.9,y:870.05},0).wait(1).to({scaleX:0.288,scaleY:0.288,rotation:11.1694,x:537.1,y:869.25},0).wait(1).to({scaleX:0.2859,scaleY:0.2859,rotation:10.7167,x:538.25,y:868.4},0).wait(1).to({scaleX:0.2838,scaleY:0.2838,rotation:10.2639,x:539.35,y:867.6},0).wait(1).to({scaleX:0.2817,scaleY:0.2817,rotation:9.8112,x:540.35,y:866.85},0).wait(1).to({scaleX:0.2796,scaleY:0.2796,rotation:9.3584,x:541.35,y:866},0).wait(1).to({scaleX:0.2775,scaleY:0.2775,rotation:8.9056,x:542.35,y:865.15},0).wait(1).to({scaleX:0.2754,scaleY:0.2754,rotation:8.4529,x:543.25,y:864.3},0).wait(1).to({scaleX:0.2733,scaleY:0.2733,rotation:8.0001,x:544.2,y:863.5},0).wait(1).to({scaleX:0.2712,scaleY:0.2712,rotation:7.5474,x:545.05,y:862.65},0).wait(1).to({scaleX:0.2691,scaleY:0.2691,rotation:7.0946,x:545.85,y:861.8},0).wait(1).to({scaleX:0.267,scaleY:0.267,rotation:6.6419,x:546.7,y:860.9},0).wait(1).to({scaleX:0.2649,scaleY:0.2649,rotation:6.1891,x:547.45,y:860.05},0).wait(1).to({scaleX:0.2628,scaleY:0.2628,rotation:5.7363,x:548.2,y:859.1},0).wait(1).to({scaleX:0.2607,scaleY:0.2607,rotation:5.2836,x:548.95,y:858.2},0).wait(1).to({scaleX:0.2586,scaleY:0.2586,rotation:4.8308,x:549.6,y:857.3},0).wait(1).to({scaleX:0.2565,scaleY:0.2565,rotation:4.3781,x:550.3,y:856.4},0).wait(1).to({scaleX:0.2544,scaleY:0.2544,rotation:3.9253,x:550.95,y:855.45},0).wait(1).to({scaleX:0.2523,scaleY:0.2523,rotation:3.4725,x:551.55,y:854.55},0).wait(1).to({scaleX:0.2502,scaleY:0.2502,rotation:3.0198,x:552.2,y:853.6},0).wait(1).to({scaleX:0.2481,scaleY:0.2481,rotation:2.567,x:552.8,y:852.7},0).wait(1).to({scaleX:0.246,scaleY:0.246,rotation:2.1143,x:553.35,y:851.7},0).wait(1).to({scaleX:0.2439,scaleY:0.2439,rotation:1.6615,x:553.95,y:850.75},0).wait(1).to({scaleX:0.2418,scaleY:0.2418,rotation:2.5397,x:554.45,y:849.85},0).wait(1).to({scaleX:0.2397,scaleY:0.2397,rotation:3.4178,x:555,y:848.95},0).wait(1).to({scaleX:0.2376,scaleY:0.2376,rotation:4.296,x:555.5,y:848},0).wait(1).to({scaleX:0.2355,scaleY:0.2355,rotation:5.1742,x:555.95,y:847.05},0).wait(1).to({scaleX:0.2334,scaleY:0.2334,rotation:6.0523,x:556.45,y:846.1},0).wait(1).to({scaleX:0.2313,scaleY:0.2313,rotation:6.9305,x:556.9,y:845.15},0).wait(1).to({scaleX:0.2292,scaleY:0.2292,rotation:7.8087,x:557.35,y:844.15},0).wait(1).to({scaleX:0.2271,scaleY:0.2271,rotation:8.6868,x:557.85,y:843.15},0).wait(1).to({scaleX:0.225,scaleY:0.225,rotation:9.565,x:558.35,y:842.15},0).wait(1).to({scaleX:0.2229,scaleY:0.2229,rotation:10.4432,x:558.7,y:841.2},0).wait(1).to({scaleX:0.2208,scaleY:0.2208,rotation:11.3214,x:559.25,y:840.1},0).wait(1).to({scaleX:0.2187,scaleY:0.2187,rotation:12.1995,x:559.7,y:839.1},0).wait(1).to({scaleX:0.2166,scaleY:0.2166,rotation:13.0777,x:560.15,y:838.05},0).wait(1).to({scaleX:0.2145,scaleY:0.2145,rotation:13.9559,x:560.6,y:837},0).wait(1).to({scaleX:0.2124,scaleY:0.2124,rotation:14.834,x:561.05,y:835.95},0).wait(1).to({scaleX:0.2102,scaleY:0.2102,rotation:15.7122,x:561.5,y:834.85},0).wait(1).to({scaleX:0.2082,scaleY:0.2082,rotation:16.5904,x:562,y:833.8},0).wait(1).to({scaleX:0.2061,scaleY:0.2061,rotation:17.4685,x:562.45,y:832.65},0).wait(1).to({scaleX:0.204,scaleY:0.204,rotation:18.3467,x:563,y:831.55},0).wait(1).to({scaleX:0.2019,scaleY:0.2019,rotation:19.2249,x:563.45,y:830.4},0).wait(1).to({scaleX:0.1998,scaleY:0.1998,rotation:20.103,x:564.05,y:829.25},0).wait(1).to({scaleX:0.1977,scaleY:0.1977,rotation:20.9812,x:564.55,y:828.1},0).wait(1).to({scaleX:0.1956,scaleY:0.1956,rotation:21.8594,x:565.1,y:826.95},0).wait(1).to({scaleX:0.1934,scaleY:0.1934,rotation:22.7375,x:565.65,y:825.7},0).wait(1).to({scaleX:0.1913,scaleY:0.1913,rotation:23.6157,x:566.25,y:824.5},0).wait(1).to({scaleX:0.1892,scaleY:0.1892,rotation:24.4939,x:566.85,y:823.35},0).wait(1).to({scaleX:0.1871,scaleY:0.1871,rotation:25.372,x:567.5,y:822.05},0).wait(1).to({scaleX:0.185,scaleY:0.185,rotation:26.2502,x:568.2,y:820.8},0).wait(1).to({scaleX:0.1829,scaleY:0.1829,rotation:27.1284,x:568.9,y:819.5},0).wait(1).to({scaleX:0.1808,scaleY:0.1808,rotation:28.0065,x:569.6,y:818.25},0).wait(1).to({scaleX:0.1787,scaleY:0.1787,rotation:28.8847,x:570.35,y:816.95},0).wait(1).to({scaleX:0.1766,scaleY:0.1766,rotation:29.7406,x:571.2,y:815.6},0).wait(1).to({scaleX:0.1745,scaleY:0.1745,rotation:30.5966,x:572.2,y:814.25},0).wait(1).to({scaleX:0.1724,scaleY:0.1724,rotation:31.4525,x:573.3,y:812.85},0).wait(1).to({scaleX:0.1703,scaleY:0.1703,rotation:32.3084,x:574.6,y:811.45},0).wait(1).to({scaleX:0.1682,scaleY:0.1682,rotation:33.1644,x:575.95,y:810.05},0).wait(1).to({scaleX:0.1661,scaleY:0.1661,rotation:34.0203,x:577.55,y:808.6},0).wait(1).to({scaleX:0.164,scaleY:0.164,rotation:34.8762,x:579.35,y:807.15},0).wait(1).to({scaleX:0.1619,scaleY:0.1619,rotation:35.7322,x:581.35,y:805.65},0).wait(1).to({scaleX:0.1598,scaleY:0.1598,rotation:36.5881,x:583.5,y:804.1},0).wait(1).to({scaleX:0.1577,scaleY:0.1577,rotation:37.444,x:585.85,y:802.65},0).wait(1).to({scaleX:0.1556,scaleY:0.1556,rotation:38.3,x:588.5,y:801},0).wait(1).to({scaleX:0.1535,scaleY:0.1535,rotation:39.1559,x:591.35,y:799.45},0).wait(1).to({scaleX:0.1514,scaleY:0.1514,rotation:40.0118,x:594.5,y:797.8},0).wait(1).to({scaleX:0.1493,scaleY:0.1493,rotation:40.8678,x:597.9,y:796.1},0).wait(1).to({scaleX:0.1472,scaleY:0.1472,rotation:41.7237,x:601.6,y:794.45},0).wait(1).to({scaleX:0.1451,scaleY:0.1451,rotation:42.5797,x:605.7,y:792.65},0).wait(1).to({scaleX:0.143,scaleY:0.143,rotation:43.4356,x:610.1,y:790.9},0).wait(1).to({scaleX:0.1409,scaleY:0.1409,rotation:44.2915,x:615,y:789.05},0).wait(1).to({scaleX:0.1388,scaleY:0.1388,rotation:45.1475,x:620.2,y:787.2},0).wait(1).to({scaleX:0.1367,scaleY:0.1367,rotation:46.0034,x:625.95,y:785.25},0).wait(1).to({scaleX:0.1346,scaleY:0.1346,rotation:46.8593,x:632.2,y:783.3},0).wait(1).to({scaleX:0.1325,scaleY:0.1325,rotation:47.7153,x:639,y:781.25},0).wait(1).to({scaleX:0.1304,scaleY:0.1304,rotation:48.5712,x:646.4,y:779.15},0).wait(1).to({scaleX:0.1283,scaleY:0.1283,rotation:49.4271,x:654.65,y:776.9},0).wait(1).to({scaleX:0.1262,scaleY:0.1262,rotation:50.2831,x:663.6,y:774.7},0).wait(1).to({scaleX:0.1241,scaleY:0.1241,rotation:51.139,x:673.5,y:772.35},0).wait(1).to({scaleX:0.122,scaleY:0.122,rotation:51.9949,x:684.5,y:769.85},0).wait(1).to({scaleX:0.1199,scaleY:0.1199,rotation:52.8509,x:696.7,y:767.3},0).wait(1).to({scaleX:0.1178,scaleY:0.1178,rotation:53.7068,x:710.35,y:764.55},0).wait(1).to({scaleX:0.1157,scaleY:0.1157,rotation:50.774,x:724.7,y:764.5},0).wait(1).to({scaleX:0.1136,scaleY:0.1136,rotation:47.8412,x:738.65,y:764.3},0).wait(1).to({scaleX:0.1115,scaleY:0.1115,rotation:44.9084,x:752.2,y:764.1},0).wait(1).to({scaleX:0.1094,scaleY:0.1094,rotation:41.9756,x:765.35,y:763.75},0).wait(1).to({scaleX:0.1073,scaleY:0.1073,rotation:39.0428,x:778,y:763.4},0).wait(1).to({scaleX:0.1052,scaleY:0.1052,rotation:36.11,x:790.25,y:762.85},0).wait(1).to({scaleX:0.1031,scaleY:0.1031,rotation:33.1773,x:801.95,y:762.3},0).wait(1).to({scaleX:0.101,scaleY:0.101,rotation:30.2445,x:813.35,y:761.65},0).wait(1).to({scaleX:0.0989,scaleY:0.0989,rotation:27.3117,x:824.15,y:760.95},0).wait(1).to({scaleX:0.0968,scaleY:0.0968,rotation:24.3789,x:834.55,y:760.05},0).wait(1).to({scaleX:0.0947,scaleY:0.0947,rotation:21.4461,x:844.45,y:759.1},0).wait(1).to({scaleX:0.0926,scaleY:0.0926,rotation:18.5133,x:853.9,y:758.05},0).wait(1).to({scaleX:0.0905,scaleY:0.0905,rotation:15.5805,x:862.8,y:757},0).wait(1).to({scaleX:0.0884,scaleY:0.0884,rotation:12.6477,x:871.25,y:755.75},0).wait(1).to({scaleX:0.0863,scaleY:0.0863,rotation:9.7149,x:879.1,y:754.5},0).wait(1).to({scaleX:0.0842,scaleY:0.0842,rotation:6.7821,x:886.55,y:753.05},0).wait(1).to({scaleX:0.0821,scaleY:0.0821,rotation:3.8493,x:893.4,y:751.6},0).wait(1).to({scaleX:0.08,scaleY:0.08,rotation:0.9165,x:899.7,y:750},0).wait(1).to({scaleX:0.0779,scaleY:0.0779,rotation:-2.0162,x:905.5,y:748.35},0).wait(1).to({scaleX:0.0758,scaleY:0.0758,rotation:-4.949,x:910.65,y:746.5},0).wait(1).to({scaleX:0.0737,scaleY:0.0737,rotation:-7.8818,x:915.3,y:744.6},0).wait(1).to({scaleX:0.0716,scaleY:0.0716,rotation:-10.8146,x:919.3,y:742.55},0).wait(1).to({scaleX:0.0695,scaleY:0.0695,rotation:-13.7474,x:922.8,y:740.45},0).wait(1).to({scaleX:0.0674,scaleY:0.0674,rotation:-16.6802,x:925.55,y:738.2},0).wait(1).to({scaleX:0.0653,scaleY:0.0653,rotation:-19.613,x:927.75,y:735.8},0).wait(1).to({scaleX:0.0632,scaleY:0.0632,rotation:-22.5458,x:929.3,y:733.3},0).wait(1).to({scaleX:0.0611,scaleY:0.0611,rotation:-25.4786,x:930.2,y:730.75},0).wait(1).to({scaleX:0.059,scaleY:0.059,rotation:-28.4114,x:930.4,y:728},0).wait(1).to({scaleX:0.0569,scaleY:0.0569,rotation:-31.3442,x:929.85,y:725.15},0).wait(1).to({scaleX:0.0548,scaleY:0.0548,rotation:-34.277,x:928.65,y:722.1},0).wait(1).to({scaleX:0.0527,scaleY:0.0527,rotation:-37.2097,x:926.7,y:719.05},0).wait(1).to({scaleX:0.0506,scaleY:0.0506,rotation:-40.1425,x:923.95,y:715.75},0).wait(1).to({scaleX:0.0485,scaleY:0.0485,rotation:-43.0753,x:920.45,y:712.3},0).wait(1).to({scaleX:0.0464,scaleY:0.0464,rotation:-46.0081,x:916.1,y:708.75},0).wait(1).to({scaleX:0.0443,scaleY:0.0443,rotation:-48.9409,x:910.9,y:705.05},0).wait(1).to({scaleX:0.0422,scaleY:0.0422,rotation:-51.8737,x:904.8,y:701.15},0).wait(1).to({scaleX:0.0401,scaleY:0.0401,rotation:-54.8065,x:897.75,y:697.05},0).wait(1).to({scaleX:0.038,scaleY:0.038,rotation:-57.7393,x:889.8,y:692.85},0).wait(1).to({scaleX:0.0359,scaleY:0.0359,rotation:-60.6721,x:880.75,y:688.45},0).wait(1).to({scaleX:0.0338,scaleY:0.0338,rotation:-63.6049,x:870.65,y:683.75},0).wait(1).to({scaleX:0.0317,scaleY:0.0317,rotation:-66.5377,x:859.4,y:678.95},0).wait(1).to({scaleX:0.0296,scaleY:0.0296,rotation:-69.4705,x:846.95,y:673.9},0).wait(1).to({scaleX:0.0275,scaleY:0.0275,rotation:-72.4032,x:833.1,y:668.5},0).wait(1).to({scaleX:0.0254,scaleY:0.0254,rotation:-75.336,x:817.85,y:662.95},0).wait(1).to({scaleX:0.0233,scaleY:0.0233,rotation:-78.2688,x:801,y:657.05},0).wait(1).to({scaleX:0.0212,scaleY:0.0212,rotation:-81.2016,x:782.3,y:650.8},0).wait(1).to({scaleX:0.0191,scaleY:0.0191,rotation:-84.1344,x:761.45,y:644.15},0).wait(1).to({scaleX:0.017,scaleY:0.017,rotation:-87.0672,x:738,y:637.05},0).wait(1).to({scaleX:0.0149,scaleY:0.0149,rotation:-90,x:710.25,y:629.05},0).to({_off:true},1).wait(265));

	// Планета
	this.instance_3 = new lib.Символ2();
	this.instance_3.setTransform(636.25,413.15,1,1,0,0,0,5,5);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(1).to({scaleX:1.2634,scaleY:1.2634,x:637.15,y:414.65},0).wait(1).to({scaleX:1.527,scaleY:1.527,x:638.15,y:416.25},0).wait(1).to({scaleX:1.7903,scaleY:1.7903,x:639.05,y:417.75},0).wait(1).to({scaleX:2.0535,scaleY:2.0535,x:640,y:419.3},0).wait(1).to({scaleX:2.3168,scaleY:2.3168,x:640.95,y:420.85},0).wait(1).to({scaleX:2.5797,scaleY:2.5797,x:641.9,y:422.4},0).wait(1).to({scaleX:2.8428,scaleY:2.8428,x:642.85,y:423.9},0).wait(1).to({scaleX:3.1057,scaleY:3.1057,x:643.8,y:425.5},0).wait(1).to({scaleX:3.3684,scaleY:3.3684,x:644.75,y:427},0).wait(1).to({scaleX:3.6313,scaleY:3.6313,x:645.65,y:428.55},0).wait(1).to({scaleX:3.8937,scaleY:3.8937,x:646.6,y:430.1},0).wait(1).to({scaleX:4.1563,scaleY:4.1563,x:647.6,y:431.65},0).wait(1).to({scaleX:4.4187,scaleY:4.4187,x:648.5,y:433.2},0).wait(1).to({scaleX:4.6811,scaleY:4.6811,x:649.45,y:434.7},0).wait(1).to({scaleX:4.9433,scaleY:4.9433,x:650.35,y:436.25},0).wait(1).to({scaleX:5.2055,scaleY:5.2055,x:651.35,y:437.8},0).wait(1).to({scaleX:5.4674,scaleY:5.4674,x:652.3,y:439.35},0).wait(1).to({scaleX:5.7294,scaleY:5.7294,x:653.2,y:440.85},0).wait(1).to({scaleX:5.9913,scaleY:5.9913,x:654.15,y:442.4},0).wait(1).to({scaleX:6.253,scaleY:6.253,x:655.05,y:443.9},0).wait(1).to({scaleX:6.5147,scaleY:6.5147,x:656,y:445.45},0).wait(1).to({scaleX:6.7762,scaleY:6.7762,x:657,y:447},0).wait(1).to({scaleX:7.0376,scaleY:7.0376,x:657.9,y:448.55},0).wait(1).to({scaleX:7.2991,scaleY:7.2991,x:658.85,y:450.05},0).wait(1).to({scaleX:7.5603,scaleY:7.5603,x:659.8,y:451.6},0).wait(1).to({scaleX:7.8216,scaleY:7.8216,x:660.7,y:453.1},0).wait(1).to({scaleX:8.0825,scaleY:8.0825,x:661.65,y:454.65},0).wait(1).to({scaleX:8.3438,scaleY:8.3438,x:662.6,y:456.2},0).wait(1).to({scaleX:8.6045,scaleY:8.6045,x:663.5,y:457.7},0).wait(1).to({scaleX:8.8653,scaleY:8.8653,x:664.5,y:459.3},0).wait(1).to({scaleX:9.126,scaleY:9.126,x:665.4,y:460.8},0).wait(1).to({scaleX:9.3868,scaleY:9.3868,x:666.35,y:462.35},0).wait(1).to({scaleX:9.6473,scaleY:9.6473,x:667.3,y:463.85},0).wait(1).to({scaleX:9.9078,scaleY:9.9078,x:668.2,y:465.4},0).wait(1).to({scaleX:10.1681,scaleY:10.1681,x:669.15,y:466.9},0).wait(1).to({scaleX:10.4283,scaleY:10.4283,x:670.1,y:468.45},0).wait(1).to({scaleX:10.6884,scaleY:10.6884,x:671,y:469.95},0).wait(1).to({scaleX:10.9484,scaleY:10.9484,x:671.95,y:471.5},0).wait(1).to({scaleX:11.2085,scaleY:11.2085,x:672.9,y:473},0).wait(1).to({scaleX:11.4683,scaleY:11.4683,x:673.8,y:474.55},0).wait(1).to({scaleX:11.7281,scaleY:11.7281,x:674.75,y:476.05},0).wait(1).to({scaleX:11.9879,scaleY:11.9879,x:675.7,y:477.6},0).wait(1).to({scaleX:12.2474,scaleY:12.2474,x:676.6,y:479.1},0).wait(1).to({scaleX:12.5068,scaleY:12.5068,x:677.55,y:480.6},0).wait(1).to({scaleX:12.7663,scaleY:12.7663,x:678.5,y:482.15},0).wait(1).to({scaleX:13.0256,scaleY:13.0256,x:679.45,y:483.65},0).wait(1).to({scaleX:13.2847,scaleY:13.2847,x:680.3,y:485.15},0).wait(1).to({scaleX:13.5438,scaleY:13.5438,x:681.25,y:486.65},0).wait(1).to({scaleX:13.8029,scaleY:13.8029,x:682.2,y:488.2},0).wait(1).to({scaleX:14.0618,scaleY:14.0618,x:683.1,y:489.7},0).wait(1).to({scaleX:14.3206,scaleY:14.3206,x:684.05,y:491.25},0).wait(1).to({scaleX:14.5795,scaleY:14.5795,x:685,y:492.75},0).wait(1).to({scaleX:14.8381,scaleY:14.8381,x:685.9,y:494.3},0).wait(1).to({scaleX:15.0964,scaleY:15.0964,x:686.85,y:495.8},0).wait(1).to({scaleX:15.3551,scaleY:15.3551,x:687.8,y:497.35},0).wait(1).to({scaleX:15.6134,scaleY:15.6134,x:688.7,y:498.8},0).wait(1).to({scaleX:15.8716,scaleY:15.8716,x:689.6,y:500.35},0).wait(1).to({scaleX:16.1297,scaleY:16.1297,x:690.55,y:501.85},0).wait(1).to({scaleX:16.3879,scaleY:16.3879,x:691.5,y:503.4},0).wait(1).to({scaleX:16.6458,scaleY:16.6458,x:692.45,y:504.9},0).wait(1).to({scaleX:16.9037,scaleY:16.9037,x:693.3,y:506.4},0).wait(1).to({scaleX:17.1616,scaleY:17.1616,x:694.25,y:507.9},0).wait(1).to({scaleX:17.4192,scaleY:17.4192,x:695.2,y:509.4},0).wait(1).to({scaleX:17.6769,scaleY:17.6769,x:696.1,y:510.95},0).wait(1).to({scaleX:17.9343,scaleY:17.9343,x:697,y:512.4},0).wait(1).to({scaleX:18.1917,scaleY:18.1917,x:697.95,y:513.95},0).wait(1).to({scaleX:18.4492,scaleY:18.4492,x:698.9,y:515.45},0).wait(1).to({scaleX:18.7063,scaleY:18.7063,x:699.8,y:517},0).wait(1).to({scaleX:18.9633,scaleY:18.9633,x:700.7,y:518.45},0).wait(1).to({scaleX:19.2205,scaleY:19.2205,x:701.65,y:520},0).wait(1).to({scaleX:19.4774,scaleY:19.4774,x:702.6,y:521.5},0).wait(1).to({scaleX:19.7341,scaleY:19.7341,x:703.45,y:522.95},0).wait(1).to({scaleX:19.9909,scaleY:19.9909,x:704.4,y:524.5},0).wait(1).to({scaleX:20.2476,scaleY:20.2476,x:705.35,y:526},0).wait(1).to({scaleX:20.5043,scaleY:20.5043,x:706.25,y:527.5},0).wait(1).to({scaleX:20.7608,scaleY:20.7608,x:707.2,y:529},0).wait(1).to({scaleX:21.017,scaleY:21.017,x:708.1,y:530.55},0).wait(1).to({scaleX:21.2732,scaleY:21.2732,x:709,y:532},0).wait(1).to({scaleX:21.5295,scaleY:21.5295,x:709.95,y:533.55},0).wait(1).to({scaleX:21.7855,scaleY:21.7855,x:710.9,y:535.05},0).wait(1).to({scaleX:22.0415,scaleY:22.0415,x:711.75,y:536.5},0).wait(1).to({scaleX:22.2975,scaleY:22.2975,x:712.7,y:538.05},0).wait(1).to({scaleX:22.5532,scaleY:22.5532,x:713.6,y:539.5},0).wait(1).to({scaleX:22.809,scaleY:22.809,x:714.55,y:541.05},0).wait(1).to({scaleX:23.0645,scaleY:23.0645,x:715.45,y:542.5},0).wait(1).to({scaleX:23.3201,scaleY:23.3201,x:716.35,y:544},0).wait(1).to({scaleX:23.5756,scaleY:23.5756,x:717.3,y:545.55},0).wait(1).to({scaleX:23.8309,scaleY:23.8309,x:718.2,y:547},0).wait(1).to({scaleX:24.0862,scaleY:24.0862,x:719.15,y:548.55},0).wait(1).to({scaleX:24.3412,scaleY:24.3412,x:720.05,y:550},0).wait(1).to({scaleX:24.5963,scaleY:24.5963,x:720.95,y:551.55},0).wait(1).to({scaleX:24.8513,scaleY:24.8513,x:721.85,y:553},0).wait(1).to({scaleX:25.1061,scaleY:25.1061,x:722.8,y:554.5},0).wait(1).to({scaleX:25.3609,scaleY:25.3609,x:723.7,y:556},0).wait(1).to({scaleX:25.6155,scaleY:25.6155,x:724.65,y:557.5},0).wait(1).to({scaleX:25.8701,scaleY:25.8701,x:725.55,y:559},0).wait(1).to({scaleX:26.1247,scaleY:26.1247,x:726.4,y:560.45},0).wait(1).to({scaleX:26.379,scaleY:26.379,x:727.35,y:561.95},0).wait(1).to({scaleX:26.6334,scaleY:26.6334,x:728.25,y:563.45},0).wait(1).to({scaleX:26.8875,scaleY:26.8875,x:729.2,y:564.95},0).wait(1).to({scaleX:27.1416,scaleY:27.1416,x:730.1,y:566.45},0).wait(1).to({scaleX:27.3957,scaleY:27.3957,x:731.05,y:567.95},0).wait(1).to({scaleX:27.6495,scaleY:27.6495,x:731.9,y:569.4},0).wait(1).to({scaleX:27.9034,scaleY:27.9034,x:732.8,y:570.9},0).wait(1).to({scaleX:28.157,scaleY:28.157,x:733.75,y:572.4},0).wait(1).to({scaleX:28.4106,scaleY:28.4106,x:734.65,y:573.9},0).wait(1).to({scaleX:28.6643,scaleY:28.6643,x:735.55,y:575.35},0).wait(1).to({scaleX:28.9177,scaleY:28.9177,x:736.5,y:576.85},0).wait(1).to({scaleX:29.171,scaleY:29.171,x:737.4,y:578.35},0).wait(1).to({scaleX:29.4244,scaleY:29.4244,x:738.25,y:579.8},0).wait(1).to({scaleX:29.6776,scaleY:29.6776,x:739.2,y:581.3},0).wait(1).to({scaleX:29.9305,scaleY:29.9305,x:740.1,y:582.8},0).wait(1).to({scaleX:30.1836,scaleY:30.1836,x:741,y:584.25},0).wait(1).to({scaleX:30.4363,scaleY:30.4363,x:741.95,y:585.8},0).wait(1).to({scaleX:30.6892,scaleY:30.6892,x:742.85,y:587.25},0).wait(1).to({scaleX:30.9419,scaleY:30.9419,x:743.75,y:588.7},0).wait(1).to({scaleX:31.1946,scaleY:31.1946,x:744.6,y:590.2},0).wait(1).to({scaleX:31.447,scaleY:31.447,x:745.55,y:591.7},0).wait(1).to({scaleX:31.6995,scaleY:31.6995,x:746.45,y:593.15},0).wait(1).to({scaleX:31.9517,scaleY:31.9517,x:747.35,y:594.65},0).wait(1).to({scaleX:32.2039,scaleY:32.2039,x:748.25,y:596.1},0).wait(1).to({scaleX:32.4561,scaleY:32.4561,x:749.2,y:597.6},0).wait(1).to({scaleX:32.708,scaleY:32.708,x:750.1,y:599.1},0).wait(1).to({scaleX:32.96,scaleY:32.96,x:751,y:600.55},0).wait(1).to({scaleX:33.2117,scaleY:33.2117,x:751.9,y:602.05},0).wait(1).to({scaleX:33.4637,scaleY:33.4637,x:752.8,y:603.5},0).wait(1).to({scaleX:33.7152,scaleY:33.7152,x:753.7,y:605},0).wait(1).to({scaleX:33.9667,scaleY:33.9667,x:754.6,y:606.5},0).wait(1).to({scaleX:34.2182,scaleY:34.2182,x:755.5,y:607.95},0).wait(1).to({scaleX:34.4696,scaleY:34.4696,x:756.4,y:609.4},0).wait(1).to({scaleX:34.7209,scaleY:34.7209,x:757.3,y:610.9},0).wait(1).to({scaleX:34.9722,scaleY:34.9722,x:758.2,y:612.35},0).wait(1).to({scaleX:35.2232,scaleY:35.2232,x:759.1,y:613.8},0).wait(1).to({scaleX:35.4742,scaleY:35.4742,x:760,y:615.3},0).wait(1).to({scaleX:35.725,scaleY:35.725,x:760.9,y:616.75},0).wait(1).to({scaleX:35.9757,scaleY:35.9757,x:761.85,y:618.25},0).wait(1).to({scaleX:36.2265,scaleY:36.2265,x:762.75,y:619.75},0).wait(1).to({scaleX:36.477,scaleY:36.477,x:763.65,y:621.2},0).wait(1).to({scaleX:36.7276,scaleY:36.7276,x:764.55,y:622.65},0).wait(1).to({scaleX:36.9781,scaleY:36.9781,x:765.4,y:624.15},0).wait(1).to({scaleX:37.2284,scaleY:37.2284,x:766.3,y:625.6},0).wait(1).to({scaleX:37.4787,scaleY:37.4787,x:767.2,y:627.05},0).wait(1).to({scaleX:37.7288,scaleY:37.7288,x:768.1,y:628.55},0).wait(1).to({scaleX:37.9789,scaleY:37.9789,x:769,y:630},0).wait(1).to({scaleX:38.2287,scaleY:38.2287,x:769.9,y:631.45},0).wait(1).to({scaleX:38.4785,scaleY:38.4785,x:770.8,y:632.95},0).wait(1).to({scaleX:38.7283,scaleY:38.7283,x:771.7,y:634.4},0).wait(1).to({scaleX:38.9779,scaleY:38.9779,x:772.6,y:635.85},0).wait(1).to({scaleX:39.2275,scaleY:39.2275,x:773.5,y:637.35},0).wait(1).to({scaleX:39.4771,scaleY:39.4771,x:774.4,y:638.8},0).wait(1).to({scaleX:39.7265,scaleY:39.7265,x:775.3,y:640.25},0).wait(1).to({scaleX:39.9758,scaleY:39.9758,x:776.2,y:641.75},0).wait(1).to({scaleX:40.2249,scaleY:40.2249,x:777.05,y:643.15},0).wait(1).to({scaleX:40.474,scaleY:40.474,x:777.95,y:644.6},0).wait(1).to({scaleX:40.7232,scaleY:40.7232,x:778.85,y:646.05},0).wait(1).to({scaleX:40.972,scaleY:40.972,x:779.75,y:647.55},0).wait(1).to({scaleX:41.2207,scaleY:41.2207,x:780.65,y:649},0).wait(1).to({scaleX:41.4695,scaleY:41.4695,x:781.55,y:650.45},0).wait(1).to({scaleX:41.7182,scaleY:41.7182,x:782.45,y:651.95},0).wait(1).to({scaleX:41.9666,scaleY:41.9666,x:783.35,y:653.4},0).wait(1).to({scaleX:42.215,scaleY:42.215,x:784.2,y:654.8},0).wait(1).to({scaleX:42.4634,scaleY:42.4634,x:785.1,y:656.3},0).wait(1).to({scaleX:42.7118,scaleY:42.7118,x:786,y:657.75},0).wait(1).to({scaleX:42.9597,scaleY:42.9597,x:786.9,y:659.2},0).wait(1).to({scaleX:43.2079,scaleY:43.2079,x:787.8,y:660.65},0).wait(1).to({scaleX:43.4558,scaleY:43.4558,x:788.7,y:662.15},0).wait(1).to({scaleX:43.7037,scaleY:43.7037,x:789.55,y:663.55},0).wait(1).to({scaleX:43.9514,scaleY:43.9514,x:790.45,y:665},0).wait(1).to({scaleX:44.1991,scaleY:44.1991,x:791.35,y:666.5},0).wait(1).to({scaleX:44.4468,scaleY:44.4468,x:792.25,y:667.95},0).wait(1).to({scaleX:44.6943,scaleY:44.6943,x:793.1,y:669.35},0).wait(1).to({scaleX:44.9417,scaleY:44.9417,x:794,y:670.8},0).wait(1).to({scaleX:45.1889,scaleY:45.1889,x:794.9,y:672.3},0).wait(1).to({scaleX:45.4361,scaleY:45.4361,x:795.8,y:673.75},0).wait(1).to({scaleX:45.6834,scaleY:45.6834,x:796.65,y:675.15},0).wait(1).to({scaleX:45.9303,scaleY:45.9303,x:797.55,y:676.65},0).wait(1).to({scaleX:46.1773,scaleY:46.1773,x:798.45,y:678.1},0).wait(1).to({scaleX:46.424,scaleY:46.424,x:799.3,y:679.5},0).wait(1).to({scaleX:46.6708,scaleY:46.6708,x:800.2,y:680.95},0).wait(1).to({scaleX:46.9175,scaleY:46.9175,x:801.1,y:682.45},0).wait(1).to({scaleX:47.164,scaleY:47.164,x:801.95,y:683.85},0).wait(1).to({scaleX:47.4105,scaleY:47.4105,x:802.85,y:685.3},0).wait(1).to({scaleX:47.6568,scaleY:47.6568,x:803.8,y:686.75},0).wait(1).to({scaleX:47.9031,scaleY:47.9031,x:804.65,y:688.2},0).wait(1).to({scaleX:48.1493,scaleY:48.1493,x:805.55,y:689.65},0).wait(1).to({scaleX:48.3953,scaleY:48.3953,x:806.45,y:691.1},0).wait(1).to({scaleX:48.6414,scaleY:48.6414,x:807.3,y:692.5},0).wait(1).to({scaleX:48.8872,scaleY:48.8872,x:808.2,y:694},0).wait(1).to({scaleX:49.133,scaleY:49.133,x:809.05,y:695.4},0).wait(1).to({scaleX:49.3787,scaleY:49.3787,x:809.95,y:696.85},0).wait(1).to({scaleX:49.6243,scaleY:49.6243,x:810.8,y:698.25},0).wait(1).to({scaleX:49.8698,scaleY:49.8698,x:811.7,y:699.75},0).wait(1).to({scaleX:50.1152,scaleY:50.1152,x:812.6,y:701.2},0).wait(1).to({scaleX:50.3605,scaleY:50.3605,x:813.45,y:702.6},0).wait(1).to({scaleX:50.6058,scaleY:50.6058,x:814.35,y:704.05},0).wait(1).to({scaleX:50.8509,scaleY:50.8509,x:815.2,y:705.5},0).wait(1).to({scaleX:51.0959,scaleY:51.0959,x:816.15,y:706.95},0).wait(1).to({scaleX:51.3408,scaleY:51.3408,x:817,y:708.35},0).wait(1).to({scaleX:51.5856,scaleY:51.5856,x:817.9,y:709.8},0).wait(1).to({scaleX:51.8305,scaleY:51.8305,x:818.75,y:711.25},0).wait(1).to({scaleX:52.0751,scaleY:52.0751,x:819.65,y:712.7},0).wait(1).to({scaleX:52.3197,scaleY:52.3197,x:820.5,y:714.1},0).wait(1).to({scaleX:52.564,scaleY:52.564,x:821.35,y:715.5},0).wait(1).to({scaleX:52.8084,scaleY:52.8084,x:822.25,y:716.95},0).wait(1).to({scaleX:53.0528,scaleY:53.0528,x:823.1,y:718.4},0).wait(1).to({scaleX:53.2969,scaleY:53.2969,x:824.05,y:719.85},0).wait(1).to({scaleX:53.541,scaleY:53.541,x:824.9,y:721.25},0).wait(1).to({scaleX:53.7851,scaleY:53.7851,x:825.8,y:722.7},0).wait(1).to({scaleX:54.029,scaleY:54.029,x:826.65,y:724.15},0).wait(1).to({scaleX:54.2727,scaleY:54.2727,x:827.5,y:725.55},0).wait(1).to({scaleX:54.5166,scaleY:54.5166,x:828.4,y:727},0).wait(1).to({scaleX:54.76,scaleY:54.76,x:829.25,y:728.4},0).wait(1).to({scaleX:55.0036,scaleY:55.0036,x:830.1,y:729.8},0).wait(1).to({scaleX:55.2471,scaleY:55.2471,x:831.05,y:731.3},0).wait(1).to({scaleX:55.4905,scaleY:55.4905,x:831.9,y:732.7},0).wait(1).to({scaleX:55.7336,scaleY:55.7336,x:832.75,y:734.1},0).wait(1).to({scaleX:55.9768,scaleY:55.9768,x:833.65,y:735.55},0).wait(1).to({scaleX:56.2198,scaleY:56.2198,x:834.5,y:736.95},0).wait(1).to({scaleX:56.4627,scaleY:56.4627,x:835.35,y:738.4},0).wait(1).to({scaleX:56.7056,scaleY:56.7056,x:836.25,y:739.85},0).wait(1).to({scaleX:56.9483,scaleY:56.9483,x:837.15,y:741.25},0).wait(1).to({scaleX:57.1911,scaleY:57.1911,x:838,y:742.65},0).wait(1).to({scaleX:57.4338,scaleY:57.4338,x:838.85,y:744.05},0).wait(1).to({scaleX:57.6762,scaleY:57.6762,x:839.75,y:745.55},0).wait(1).to({scaleX:57.9184,scaleY:57.9184,x:840.6,y:746.95},0).wait(1).to({scaleX:58.1609,scaleY:58.1609,x:841.45,y:748.35},0).wait(1).to({scaleX:58.4031,scaleY:58.4031,x:842.35,y:749.75},0).wait(1).to({scaleX:58.6451,scaleY:58.6451,x:843.25,y:751.2},0).wait(1).to({scaleX:58.8871,scaleY:58.8871,x:844.1,y:752.65},0).wait(1).to({scaleX:59.1291,scaleY:59.1291,x:844.95,y:754.05},0).wait(1).to({scaleX:59.3709,scaleY:59.3709,x:845.8,y:755.45},0).wait(1).to({scaleX:59.6126,scaleY:59.6126,x:846.7,y:756.85},0).wait(1).to({scaleX:59.8544,scaleY:59.8544,x:847.55,y:758.25},0).wait(1).to({scaleX:60.0959,scaleY:60.0959,x:848.45,y:759.7},0).wait(1).to({scaleX:60.3372,scaleY:60.3372,x:849.3,y:761.15},0).wait(1).to({scaleX:60.5787,scaleY:60.5787,x:850.15,y:762.55},0).wait(1).to({scaleX:60.8199,scaleY:60.8199,x:851.05,y:763.95},0).wait(1).to({scaleX:61.061,scaleY:61.061,x:851.9,y:765.35},0).wait(1).to({scaleX:61.302,scaleY:61.302,x:852.75,y:766.75},0).wait(1).to({scaleX:61.5431,scaleY:61.5431,x:853.6,y:768.2},0).wait(1).to({scaleX:61.7839,scaleY:61.7839,x:854.45,y:769.6},0).wait(1).to({scaleX:62.0247,scaleY:62.0247,x:855.35,y:771},0).wait(1).to({scaleX:62.2655,scaleY:62.2655,x:856.25,y:772.45},0).wait(1).to({scaleX:62.506,scaleY:62.506,x:857.1,y:773.85},0).wait(1).to({scaleX:62.7466,scaleY:62.7466,x:857.95,y:775.25},0).wait(1).to({scaleX:62.9869,scaleY:62.9869,x:858.8,y:776.65},0).wait(1).to({scaleX:63.2273,scaleY:63.2273,x:859.7,y:778.1},0).wait(1).to({scaleX:63.4674,scaleY:63.4674,x:860.55,y:779.5},0).wait(1).to({scaleX:63.7077,scaleY:63.7077,x:861.4,y:780.9},0).wait(1).to({scaleX:63.9475,scaleY:63.9475,x:862.25,y:782.3},0).wait(1).to({scaleX:64.1876,scaleY:64.1876,x:863.15,y:783.7},0).wait(1).to({scaleX:64.4275,scaleY:64.4275,x:864,y:785.1},0).wait(1).to({scaleX:64.6671,scaleY:64.6671,x:864.85,y:786.55},0).wait(1).to({scaleX:64.9067,scaleY:64.9067,x:865.7,y:787.95},0).wait(1).to({scaleX:65.1463,scaleY:65.1463,x:866.6,y:789.35},0).wait(1).to({scaleX:65.3857,scaleY:65.3857,x:867.45,y:790.75},0).wait(1).to({scaleX:65.6251,scaleY:65.6251,x:868.3,y:792.15},0).wait(1).to({scaleX:65.8645,scaleY:65.8645,x:869.1,y:793.5},0).wait(1).to({scaleX:66.1036,scaleY:66.1036,x:870,y:794.9},0).wait(1).to({scaleX:66.3427,scaleY:66.3427,x:870.85,y:796.35},0).wait(1).to({scaleX:66.5816,scaleY:66.5816,x:871.7,y:797.75},0).wait(1).to({scaleX:66.8205,scaleY:66.8205,x:872.55,y:799.15},0).wait(1).to({scaleX:67.0594,scaleY:67.0594,x:873.45,y:800.55},0).wait(1).to({scaleX:67.2981,scaleY:67.2981,x:874.3,y:801.95},0).wait(1).to({scaleX:67.5368,scaleY:67.5368,x:875.15,y:803.35},0).wait(1).to({scaleX:67.7752,scaleY:67.7752,x:876,y:804.75},0).wait(1).to({scaleX:68.0136,scaleY:68.0136,x:876.85,y:806.1},0).wait(1).to({scaleX:68.2521,scaleY:68.2521,x:877.7,y:807.55},0).wait(1).to({scaleX:68.4902,scaleY:68.4902,x:878.55,y:808.95},0).wait(1).to({scaleX:68.7284,scaleY:68.7284,x:879.45,y:810.35},0).wait(1).to({scaleX:68.9664,scaleY:68.9664,x:880.3,y:811.75},0).wait(1).to({scaleX:69.2043,scaleY:69.2043,x:881.1,y:813.1},0).wait(1).to({scaleX:69.4423,scaleY:69.4423,x:881.95,y:814.5},0).wait(1).to({scaleX:69.68,scaleY:69.68,x:882.85,y:815.9},0).wait(1).to({scaleX:69.9177,scaleY:69.9177,x:883.7,y:817.3},0).wait(1).to({scaleX:70.1552,scaleY:70.1552,x:884.55,y:818.7},0).wait(1).to({scaleX:70.3927,scaleY:70.3927,x:885.4,y:820.1},0).wait(1).to({scaleX:70.581,scaleY:70.581,x:886.05,y:821.2},0).wait(276));

	// Фон
	this.instance_4 = new lib.CachedBmp_13();
	this.instance_4.setTransform(-0.5,-0.5,0.5,0.5);

	this.instance_5 = new lib.Символ2();
	this.instance_5.setTransform(886.1,824.65,70.581,70.581,0,0,0,5,5);

	this.instance_6 = new lib.CachedBmp_14();
	this.instance_6.setTransform(-0.5,-0.5,0.5,0.5);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_4}]}).to({state:[{t:this.instance_6},{t:this.instance_5}]},375).wait(179));

	this._renderFirstFrame();

}).prototype = p = new lib.AnMovieClip();
p.nominalBounds = new cjs.Rectangle(-270,377,2193.4,916.0999999999999);
// library properties:
lib.properties = {
	id: 'C46554611346814BB9EDCA972D4693C7',
	width: 1024,
	height: 1024,
	fps: 24,
	color: "#FFFFFF",
	opacity: 1.00,
	manifest: [
		{src:"images/CachedBmp_10.png", id:"CachedBmp_10"},
		{src:"images/CachedBmp_8.png", id:"CachedBmp_8"},
		{src:"images/CachedBmp_7.png", id:"CachedBmp_7"},
		{src:"images/CachedBmp_6.png", id:"CachedBmp_6"},
		{src:"images/CachedBmp_5.png", id:"CachedBmp_5"},
		{src:"images/CachedBmp_14.png", id:"CachedBmp_14"},
		{src:"images/CachedBmp_13.png", id:"CachedBmp_13"},
		{src:"images/animate_atlas_1.png", id:"animate_atlas_1"},
		{src:"images/animate_atlas_2.png", id:"animate_atlas_2"},
		{src:"sounds/Driftingat432HzUnicornHeads.mp3", id:"Driftingat432HzUnicornHeads"}
	],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['C46554611346814BB9EDCA972D4693C7'] = {
	getStage: function() { return exportRoot.stage; },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}


an.makeResponsive = function(isResp, respDim, isScale, scaleType, domContainers) {		
	var lastW, lastH, lastS=1;		
	window.addEventListener('resize', resizeCanvas);		
	resizeCanvas();		
	function resizeCanvas() {			
		var w = lib.properties.width, h = lib.properties.height;			
		var iw = window.innerWidth, ih=window.innerHeight;			
		var pRatio = window.devicePixelRatio || 1, xRatio=iw/w, yRatio=ih/h, sRatio=1;			
		if(isResp) {                
			if((respDim=='width'&&lastW==iw) || (respDim=='height'&&lastH==ih)) {                    
				sRatio = lastS;                
			}				
			else if(!isScale) {					
				if(iw<w || ih<h)						
					sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==1) {					
				sRatio = Math.min(xRatio, yRatio);				
			}				
			else if(scaleType==2) {					
				sRatio = Math.max(xRatio, yRatio);				
			}			
		}
		domContainers[0].width = w * pRatio * sRatio;			
		domContainers[0].height = h * pRatio * sRatio;
		domContainers.forEach(function(container) {				
			container.style.width = w * sRatio + 'px';				
			container.style.height = h * sRatio + 'px';			
		});
		stage.scaleX = pRatio*sRatio;			
		stage.scaleY = pRatio*sRatio;
		lastW = iw; lastH = ih; lastS = sRatio;            
		stage.tickOnUpdate = false;            
		stage.update();            
		stage.tickOnUpdate = true;		
	}
}
an.handleSoundStreamOnTick = function(event) {
	if(!event.paused){
		var stageChild = stage.getChildAt(0);
		if(!stageChild.paused || stageChild.ignorePause){
			stageChild.syncStreamSounds();
		}
	}
}
an.handleFilterCache = function(event) {
	if(!event.paused){
		var target = event.target;
		if(target){
			if(target.filterCacheList){
				for(var index = 0; index < target.filterCacheList.length ; index++){
					var cacheInst = target.filterCacheList[index];
					if((cacheInst.startFrame <= target.currentFrame) && (target.currentFrame <= cacheInst.endFrame)){
						cacheInst.instance.cache(cacheInst.x, cacheInst.y, cacheInst.w, cacheInst.h);
					}
				}
			}
		}
	}
}


})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;