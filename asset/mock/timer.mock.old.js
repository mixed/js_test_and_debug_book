/**
 * @fileoverview
 * 
 * 자바스크립트의 setTimeout / setInterval 과 같은 타이머 기능을 테스트하기 수월하게 해주는 기능을 제공합니다.
 * 자세한 내용은 링크의 문서를 참조해 주시고, 좀 더 자세한 사용 방법은 테스트 코드를 보시면 됩니다. 
 * 
 * @author Gloridea
 * @link http://ajaxui.nhndesign.com/svnview/yorky/gloridea/Timer/trunk/doc/TimerMock.html
 */
if (!window.nhn) nhn = {};
if (!window.nhn.test) nhn.test = {};

/*
 * IE6/7/8은 전역변수 setTimeout이 window 객체의 프로토타입에 있는 setTimeout의 read-only 사본임.
 * 그래서 window.setTimeout을 override해도 전역변수 setTimeout은 override한 함수를 가리키지 않으며,
 * 전역변수 setTimeout은 read-only 이기 때문에 할당으로 처리할 수도 없다.
 * 아래 루틴은 이 문제를 회피하기 위한 workaround이다.
 * 
 * 참고 : http://www.adequatelygood.com/2011/4/Replacing-setTimeout-Globally
 */
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


/**
 * 한 개의 타이머 이벤트 객체입니다.
 * 
 * @class nhn.test.TimerUnit
 * 
 * @constructor
 * @param timerId
 *            {Number} 타이머 ID
 * @param callback
 *            {Function} 지정된 시간이 되었을 때 실행할 콜백 함수
 * @param fireTime
 *            {Number} 실행하기로 예약된 시간
 */
nhn.test.TimerUnit = function(timerId, callback, fireTime) {
	this._timerId = timerId;
	this._callback = callback;
	this._fireTime = fireTime;
};

nhn.test.TimerUnit.prototype = {
	constructor: nhn.test.TimerUnit,
	getTimerId: function() {
		return this._timerId;
	},
	getCallback: function() {
		return this._callback;
	},
	getFireTime: function() {
		return this._fireTime;
	},
	setFireTime: function(fireTime) {
		this._fireTime = fireTime;
	}
};

/**
 * @class nhn.test.TimeLine
 *     타이머 목록을 순서대로 보관하는 타임라인 객체입니다.
 */
nhn.test.TimeLine = function() {
	this._timerUnitList = [];
};

nhn.test.TimeLine.prototype = {
	constructor: nhn.test.TimeLine,
	
	/**
	 * 타임라인상에 타이머 객체(TimerUnit) 하나를 추가합니다.
	 * 
	 * @param timerUnit {nhn.test.TimerUnit} 타임라인상에 추가할 타이머 객체
	 */
	add: function(timerUnit) {
		var fireTime = timerUnit.getFireTime();
		
		for (var i = 0, il = this._timerUnitList.length; i < il; i++) {
			if (this._timerUnitList[i].getFireTime() > fireTime) {
				this._timerUnitList.splice(i, 0, timerUnit);
				return;
			}
		}
		
		this._timerUnitList.push(timerUnit);
	},
	
	/**
	 * 주어진 시간 이전의 타이머 중 가장 앞에 있는 1개의 타이머 객체를 반환합니다.
	 * 없으면 null을 반환합니다.
	 * 
	 * @param fireTime {Number} 타이머 객체를 찾을 범위 시간 
	 * @returns {?nhn.test.TimerUnit} 타이머 객체 
	 */
	takeNextTimerUnitBefore: function(fireTime) {
		if (this._timerUnitList[0] && this._timerUnitList[0].getFireTime() <= fireTime) {
			return this._timerUnitList.splice(0, 1)[0];
		}
		
		return null;
	},
	
	/**
	 * 주어진 타이머 ID와 일치하는 타이머 객체를 타임라인에서 제거합니다.
	 * 
	 * @param timerId {Number} 제거할 타이머 ID
	 */
	removeByTimerId: function(timerId) {
		for (var i = 0, il = this._timerUnitList.length; i < il; i++) {
			if (this._timerUnitList[i].getTimerId() == timerId) {
				this._timerUnitList.splice(i, 1);
				break;
			}
		}
	},
	
	/**
	 * 타임라인상의 타이머 객체를 모두 삭제합니다.
	 */
	empty: function() {
		this._timerUnitList.length = 0;
	}
};

