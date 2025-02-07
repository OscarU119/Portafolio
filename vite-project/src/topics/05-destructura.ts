interface Audio{
    nivelvolumen: number;
    duracion: number;
    sonido: string;
    detalles:Detalles;
}

interface Detalles{
    autor: string;
    año: number;
}

const audio:Audio={
    nivelvolumen:90,
    duracion: 36,
    sonido: 'Mess',
    detalles:{
        autor: 'Ed',
        año: 2015
    }
}

const{
    nivelvolumen:volumen,
    detalles: {autor}
}=audio;

 console.log('Autor',autor);

 console.log('Volumen con desestructuracion', volumen);
 console.log('Sonido', audio.sonido);
 console.log('Duracion',audio.duracion);
 console.log('Autor', audio.detalles.autor);

 const arre1: string[]=['Frolian Aranzu', 'Eleuterio casimira', 'Zenobia Bartolome'];
 console.log('Persona 3', arre1[2] || 'No hay personaje');

 const [,,,,ultimo='No existe']: string[]=['Pantaleon Orfelinda', 'Severiano Briseida', 'Procoro Filomena', 'Ludovico Ismelda'];
  console.log('Personaje3',ultimo);

  