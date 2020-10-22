import  { Opbs }  from "https://raw.githubusercontent.com/AndresManuelArias/matematica_discreta/master/Operaciones_basica_conjuntos.ts";
//  https://github.com/dankogai/js-combinatorics#readme

let espacio_muestral = []// son todas la posibles respuestas
import * as $C from 'https://cdn.jsdelivr.net/npm/js-combinatorics@1.4.5/combinatorics.min.js';
import {NotacionSigma} from 'https://raw.githubusercontent.com/AndresManuelArias/ejercicios_alg_trigo_geo/master/NotacionSigma/NotacionSigma.ts';
console.log(Opbs.Intersección([3,12,5,13],[14,15,6,3]));

let it =  new $C.Permutation(["I", "II" , "III","V"]);
function imprimirCorchetes(n:number[]):string{
    return `{${n.map((a)=> `(${a})`).join(", ")}}`
  }
let volumenes = new $C.Permutation(["I", "II" , "III"]);
let [...V] = volumenes;
console.log(V);

let [...d] = it;
console.log(imprimirCorchetes(d))
// for (const elem of it) {
//   console.log(elem) // ['a', 'b', 'c', 'd'] ... ['e', 'f', 'g', 'h']
// }
let nuevoFiltro = d.filter((a:any)=>  a.join(",").includes(["I", "II" , "III"].join()))
console.log("filtro",imprimirCorchetes(nuevoFiltro))

let filtro2 = d.filter((a:any)=>  V.some((v:any)=> a.join(",").includes(v.join(",")) ) )
console.log("filtro2",imprimirCorchetes(filtro2))

let dados = new $C. BaseN([1,2,3,4,5,6],2);
let [...D] = dados;
 console.log(D);
let sumasD = D.map((a:any)=> a.reduce((a:any,b:any)=>a+b))
 console.log(sumasD);

let notacionSigma = new NotacionSigma();
console.log("productoria",notacionSigma.productoria(0,9)((n:number)=>(100-n)/(300-n)))

// imprimir
let pri = (funcion:(a:number) => string):string=> [...Array(10).keys()].map((n:number)=>funcion(n)).join("*")
// [...  Array(6).keys()].splice(1).reduce((a,b)=>a*b)
// let p1:string = [...Array(10).keys()].map((n:number)=>`({100-${n}} over{300-${n}})`).join("*")
let prim= (funcion:(n:number) => string):string=>`prod from{0} to{9} ({100-n} over{300-n})=${[...Array(10).keys()].map((n:number)=>funcion(n)).join("*")} newline`
console.log(1,prim((n)=>`({100-${n}} over{300-${n}})`))
console.log(2,prim((n)=>`({${100-n}} over{${300-n}})`))
console.log(3,prim((n)=>`(${((100-n) /(300-n)).toFixed(3)})`))
console.log(4, eval(prim((n)=>`(${((100-n) /(300-n)).toFixed(3)})`).split("=")[1].replace(" newline","")))
console.log(5,(0.333)*(0.331)*(0.329)*(0.327)*(0.324)*(0.322)*(0.320)*(0.317)*(0.315)*(0.313))
// console.log(prim)

//  
//P(x,m,k,N)= { left lline matrix{ K##x}right rline left lline matrix{ N#-K##m#-x}right rline } over{left lline matrix{ N##m}right rline} newline
let distribucionHipergeométrica:any[] = [
  (x:number,m:number,K:number,N:number):string=>`K=${x}newline  m=${m} newline  N=${K} newline  x=${N} newline`,
  (x:number,m:number,K:number,N:number):string=>`P(${x},${m},${K},${N})= { left lline matrix{ ${K}##${x}}right rline left lline matrix{ ${N}#-${K}##${m}#-${x}}right rline } over{left lline matrix{ ${N}##${m}}right rline} newline`,
  (x:number,m:number,K:number,N:number):string=>`P(${x},${m},${K},${N})= { left lline matrix{ ${K}##${x}}right rline left lline matrix{ ${N-K}##${m-x}}right rline } over{left lline matrix{ ${N}##${m}}right rline} newline`,
  (x:number,m:number,K:number,N:number):string=>`P(${x},${m},${K},${N})= { left lline matrix{ ${$C.combination(K,x)}}right rline left lline matrix{ ${$C.combination(N-K,m-x)}}right rline } over{left lline matrix{ ${$C.combination(N,m)}}right rline} newline`,
  (x:number,m:number,K:number,N:number):string=>`P(${x},${m},${K},${N})= { ${Number($C.combination(K,x))*Number($C.combination(N-K,m-x))} } over{ ${Number($C.combination(N,m))}} newline`,
  (x:number,m:number,K:number,N:number):string=>`P(${x},${m},${K},${N})= ${Number($C.combination(K,x))*Number($C.combination(N-K,m-x))/Number($C.combination(N,m))} newline`
]
for (let index = 0; index < distribucionHipergeométrica.length; index++) {
  console.log(distribucionHipergeométrica[index](10,100,90,300))  
}
for (let index = 0; index < distribucionHipergeométrica.length; index++) {
  console.log(distribucionHipergeométrica[index](1,10,9,30))  
}
// ejerccio 3