/**
 * setTimeout 등의 대체 인터페이스를 제공하고, 이 인터페이스를 통해 받은 이벤트를
 * 원하는 시간 범위까지 수행시킬 수 있는 객체입니다.
 * 
 * @class nhn.test.ManualTimer
 * @singleton
 */
nhn.test.ManualTimer = {
	_currentTime: 0,
	_lastTimerId: 100,
	_timeLine: new nhn.test.TimeLine(),
	_flownTime: 0,

	/**
	 * window.setTimeout을 대체하는 함수입니다.
	 * @TODO callback 에 String이 들어올 수 있어야 함.
	 * 
	 * @param callback {Function} 지연 시간 이후 실행할 콜백 함수  
	 * @param delay	{Number} 실행 지연 시간
	 * @returns	{Number} 생성된 타이머 ID
	 */
	setTimeout: function(callback, delay) {
//		alert("setTimeout:" + callback);
		var fireTime = this._currentTime + delay;
		var timerId = this._generateTimerId();
		this._timeLine.add(new nhn.test.TimerUnit(timerId, callback, fireTime));
		return timerId;
	},
	
	/**
	 * window.clearTimeout을 대체하는 함수입니다.
	 * 
	 * @param timerId {Number} 해제할 타이머 ID
	 */
	clearTimeout: function(timerId) {
		this._timeLine.removeByTimerId(timerId);
	},
	
	/**
	 * window.setInterval을 대체하는 함수입니다.
	 * @TODO callback 에 String이 들어올 수 있어야 함.
	 * 
	 * @param callback {Function} 주어진 간격마다 실행할 콜백 함수  
	 * @param delay	{Number} 콜백 실행 간격
	 * @returns	{Number} 생성된 타이머 ID
	 */
	setInterval: function(callback, delay) {
		var self = this;
		
		function callbackWithRegisterItself() {
			callback();
			var nextFireTime = self._currentTime + delay;
			timerUnit.setFireTime(nextFireTime);
			self._timeLine.add(timerUnit);
		}

		var startFireTime = this._currentTime + delay;
		var timerId = this._generateTimerId();
		var timerUnit = new nhn.test.TimerUnit(timerId, callbackWithRegisterItself, startFireTime);
		
		this._timeLine.add(timerUnit);
		
		return timerId;
	},

	/**
	 * window.clearInterval을 대체하는 함수입니다.
	 * 
	 * @param timerId {Number} 해제할 타이머 ID
	 */
	clearInterval: function(timerId) {
		this.clearTimeout(timerId);
	},
	
	/**
	 * 등록된 타이머 중 주어진 시간 내에 있는 모든 타이머를 실행합니다.
	 * setInterval로 등록되어 여러번 실행되어야 하는 이벤트는 여러번 실행합니다.
	 * 
	 * @param time {Number} 흘려보낼 시간
	 */
	flow: function(time) {
		var destTime = this._flownTime += time;
		var isExecuted = false;
		
		do {
			isExecuted = this._flowOneToAbsTime(destTime);
		} while (isExecuted);
	},
	
	flowOne: function(time) {
		var destTime = this._flownTime += time;
		this._flowOneToAbsTime(destTime);
	},
	
	_flowOneToAbsTime: function(destTime) {
		var isExecuted = false;
		
		var timerUnit = this._timeLine.takeNextTimerUnitBefore(destTime);
			
		if (timerUnit) {
			this._currentTime = timerUnit.getFireTime();
			(timerUnit.getCallback())();
			isExecuted = true;
		} else {
			this._currentTime = destTime;
		}
		
		return isExecuted;
	},
	
	/**
	 * 타이머 ID를 생성합니다. 타이머 ID는 0이 아닌 정수값이며, 순차 증가합니다.
	 * 
	 * @private
	 * @returns {Number} 생성된 타이머 ID
	 */
	_generateTimerId: function() {
		return ++this._lastTimerId;
	},
	
	/**
	 * @returns {Date}
	 */
	getCurrentTime: function() {
		return this._currentTime;
	},

	/**
	 * ManalTimer의 현재 시각을 설정합니다.
	 * 
	 * @param time {Number} 설정할 시각의 timestamp 값
	 */
	setCurrentTime: function(time) {
		this._currentTime = time;
	},
	
	/**
	 * 타이머를 초기화합니다.
	 */
	reset: function() {
		this._currentTime = 0;
		this._flownTime = 0;
		this._timeLine.empty();
	}
};

