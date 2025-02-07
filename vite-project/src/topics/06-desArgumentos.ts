export interface Producto{
    descripcion: string;
    precio: number;
}

const telefono: Producto={
    descripcion: 'Xiaomi RedmiNote 13',
    precio: 4500.0
}
const tableta: Producto={
    descripcion: 'Ipad Pro',
    precio: 6000.00
}

interface ICalcularCompra{
    impuesto: number;
    productos: Producto[];
}
// function calcularCompra(options: ICalcularCompra): number[]
// {
//     let total=0;
//     options.productos.forEach(productito=>{
//         total+=productito.precio;
//     });
//     return [total, total* options.impuesto];
// }

//function calcularCompra(options: ICalcularCompra):[number, number];
//function calcularCompra({impuesto, productos}: ICalcularCompra):[number, number];
export function calcularCompra(options: ICalcularCompra): [number, number]
{
    const{impuesto,productos}=options;
    let total=0;
    productos.forEach(({precio})=>{
        total+=precio;
    });
    return[total, total*impuesto];    
}

const compras = [telefono, tableta];
console.log("Detalle de la compra", compras);
const impuesto= 0.15;
