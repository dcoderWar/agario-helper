'use strict';

module.exports = {
    createUUID() {
        // http://www.ietf.org/rfc/rfc4122.txt
        let s = new Array(36);
        let hexDigits = "0123456789abcdef";
        for (let i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";

        return s.join("");
    },
    upTime() { // http://stackoverflow.com/posts/28705478/revisions
        let seconds = process.uptime();

        let pad = s => (s < 10 ? '0' : '') + s;

        let hours = Math.floor(seconds / (60 * 60));
        let minutes = Math.floor(seconds % (60 * 60) / 60);
        seconds = Math.floor(seconds % 60);

        return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);

    }
};