/**
 * window.Date 객체를 대신해 사용할 날짜 클래스입니다.
 * nhn.test.ManualTimer 가 가진 시간을 기준으로 값을 반환합니다.
 * 기준 시간을 조작하는 과정에만 관여하며, 실제로 반환하는 값은 window.Date의 인스턴스입니다. 
 * 
 * @class nhn.test.DateMock
 * 
 * @constructor
 * @param year {?Number|String} 타임스탬프 값, 혹은 날짜 문자열, 혹은 연도 값
 * @param month {?Number} 월
 * @param day {?Number} 일
 * @param hours {?Number} 시
 * @param minutes {?Number} 분
 * @param seconds {?Number} 초
 * @param milliseconds {?Number} 밀리초
 * @returns
 */
nhn.test.DateMock = function (year, month, day, hours, minutes, seconds, milliseconds) {
	var NativeDate = nhn.test.DateMock.NATIVE_DATE;
	
	// new 없이 함수로 호출한 경우
	if (!(this instanceof nhn.test.DateMock)) {
		// ECMA Spec [15.9.2.1] 
		// 1. any arguments supplied are accepted but are completely ignored
		// 2. A String is created and returned as if by the expression (new Date()).toString().
		return new NativeDate(nhn.test.ManualTimer.getCurrentTime()).toString(); 
	}

	// 현재 시각을 요청한 경우
	if (arguments.length == 0) {
		return new NativeDate(nhn.test.ManualTimer.getCurrentTime());
		
	// 시간 문자열 혹은 timestamp를 받은 경우
	} else if (arguments.length == 1) {
		return new NativeDate(arguments[0]); // Date string or timestamp in msec
	
	// 설정할 시각을 넘겨받은 경우
	} else {
		switch(arguments.length) {
			case 2: day = 1;
			case 3: hours = 0;
			case 4: minutes = 0;
			case 5: seconds = 0;
			case 6: milliseconds = 0;
		}
		
		return new NativeDate(year, month, day, hours, minutes, seconds, milliseconds);
	}
};

nhn.test.DateMock.NATIVE_DATE = window.Date;
nhn.test.DateMock.prototype = {
	constructor: nhn.test.DateMock
};

/**
 * setTimeout 등의 대체 인터페이스를 제공하고, 이 인터페이스를 통해 받은 이벤트를
 * 원하는 시간 범위까지 수행시킬 수 있는 객체입니다.
 * 
 * @class nhn.test.ManualTimer
 * @singleton
 */
