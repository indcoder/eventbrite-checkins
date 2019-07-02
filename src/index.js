"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var got = require("got");
var debug = require('debug')('eb-eventbrite');
/**
 * Get attendees that are checked-in for an Eventbrite event
 * @param {string} accessToken
 * @param {number} eventID
 * @param {string} flag
 * @return {[string]}
 */
function getAttendeesForEvent(accessToken, eventID, flag) {
    return __awaiter(this, void 0, void 0, function () {
        var response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    debug("Flag is " + flag);
                    // if(arguments.length < 2 || (typeof accessToken === 'undefined') || (eventID === 'undefined')) {
                    //     throw new Error('INCORRECT_ARGUMENTS');
                    //   }
                    if (flag && !(['noshow', 'checkedin', 'all'].indexOf(flag.toLowerCase()) > -1)) {
                        throw new Error('INCORRECT_FLAG');
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    console.log('URL is ' + ("https://www.eventbriteapi.com/v3/events/" + eventID + "/attendees/"));
                    return [4 /*yield*/, got.get("https://www.eventbriteapi.com/v3/events/" + eventID + "/attendees/", { json: true })];
                case 2:
                    response = _a.sent();
                    return [2 /*return*/, response.body];
                case 3:
                    err_1 = _a.sent();
                    console.error('Error in EB API invocation ', err_1);
                    //throw new Error(err);
                    return [2 /*return*/, []];
                case 4:
                    ;
                    return [2 /*return*/];
            }
        });
    });
}
exports.getAttendeesForEvent = getAttendeesForEvent;
function hasRegisteredForEvent(accessToken, eventID, attendeeID) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, { 'eb_id': 'testID', 'name': 'testname' }];
        });
    });
}
exports.hasRegisteredForEvent = hasRegisteredForEvent;
// module.exports = {
//   getAttendeesForEvent,
//   hasRegisteredForEvent,
// };
