function addnumeros(a:number, b:number):number{
    return a+b
}

const result:number=addnumeros(1,2)
console.log({result})

function otrafun()
{

}
const addnumerosA=(a:number, b:number):string =>{
    return `${a+b}`;
}

const poema =`Este es un poema 
que ocupa 
varias lineas`
console.log(poema)

const re:string=addnumerosA(4,5)
console.log({re})

function masDatos(n1:number, n2?:number, base:number=2){
    return n1*base;
}

interface datosymasDatos{
    nombre: string;
    edad: number;
    mostrarDatos: ()=> void;
}

const misDatos=(dato: datosymasDatos, masEdad: number)=>{
    dato.edad+= masEdad;
}

const persona: datosymasDatos={
    nombre: 'Oscar',
    edad: 20,
    mostrarDatos(){
        console.log(`la edad es ${this.edad}`);
        console.log(`El nombre es ${this.nombre}`);
    }
}

misDatos(persona,10);
misDatos(persona,30);
persona.mostrarDatos();