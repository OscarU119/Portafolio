export function queTipo<T>(argumento:T): T{
    return argumento;
}
let soyCadena=queTipo<String>('Hola mundo');
let soyNumero=queTipo<number>(250);
let soyArreglo=queTipo<number[]>([1,2,3,4,5]);

console.log(soyCadena.split(''));
console.log(soyNumero.toFixed());
console.log(soyArreglo.join('_'));

