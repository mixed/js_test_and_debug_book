// Mock setTimeout, clearTimeout
// Contributed by Pivotal Computer Systems, www.pivotalsf.com

var __originals = { 
	st : setTimeout,
	si : setInterval,
	ct : clearTimeout,
	ci : clearInterval
};

eval("var setTimeout, setInterval, clearTimeout, clearInterval;");

setTimeout = __originals.st;
setInterval = __originals.si;
clearTimeout = __originals.ct;
clearInterval = __originals.ci;

__originals = undefined;

var TimerMock = {
	_addNewTimer : false,
	timeKey : 0 ,
	scheduledFunc : {},
	nowTime : 0,
	methodName : ["setTimeout","setInterval","clearTimeout","clearInterval"],
	nativeFunc : {},
	replace : function(){
		var self = this;
		for(var i = 0, l = this.methodName.length ; i < l ; i++){
			this.nativeFunc[this.methodName[i]] = window[this.methodName[i]];
			
			window[this.methodName[i]] = self[self.methodName[i]];
		}
		this.reset();
	},
	restore : function(){
		for(var i = 0, l = this.methodName.length ; i < l ; i++){
			window[i] = this.nativeFunc[this.methodName[i]];
		}
		this.reset();
	},
	setTimeout : function(func,time){
		TimerMock.timeKey++;
		TimerMock._scheduleFunc(TimerMock.timeKey, func, time, false);
		return TimerMock.timeKey;	
	},
	setInterval : function(func,time){
		TimerMock.timeKey++;
		TimerMock._scheduleFunc(TimerMock.timeKey, func, time, true);
		return TimerMock.timeKey;
	},
	
	clearTimeout : function(timeKey){
		 TimerMock.scheduledFunc[timeKey] = undefined;
	},

	clearInterval : function(timeKey){
		TimerMock.scheduledFunc[timeKey] = undefined;
		TimerMock.clearIntervalCode =  "*!-clear-!*="+timeKey;
	},

	reset : function() {
        this.scheduledFunc = {};
        this.nowTime = 0;
        this.timeKey = 0;
    },

    flow : function(time){			
		var oldTime = TimerMock.nowTime;
        var newTime = oldTime + time;
        TimerMock._runFuncInRange(oldTime, newTime);
        this.nowTime = newTime;
    },

    _runFuncInRange : function(oldTime, nowTime) {
        var func;
		this._addNewTimer = false;
        var funcsToRun = [];
        for (var timeKey in this.scheduledFunc) {
            func = this.scheduledFunc[timeKey];
            if (func&&func.runAtTime >= oldTime && func.runAtTime <= nowTime){
                funcsToRun.push(func);
                delete this.scheduledFunc[timeKey];
            }
        }
        if (funcsToRun.length > 0) {
            funcsToRun.sort(function(a, b) {
                return a.runAtTime - b.runAtTime;
            });
            for (var i = 0,l=funcsToRun.length ; i <l ; i++) {
                try {
                    this.nowTime = funcsToRun[i].runAtTime;
                    funcsToRun[i].funcToCall();
					if(this.clearIntervalCode === "*!-clear-!*="+timeKey){
						this.clearIntervalCode = null;
						break;
					}
                    if (funcsToRun[i].recurring) {
                        this._scheduleFunc(funcsToRun[i].timeKey, funcsToRun[i].funcToCall, funcsToRun[i].time, true);
                    }
                } catch(e) {
                }
            }
        }	
		if(this._addNewTimer){//65번째 라인에서 함수를 호출시 새로운 timer가 실행됬을때 해당 timer가 지나간 시간에 포함 되어 있으면 실행하기 위해 한번 더 실행함.
			this._runFuncInRange(oldTime, nowTime);
		}
    },
    _scheduleFunc : function(timeKey, funcToCall, time, recurring) {	
		this._addNewTimer = true;
        this.scheduledFunc[timeKey] = {
            runAtTime: this.nowTime + time,
            funcToCall: funcToCall,
            recurring: recurring,
            timeKey: timeKey,
            time: time
        };
    }
};