import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.min.js';

import * as  probabilidad  from "./index.ts";

console.clear()
/*
1. De acuerdo con registros históricos sólo 1 de cada 10 sillas en una universidad no tiene rayones sobre el brazo. En un salón hay 5 sillas y 3 de ellas son examinadas cuidadosamente, tratando de determinar si tienen algún rayón en el brazo.
a. Presente el espacio muestral de este experimento
*/

let cantidadSigllas:string[]= [...Array(5).keys()].map((a)=>`s${a}`);
console.log("cantidadSigllas",`{${cantidadSigllas.join(",")}}`)
let volumenes = new $C.Permutation(cantidadSigllas,3);
let [...V] = volumenes;
let textoPermutaciones:string[] = V.map((a:string[])=>`{${a.join(",")}}`).join(",")
console.log(textoPermutaciones,V.length);
console.log(probabilidad.imprimirPermutaciones2(5,3).join("\n"));
/*
b. Identifique mediante un listado apropiado de sus elementos el evento
B: La primera silla está rayada.
*/
let sillasUno:string[][]= V.filter((a:string[])=>a[0]!=="s1")
console.log(sillasUno.map((a:string[])=>`{${a.join(",")}}`).join(","),sillasUno.length)
/*
c. Escriba por extensión los elementos que componen el evento C:
Exactamente dos sillas están rayadas.

*/
let sillasUnoyDos:string[][]= V.filter((a:string[])=> a[2]=="s1"  )
console.log(sillasUnoyDos.map((a:string[])=>`{${a.join(",")}}`).join(","),sillasUnoyDos.length)

/**
 Tipo de ejercicio 2. Técnicas de conteo.
 */
console.log(2,"Técnicas de conteo")

 /**
  a. Determine el número de formas en que los 10 trabajadores se pueden dividir en los dos grupos de acuerdo con las posiciones disponibles en los dos sitios de trabajo dentro del hospital.
  se tiene un grupo de 6 y otro de 4

  */

let hombres:string[] = [...Array(4).keys()].map((h:number)=>`h${h}`)
let mujeres:string[] = [...Array(6).keys()].map((m:number)=>`m${m}`)
let hombresYMujeres:string[]=hombres.concat(mujeres)
let volumeneshm = new $C.Combination(hombresYMujeres,4);
let [...VHM]=volumeneshm;
let resultadoTota:string[][][] =[]
console.log(VHM)
VHM.forEach((element:string[],index:number) => {
    let sobrandesHYM:string[] = hombresYMujeres .filter((e:string)=> !element.some((v:string)=> v==e))
    let volumeneshm = new $C.Combination(sobrandesHYM,6);
    let [...vlhm] = volumeneshm;
    let dosGrupos:string[][]= vlhm.flatMap((v:string[])=>  [element,v ])
    resultadoTota.push(dosGrupos)
});
// console.log(resultadoTota.map((a:string[],i:number)=>`\n${i+1} {${a.join(",")}}`).join(","),resultadoTota.length)
console.log(resultadoTota.map((r:string[][],i:number)=>`\n${i+1} g1={${r[0]}},g2={${r[1]}}`).join(","),resultadoTota.length)
//selecciono un resultado y busco lo objeto que no se encuentran en ese resultado, despues busco todas las combinaciones, despues esos resultado los fuciono con el primer resultado y los uno al objeto total

console.log(probabilidad.imprimirCombinaciones2(10,6).join("\n"))
console.log(probabilidad.imprimirCombinaciones2(4,4).join("\n"))

/**
 b. Encuentre usando técnicas de conteo la probabilidad del evento de que los 4 hombres queden asignados a UCI si se supone que los trabajadores son asignados en forma aleatoria a los sitios de trabajo en el hospital.
 */

let cantidadDeGruposConSoloHombresEnUci= resultadoTota.filter((grupo:string[][])=> hombres.every((n1)=> grupo[1].some((n2)=> n2 == n1) )  )

console.log("hombres en uci")
console.log(cantidadDeGruposConSoloHombresEnUci,cantidadDeGruposConSoloHombresEnUci.map((r:string[][],i:number)=>`\n${i+1} g1={${r[0]}},g2={${r[1]}}`).join(","))
console.log(probabilidad.imprimirCombinaciones2(6,4).join("\n"))

// conteo de mujeres en grupo UCI grupo formado

conteoEnGrupoEn(resultadoTota,1,"m")
conteoEnGrupoEn(resultadoTota,1,"h")








function conteoEnGrupoEn(resultadoTota:string[][][],indiceGrupo:number,caracterPersona:string){

let conteoGeneroPorGrupo1:number[]= resultadoTota.map((r:string[][])=> r[indiceGrupo].filter((n:string)=>n.includes(caracterPersona)).length)
console.log(caracterPersona,"conteoGeneroPorGrupo1", conteoGeneroPorGrupo1.join("\n"))
let numerosUnicos = new Set<number>()
conteoGeneroPorGrupo1.forEach((c)=>numerosUnicos.add(c))
console.log(numerosUnicos)
let indicesMap:[number,number[]][]= [...numerosUnicos].map(m=>[m,[]])
let conteoNumerosUnicos:Map<number,number[]> = new Map<number,number[]>( indicesMap);
// console.log("conteoNumerosUnicos",conteoNumerosUnicos)
let nuevoConteoGeneroPorGrupo1:number[] = conteoGeneroPorGrupo1
for (let item of numerosUnicos.keys()){
    // console.log(item,"nuevoConteoGeneroPorGrupo1",nuevoConteoGeneroPorGrupo1)
    nuevoConteoGeneroPorGrupo1 = nuevoConteoGeneroPorGrupo1.filter((n:number)=> {
       if(n == item){
           let datosGuardadosIndice=conteoNumerosUnicos.get(item)
        //    console.log("datosGuardadosIndice",datosGuardadosIndice)
            conteoNumerosUnicos.set(item,[n].concat(datosGuardadosIndice==undefined?[]:datosGuardadosIndice))
           return false
       }else{
           return true
       }
    })
}
console.log("conteoNumerosUnicos",Array.from(conteoNumerosUnicos).map((n:[number,number[]])=>[n[0],n[1].length]))

}


/**
 Tipo de ejercicio 3. Teorema de Bayes

3. Una persona tiene 2 destinos por escoger para ir de vacaciones; San Andrés y Cartagena. La probabilidad de que escoja viajar a San Andrés es del 65%. Por otra parte, ella desea ir a bucear, si va a San Andrés la probabilidad de que esté disponible el servicio es del 30%, pero si va a Cartagena la probabilidad de que esté disponible el servicio es del 50%.

a. Cuál es la probabilidad de haber buceado en estas vacaciones.


b. Si buceó, ¿Cuál es la probabilidad de que haya escogido ir a San Andrés de vacaciones?


 */