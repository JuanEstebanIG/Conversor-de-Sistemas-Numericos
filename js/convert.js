export function convert(num, base) {
    let dec = parseInt(num, base)
    return {
        bin: dec.toString(2),
        oct: dec.toString(8),
        hex: dec.toString(16).toUpperCase(),
        dec: dec
    };
};
export function validate(num, base) {
    num = num.trim().toLowerCase();
    const regex = {
        2: /^[10]+$/,
        8: /^[0-7]+$/,
        10: /^[0-9]+$/,
        16: /^[0-9a-f]+$/,
    };
    return regex[base].test(num);
};