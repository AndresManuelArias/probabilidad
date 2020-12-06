import  { Opbs }  from "https://raw.githubusercontent.com/AndresManuelArias/matematica_discreta/master/Operaciones_basica_conjuntos.ts";
//  https://github.com/dankogai/js-combinatorics#readme

let espacio_muestral = []// son todas la posibles respuestas
import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.min.js';
import {NotacionSigma} from 'https://raw.githubusercontent.com/AndresManuelArias/ejercicios_alg_trigo_geo/master/NotacionSigma/NotacionSigma.ts';
import * as  probabilidad  from "./index.ts";


//ejercicio 1 Tipo de ejercicios 1 - Distribución Binomial.
// 1)
let datos1:number[] = [...Array(16).keys()]
console.log(datos1.length)
let dados = new $C.Combination(datos1,11);
let [...D1]:string[] = dados;
 console.log(D1,D1.length);
//  D1.filter()
495*0.0000759375*0.16734324368961417
enum Opciones {
  mayorIgualQue,
  menorIgualQue,
  menorQue,
}


function imprimirDistribucionPoissonEntre(landa:number,cantidad:number,opciones:Opciones=Opciones.mayorIgualQue):string{
    let encabezado:string = ""
    let listadoNumeros:number[] = []
    let uno:number = 0
    let final:string = ""

    if(opciones == Opciones.menorQue){
        encabezado = `x < ${cantidad} `
        listadoNumeros = [... Array(cantidad).keys()]
        uno=0  
    }
    if(opciones == Opciones.mayorIgualQue){
        encabezado = `x >= ${cantidad} `
        listadoNumeros = [... Array(cantidad).keys()]
        uno=1
        final = `P( ${encabezado} )=${uno -listadoNumeros.map(n=>probabilidad.redondeo(probabilidad.distribucionPoisson(landa)(n))).reduce((a,b)=>a+b)} newline`
    }
    return `
    P( ${encabezado} )=${uno==0?"":uno} ${uno==1?"-":""} (${listadoNumeros.map(n=>`P( ${n}/ ${landa}  )`).join(" + ")}) newline
    P( ${encabezado} )=${uno==0?"":uno} ${uno==1?"-":""} (${listadoNumeros.map(n=>`${probabilidad.redondeo(probabilidad.distribucionPoisson(landa)(n))} `).join(" + ")}) newline
    P( ${encabezado} )=${uno==0?"":uno} ${uno==1?"-":""} ${listadoNumeros.map(n=>probabilidad.redondeo(probabilidad.distribucionPoisson(landa)(n))).reduce((a,b)=>a+b)} newline
    ${final}
    `
}

/*
Ejercicio 2. Distribución Poisson
e. En sismología, se dice que un terremoto es "fuerte" si tiene una magnitud de al menos seis medidos en la escala de Richter. 
Imagínese eso en un área que es golpeada frecuentemente por terremotos, el número de terremotos fuertes sigue un proceso de Poisson con una tasa de 2.5 por año.
1) ¿Cuál es la probabilidad de que haya al menos tres terremotos? */
let promedioMensual:number=2.5/12
console.log("promedioMensual",promedioMensual)
/**
 * magnitud (a) en un período de tres meses;
 */
console.log(1,"tres meses")
for (let index_ = 0; index_ < 3; index_++) {
    let respuestas:string[]= [... Array(6).keys()].map(index=>probabilidad.imprimirDistribucionPoisson(promedioMensual*3,index_,index))
    console.log(respuestas.join("\n"))
}
console.log(imprimirDistribucionPoissonEntre(promedioMensual*3,3))

/*
 (b) en un año?*/
 console.log("año")

for (let index_ = 0; index_ < 3; index_++) {
    let respuestas:string[]= [... Array(6).keys()].map(index=>probabilidad.imprimirDistribucionPoisson(promedioMensual*12,index_,index))
    console.log(respuestas.join("\n"))
}
console.log(imprimirDistribucionPoissonEntre(promedioMensual*12,3))

 /*
 
2) Encuentre la probabilidad de que en los próximos 10 años haya exactamente 3 años en cada uno de los cuales habrá al menos 3 terremotos fuertes.
*/
console.log("10 años 3 años 3 terremotos fuertes")
console.log(imprimirDistribucionPoissonEntre(promedioMensual*12*3,3))
console.log("segunda interpretacion")
console.log(imprimirDistribucionPoissonEntre(promedioMensual*12,3))
console.log("menores que 3")
console.log(imprimirDistribucionPoissonEntre(promedioMensual*12,3,Opciones.menorQue))

