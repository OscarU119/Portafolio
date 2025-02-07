interface SuperHero{
    nombre: string;
    age: number;
    adress:{
        calle: string,
        pais:string,
        ciudad: string
    };
    showAddress():string;
}

interface SuperHero{
    nombre: string;
    age: number;
    adress:{
        calle: string,
        pais:string,
        ciudad: string
    };
    showAddress:()=>string;
}


interface SuperHero{
    nombre: string;
    age: number;
    adress: Adress;
    showAddress:()=>string;
}

interface Adress{
    calle: string;
    pais: string;
    ciudad: string;
}

const superHeroe: SuperHero={
    nombre: 'Spiderman',
    age: 30,
    adress:{
        calle: 'Queens',
        pais: 'EUA',
        ciudad: 'New-York'
    },
    showAddress() {
        return this.nombre + ',' + this.adress.ciudad + ',' +this.adress.pais
    }
}

const adress = superHeroe.showAddress();
console.log(adress)