function multiplicarRama(p:any,lista:string[]):number {
  // debugger;
  let result:number=1;
  if(lista.length>1){
    result= multiplicarRama(p.get(lista[0])[1],lista.slice(1)) 
  }
  return p.get(lista[0])[0]*result
}
function multiplicarRamaImprimir(p:any,lista:string[]):string {
  // debugger;
  let result:string="";
  if(lista.length>1){
    result= " cdot "+multiplicarRamaImprimir(p.get(lista[0])[1],lista.slice(1)) 
  }
  return `${p.get(lista[0])[0]} ${result}` 
}
let probabilidades = new Map();
probabilidades.set("A",[ 0.125,new Map([["mal",[0.04]],["bien",[0.96]]])])
probabilidades.set("B",[ 0.125,new Map([["mal",[0.06]],["bien",[0.94]]])])
probabilidades.set("C",[ 0.75,new Map([["mal",[0.02]],["bien",[0.98]]])])

probabilidades.get("A")[0]*probabilidades.get("A")[1].get("mal")/(probabilidades.get("A")[0]*probabilidades.get("A")[1].get("mal")+probabilidades.get("B")[0]*probabilidades.get("B")[1].get("mal")+probabilidades.get("C")[0]*probabilidades.get("C")[1].get("mal"))

multiplicarRama(probabilidades,["A","mal"])/['A','B','C'].map((a)=>
multiplicarRama(probabilidades,[a,"mal"])
).reduce((a,b)=>a+b)

multiplicarRama(probabilidades,["C","mal"])/['A','B','C'].map((a)=>
multiplicarRama(probabilidades,[a,"mal"])
).reduce((a,b)=>a+b)
// console.log( $C.combination(8,3))
// EJERCICIO 4
let aeropuertos = new Map();
aeropuertos.set("A",[ 0.40,new Map([["d",[0.01]],["d'",[0.99]]])])
aeropuertos.set("B",[ 0.35,new Map([["d",[0.005]],["d'",[0.995]]])])
aeropuertos.set("C",[ 0.25,new Map([["d",[0.06]],["d'",[0.94]]])])

function teoremaBayes(diagramaArbol:any,lista:string[],i:number):string {
  return [
    (diagramaArbol:any,lista:string[]):string=>`P( ${lista[0]} divides ${lista[1]}  )={ P(${lista[0]})  cdot  P(${lista[1]} divides ${lista[0]}) }over{P(${lista[1]})  } newline`,
    (diagramaArbol:any,lista:string[]):string=>`P( ${lista[0]} divides ${lista[1]}  )={ ${multiplicarRamaImprimir(diagramaArbol,lista)}  }over{ ${[...diagramaArbol.keys() ].map((a)=> multiplicarRamaImprimir(diagramaArbol,[a,lista[1]])).reduce((a,b)=>a+" + "+b)}  } newline`,
    (diagramaArbol:any,lista:string[]):string=>`P( ${lista[0]} divides ${lista[1]}  )={ ${multiplicarRama(diagramaArbol,lista).toFixed(6)}  }over{ ${[...diagramaArbol.keys() ].map((a)=> `${multiplicarRama(diagramaArbol,[a,lista[1]]).toFixed(6)}` ).reduce((a,b)=>a+" + "+b)}  } newline`,
    (diagramaArbol:any,lista:string[]):string=>`P( ${lista[0]} divides ${lista[1]}  )={ ${multiplicarRama(diagramaArbol,lista).toFixed(6)}  }over{ ${ ([...diagramaArbol.keys() ].map((a)=> multiplicarRama(diagramaArbol,[a,lista[1]])).reduce((a,b)=>a + b)).toFixed(6)}  } newline`,
    (diagramaArbol:any,lista:string[]):string=>`P( ${lista[0]} divides ${lista[1]}  )={ ${ (multiplicarRama(diagramaArbol,lista)/ ([...diagramaArbol.keys() ].map((a)=> multiplicarRama(diagramaArbol,[a,lista[1]])).reduce((a,b)=>a + b))).toFixed(6)}  } newline`,

  ][i](diagramaArbol,lista)
}
console.log(4,"cuarto")
// console.log(4,"B")
for (let index = 0; index < 5; index++) {
  console.log(teoremaBayes(aeropuertos,["B","d"],index))
}
// console.log(4,"A")

for (let index = 0; index < 5; index++) {
  console.log(teoremaBayes(aeropuertos,["A","d"],index))
}
for (let index = 0; index < 5; index++) {
  console.log(teoremaBayes(aeropuertos,["C","d"],index))
}