/*
Ejercicio 3. Distribución Hipergeométrica.
e. En una fábrica, de 50 máquinas que producen durante un día, 8 son defectuosas, teniendo así un error operacional. Un ingeniero selecciona seis máquinas al azar para examinar si tienen este error o no. ¿Cuál es la probabilidad de que al menos dos de los Las máquinas 
seleccionadas sean defectuosas?
*/
console.log("Ejercicio 3. Distribución Hipergeométrica.")
let x:number = 2;
let N:number= 50// poblacion
let m:number= 6 // muestra
 // exitos en la muestra >=
let K:number=  8;// exitos en la poblacion
let listaN:number[]= [... Array(m+1).keys()].splice(x)
listaN.forEach((x_)=>{

    console.log(probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N).join("\n"))
})
let impriHiper:string[] = [
    `${listaN.map((x_)=>  probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N)[1].split("=")[0]).join("+")}`,
    `${listaN.map((x_)=>  probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N)[1].split("=")[1].replace("newline","")).join("+")}`,
    `${listaN.map((x_)=>  probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N)[2].split("=")[1].replace("newline","")).join("+")}`,
    `${listaN.map((x_)=>  probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N)[3].split("=")[1].replace("newline","")).join("+")}`,
    `${listaN.map((x_)=>  probabilidad.imprimirDistribucionHipergeométrica(x_,m,K,N)[4].split("=")[1].replace("newline","")).join("+")}`,
    `${listaN.map((x_)=>  probabilidad.redondeo(probabilidad.distribucionHipergeométrica(x_,m,K,N))). join("+")}`,
    `${ listaN.map((x_)=>probabilidad.distribucionHipergeométrica(x_,m,K,N)).reduce((a,b)=>a+b)}`
];
console.log("resumen distribucion hiper")
console.log(impriHiper.map((a)=>`P(x >= 2)=${a}`).join("newline \n"))

/**

    e. Un Kiosco pide 200 copias del periódico El Colombiano cada semana.
    Se estima que la cantidad de copias del periódico que se vende
    semanalmente se distribuye normal con parámetros 𝜇 = 180 y 𝜎 = 8.
*/
console.log("distribucion normal")
console.log(probabilidad.imprimirVariableEstandarizadaZ(180,8)(200).join("newline\n "))
/*
    1) Encuentre la probabilidad de que, en una semana dada, el kiosco
    venda exactamente las 200 copias del periódico El Colombiano.
*/
let variableEstandarizadaZ:number = probabilidad.variableEstandarizadaZ(180,8)(200)
console.log(1)
console.log("a")

console.log(probabilidad.imprimirDistribucionNormal([variableEstandarizadaZ,variableEstandarizadaZ],probabilidad.Opciones.entresQue).join("newline\n "))
console.log("b")
console.log(probabilidad.imprimirDistribucionNormal([variableEstandarizadaZ],probabilidad.Opciones.mayorIgualQue).join("newline\n "))

/*
    2) Cual es la probabilidad de que en una semana necesite pedir nuevas
    copias del periódico porque se vendieron todas?

 */

console.log(2)
console.log(probabilidad.imprimirDistribucionNormal([variableEstandarizadaZ,variableEstandarizadaZ],probabilidad.Opciones.menorIgualQue).join("newline\n "))


// primer ejercicio binomial
console.log("primer ejercicio binomial")
console.log("anoto 3 es")

console.log(probabilidad.imprimirdistribucionBinomial(0.85,16,3,probabilidad.Opciones.menorIgualQue).join("newline\n "))
console.log("anoto 5")
console.log(probabilidad.imprimirdistribucionBinomial(0.50,4,1,probabilidad.Opciones.menorIgualQue).join("newline\n "))

console.log("anoto 3")
console.log(probabilidad.imprimirdistribucionBinomial(0.80,10,6,probabilidad.Opciones.menorIgualQue).join("newline\n "))



console.log("otro")

console.log(probabilidad.imprimirdistribucionBinomial(0.85,16,11,probabilidad.Opciones.menorIgualQue).join("newline\n "))


console.log("anoto 3 es")

console.log(probabilidad.imprimirdistribucionBinomial(0.85,16,3,probabilidad.Opciones.menorIgualQue).join("newline\n "))