nhn.test.TimerMock = {
	_funcNames: ["setTimeout", "setInterval", "clearTimeout", "clearInterval"],
	_timerBackup: {},
	_nativeDateBackup: null,
	_isFuncReplaced: false,
	
	_bind: function(f, context) {
		return function() {
			return f.apply(context, arguments);
		};
	},

	/**
	 * window 객체의 기본 타이머 메서드들을 nhn.test.ManualTimer의 메서드들로 교체합니다.
	 */
	replace: function() {
		if (this._isReplaced()) {
			return;
		}
		
		this._replaceNative();
		
		nhn.test.ManualTimer.reset();
	},
	
	_replaceNative: function() {
		for (var i = 0, il = this._funcNames.length; i < il; i++) {
			var eachName = this._funcNames[i];
			this._timerBackup[eachName] = window[eachName];
			window[eachName] = this._makeWrappedTimerFunc(eachName);
		}
		
		this._nativeDateBackup = window.Date;
		
		window.Date = nhn.test.DateMock;
		
		this._isFuncReplaced = true;
	},
	
	_makeWrappedTimerFunc: function(methodName) {
		
		return function(callback, delay) {
			if (nhn.test.TimerMock._isBypass) {
				var nativeFunc = nhn.test.TimerMock._timerBackup[methodName];
				var isMSIE = (typeof nativeFunc == "object");
				
				if (isMSIE) {
					return nativeFunc(callback, delay);
				} else {
					return nativeFunc.apply(window, arguments);
				}
			} else {
				return nhn.test.ManualTimer[methodName](callback, delay);
			}
		};
	},
	
	/**
	 * window 객체의 기본 메서드들을 복원합니다.
	 */
	restore: function() {
		if (!this._isReplaced()) {
			return;
		}
		
		this._restoreNative();
		
		nhn.test.ManualTimer.reset();
	},
	
	_restoreNative: function() {
		for (var i = 0, il = this._funcNames.length; i < il; i++) {
			var eachName = this._funcNames[i];
			
			window[eachName] = this._timerBackup[eachName];
			delete this._timerBackup[eachName];
		}
		
		window.Date = this._nativeDateBackup;
		this._nativeDateBackup = null;
		
		this._isFuncReplaced = false;
	},
	
	/**
	 * 등록된 타이머 중 주어진 시간 내에 있는 모든 타이머를 실행합니다.
	 * setInterval로 등록되어 여러번 실행되어야 하는 이벤트는 여러번 실행합니다.
	 * 
	 * @param time {Number} 흘려보낼 시간
	 */
	flow: function(time) {
		this._checkFlowable();
		nhn.test.ManualTimer.flow(time);
	},

	/**
	 * 등록된 타이머 중 주어진 시간 내에 있는 첫 번째 타이머를 실행합니다.
	 * setInterval로 등록된 타이머는 한 번 실행 후 예정 시간의 가장 마지막에 추가됩니다.
	 * 
	 * @param time {Number} 흘려보낼 시간
	 */

	flowOne: function(time) {
		this._checkFlowable();
		nhn.test.ManualTimer.flowOne(time);
	},
	
	_checkFlowable: function() {
		if (!this._isReplaced() || this._isBypass) {
			throw new Error("Cannot flow time in unreplaced state or bypass state.");
		}
	},
	
	/**
	 * 받은 콜백 전후에 replace() / restore()으로 둘러싼 함수를 만들어주는 메서드입니다.
	 * setup / teardown 없이 한 번만 실행할 때 이 함수를 통해 편하게 사용할 수 있습니다.
	 *  
	 * @param callback {Function} 실행할 콜백 함수
	 */
	test: function(callback) {
		return function() {
			var isOnTx = nhn.test.TimerMock._isReplaced();
			
			if (!isOnTx) {
				nhn.test.TimerMock.replace();
			} else {
				nhn.test.TimerMock._resume();
			}
			
			try {
				callback.apply(this);
			} catch (ex) {
				throw ex;
			} finally {
				if (!isOnTx) {
					nhn.test.TimerMock.restore();
				} else {
					nhn.test.TimerMock._pause();
				}
			}
		};
	},
	
	_isReplaced: function() {
		return this._isFuncReplaced;
	},
	
	setup: function(callback) {
		return function() {
			var result = callback();
				
			if (!nhn.test.TimerMock._isReplaced()) {
				throw new Error("replace() is not called in setup.");
			}
			
			nhn.test.TimerMock._pause();
			return result;

		};
	},
	
	_pause: function() {
		this._isBypass = true;
	},
	
	teardown: function(callback) {
		return function() {
			nhn.test.TimerMock._resume();
			var result = callback();
			
			if (nhn.test.TimerMock._isReplaced()) {
				throw new Error("restore() is not called in teardown.");
			}
			
			return result;
			
		};
	},
	
	_resume: function() {
		this._isBypass = false;
	}
};
