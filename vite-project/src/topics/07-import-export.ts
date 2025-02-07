import { calcularCompra, Producto } from "./06-desArgumentos";

const comprarProd: Producto[]=[
    {
        descripcion:'Nokia',
        precio: 100
    },
    {
        descripcion: 'Ipad',
        precio: 200
    }
];

const[total, imtotal] = calcularCompra({
    productos: comprarProd,
    impuesto: 0.15
});

console.log('Productos2',comprarProd);
console.log('Total', total);
console.log('Impuesto', imtotal);
