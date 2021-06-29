export function clamp(value:number, min:number, max:number) {
    return value < min ? min : value > max ? max : value;
}

// https://stackoverflow.com/questions/4467539/javascript-modulo-gives-a-negative-result-for-negative-numbers
export function mod(n: number, m: number) {
    return ((n % m) + m) % m;
}
