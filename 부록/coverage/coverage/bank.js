if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['/Users/nhn/Sites/js_test_and_debug_book/부록/coverage/bank.js']) {
   __coverage__['/Users/nhn/Sites/js_test_and_debug_book/부록/coverage/bank.js'] = {"path":"/Users/nhn/Sites/js_test_and_debug_book/부록/coverage/bank.js","s":{"1":0,"2":0,"3":0,"4":0,"5":0,"6":0,"7":0},"b":{"1":[0,0],"2":[0,0]},"f":{"1":0,"2":0,"3":0,"4":0},"fnMap":{"1":{"name":"(anonymous_1)","line":3,"loc":{"start":{"line":3,"column":13},"end":{"line":3,"column":29}}},"2":{"name":"(anonymous_2)","line":8,"loc":{"start":{"line":8,"column":14},"end":{"line":8,"column":30}}},"3":{"name":"(anonymous_3)","line":14,"loc":{"start":{"line":14,"column":15},"end":{"line":14,"column":25}}},"4":{"name":"(anonymous_4)","line":17,"loc":{"start":{"line":17,"column":15},"end":{"line":17,"column":31}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":20,"column":2}},"2":{"start":{"line":4,"column":2},"end":{"line":6,"column":3}},"3":{"start":{"line":5,"column":3},"end":{"line":5,"column":33}},"4":{"start":{"line":9,"column":2},"end":{"line":9,"column":37}},"5":{"start":{"line":10,"column":2},"end":{"line":12,"column":3}},"6":{"start":{"line":15,"column":2},"end":{"line":15,"column":21}},"7":{"start":{"line":18,"column":2},"end":{"line":18,"column":23}}},"branchMap":{"1":{"line":4,"type":"if","locations":[{"start":{"line":4,"column":2},"end":{"line":4,"column":2}},{"start":{"line":4,"column":2},"end":{"line":4,"column":2}}]},"2":{"line":10,"type":"if","locations":[{"start":{"line":10,"column":2},"end":{"line":10,"column":2}},{"start":{"line":10,"column":2},"end":{"line":10,"column":2}}]}}};
}
var __cov_NDBBeXaN8l2sE3e4WYA6vQ = __coverage__['/Users/nhn/Sites/js_test_and_debug_book/부록/coverage/bank.js'];
__cov_NDBBeXaN8l2sE3e4WYA6vQ.s['1']++;
var Bank = {
        'amount': 0,
        'deposit': function (amount) {
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.f['1']++;
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['2']++;
            if (amount > 100) {
                __cov_NDBBeXaN8l2sE3e4WYA6vQ.b['1'][0]++;
                __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['3']++;
                this.amount = this.amount * 100;
            } else {
                __cov_NDBBeXaN8l2sE3e4WYA6vQ.b['1'][1]++;
            }
        },
        'withdraw': function (amount) {
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.f['2']++;
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['4']++;
            this.amount = this.amount - amount;
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['5']++;
            if (amount > 100) {
                __cov_NDBBeXaN8l2sE3e4WYA6vQ.b['2'][0]++;
            } else {
                __cov_NDBBeXaN8l2sE3e4WYA6vQ.b['2'][1]++;
            }
        },
        'getAmount': function () {
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.f['3']++;
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['6']++;
            return this.amount;
        },
        'setAmount': function (amount) {
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.f['4']++;
            __cov_NDBBeXaN8l2sE3e4WYA6vQ.s['7']++;
            this.amount = amount;
        }
    };
