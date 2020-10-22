import  { Opbs }  from "https://raw.githubusercontent.com/AndresManuelArias/matematica_discreta/master/Operaciones_basica_conjuntos.ts";
//  https://github.com/dankogai/js-combinatorics#readme

let espacio_muestral = []// son todas la posibles respuestas
import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.min.js';
import {NotacionSigma} from 'https://raw.githubusercontent.com/AndresManuelArias/ejercicios_alg_trigo_geo/master/NotacionSigma/NotacionSigma.ts';
export function permutaciones(conteo:number,f:number){
    return  [...  Array(conteo+1).keys()].splice(1).sort((a,b)=>b-a).splice(0,f).reduce((a,b)=>a*b)
}
export function combination(c:number,f:number){
    return  permutaciones(c,f)*(1/permutaciones(f,f))
} 
export function numeroDivi(numeros:number,listaNumeros:number[]) {
    return    [...  Array(numeros+1).keys()].splice(1).filter(a=> listaNumeros.some((b)=>a%b==0)).length
}
export function imprimirPermutaciones(n:number,r:number,index:number=0):string{
    return [
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= {n!} over {(n-r)!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}={n} {${[...Array(n+1).keys()].splice(1)} n!} over {(n-r)!}  newline`,
    ][index](n,r)
}
export function imprimirFactorial(n:number){
    return`${[...  Array(n+1).keys()].splice(1).sort((a,b)=>b-a).join(" cdot ")}`
}
export function imprimirCombinaciones(n:number,r:number,index:number=0):string{
    return [
        (n:number,r:number):string=>`{}_{n}C_{r}= {n!} over { r! cdot(n-r)!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= {${imprimirFactorial(n)}} over { ${imprimirFactorial(r)}  cdot(${n}-${r})!}  newline`,
    ][index](n,r)
}