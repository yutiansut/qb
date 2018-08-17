export class Util {

    static fromFloat(v, fractionDigits) {
        if(!v) return 0;
        if (fractionDigits <= 0) return v;
        let text = v && v.toFixed(fractionDigits);
        for (let i = text.length - 1; i >= 0; i--) {
            if (text[i] === '.')
                return text.substring(0, i);
            if (text[i] !== '0')
                return text.substring(0, i + 1);
        }
    };

    static formatTime(v) {
        return (v < 10) ? "0" + v.toString() : v.toString();
    }

    static isInstance(obj, clazz) {
        if (obj === null || obj === undefined) {
            return false;
        }
        return obj instanceof clazz;
    }

}