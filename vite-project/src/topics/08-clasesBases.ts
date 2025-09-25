export class Persona{
    // public nombre: string;
    // public direccion: string;

    // constructor(nombre1: string, direccion1: string){
    //     this.nombre=nombre1;
    //     this.direccion=direccion1;
    // }

    constructor(public nombre1: string, public direccion1: string, public peso: number)
    {

    }


}
const objPersona= new Persona('Oscar','Puebla',96);
console.log(objPersona);

// export class SuperHero extends Persona{
//     constructor(public sobrenombre: string, public edad:number, public nombre: string, public direc: string){
//         super(nombre,direc, 70);
//     }

// }
// const pers =new SuperHero('Daredevil',25,'Matt Murdock','Hells Kitchen');
// console.log(pers);


export class SuperHero{
    constructor(public sobrenombre: string, public edad: number, public nombre: string, public person: Persona){

    }
}
const objPer = new Persona('Matt Murdock','Hells Kitchen',76);
const Osc2=new SuperHero('Daredevil',23,'matt murdock', objPer);
console.log(Osc2)


