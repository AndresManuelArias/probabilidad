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

export function factorial(n:number):bigint{

    return n==0?1n: [...  Array(n+1).keys()].splice(1).map(a=>BigInt(a)).reduce((a,b)=>a*b)
}
export function distribucionPoisson(m:number):(x:number)=>number{
    return (n:number)=>{
        return  (Math.pow(m,n ))*(Math.pow(Math.E,-m))/Number(factorial(n))
    }
}
export function distribucionPoissonEntre(m:number,x:number,desde:number=0,fueraDE:boolean=false):number{
    
    let entre:number[] = [...  Array(x+1).keys()].splice(desde)
    let sumaProbabilidades:number = entre.map(distribucionPoisson(m)).reduce((a,b)=>a+b)
    if(fueraDE){
       return 1-sumaProbabilidades
    }else{
        return sumaProbabilidades
    }
  
}
export function imprimirDistribucionPoisson(m:number,x:number,index:number=0):string{
    return [
        (m:number,x:number):string=>`P( X/ lambdabar  )={lambdabar^{X}e^{ -lambdabar }}over{ X! } newline`,
        (m:number,x:number):string=>`P( ${x}/ ${m}  )={${m}^{${x}} cdot ${Math.E}^{ -${m}} }over{ ${x}! } newline`,
        (m:number,x:number):string=>`P( ${x}/ ${m}  )={${m}^{${x}} cdot ${Math.E}^{ -${m}} }over{ ${ imprimirFactorial(x)} } newline`,
        (m:number,x:number):string=>`P( ${x}/ ${m}  )={${Math.pow(m,x )} cdot ${Math.pow(Math.E,-m)} }over{ ${ factorial(x)}} newline`,
        (m:number,x:number):string=>`P( ${x}/ ${m}  )={${Math.pow(m,x )*Math.pow(Math.E,-m)} }over{ ${ factorial(x)} } newline`,
        (m:number,x:number):string=>`P( ${x}/ ${m}  )=${distribucionPoisson(m)(x)}  newline`,
    ][index](m,x)
}
export function imprimirFactorial(n:number){
    return`${[...  Array(n+1).keys()].splice(1).sort((a,b)=>b-a).join(" cdot ")}`
}
export function imprimirCombinaciones(n:number,r:number,index:number=0):string{
    return [
        (n:number,r:number):string=>`{}_{n}C_{r}= {n!} over { r! cdot(n-r)!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= {${imprimirFactorial(n)}} over { ${imprimirFactorial(r)}  cdot(${n}-${r})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= {${factorial(n)}} over { ${factorial(r)}  cdot(${n-r})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= {${factorial(n)}} over { ${factorial(r)}  cdot(${factorial(n-r)})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= {${factorial(n)}} over { ${factorial(r) * factorial(n-r)}}  newline`,
        (n:number,r:number):string=>`{}_{${n}}C_{${r}}= ${factorial(n)/(factorial(r) * factorial(n-r))}  newline`,
    ][index](n,r)
}

export function imprimirPermutaciones(n:number,r:number,index:number=0):string{
    return [
        (n:number,r:number):string=>`{}_{n}P_{r}= {n!} over {(n-r)!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= {${imprimirFactorial(n)}} over { (${n}-${r})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= {${factorial(n)}} over { (${n-r})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= {${factorial(n)}} over { (${factorial(n-r)})!}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= {${factorial(n)}} over { ${factorial(n-r)}}  newline`,
        (n:number,r:number):string=>`{}_{${n}}P_{${r}}= ${factorial(n)/( factorial(n-r))}  newline`,
    ][index](n,r)
}

export function redondeo(n:number,decimales:number=10000){
    return Math.round( n*decimales) / decimales
}
export function distribucionHipergeométrica(x:number,m:number,K:number,N:number):number{
    return Number($C.combination(K,x))*Number($C.combination(N-K,m-x))/Number($C.combination(N,m))
}

export function imprimirDistribucionHipergeométrica(x:number,m:number,K:number,N:number):string[]{
    // https://www.youtube.com/watch?v=c3Vn9q7XH9A&t=30s
    return  [
        `K=${x}newline  m=${m} newline  N=${K} newline  x=${N} newline`,
        `P(${x},${m},${K},${N})= { left lline matrix{ ${K}##${x}}right rline left lline matrix{ ${N}#-${K}##${m}#-${x}}right rline } over{left lline matrix{ ${N}##${m}}right rline} newline`,
        `P(${x},${m},${K},${N})= { left lline matrix{ ${K}##${x}}right rline left lline matrix{ ${N-K}##${m-x}}right rline } over{left lline matrix{ ${N}##${m}}right rline} newline`,
        `P(${x},${m},${K},${N})= { left lline matrix{ ${$C.combination(K,x)}}right rline left lline matrix{ ${$C.combination(N-K,m-x)}}right rline } over{left lline matrix{ ${$C.combination(N,m)}}right rline} newline`,
        `P(${x},${m},${K},${N})= { ${Number($C.combination(K,x))*Number($C.combination(N-K,m-x))} } over{ ${Number($C.combination(N,m))}} newline`,
        `P(${x},${m},${K},${N})= color green {${Number($C.combination(K,x))*Number($C.combination(N-K,m-x))/Number($C.combination(N,m))}} newline`
    ]
    
} 

export function conteoReglaEmpirica(m:number,d:number):(x:number)=>number{
    return (n:number)=>{
        return Math.round( (n-m)/d);
    }
}
export function variableEstandarizadaZ(m:number,d:number):(x:number)=>number{
    return (n:number)=>{
        return  redondeo((n-m)/d,10000);
    }
}
export enum Opciones {
    mayorIgualQue,
    menorIgualQue,
    menorQue,
    diferenteQue,
    entresQue,
    mayorQue,
    igualQue
}

export function encontrarPorcentajeAreaBajoLaCurva(Z:number[],opciones?:Opciones):number{
    let numerosTextoTabla:number[][]=[
        [0,0,0.01,0.02,0.03,0.04,0.05,0.06,0.07,0.08,0.09],
        [0,0,0.004,0.008,0.012,0.016,0.0199,0.0239,0.0279,0.0319,0.0359],
        [0.1,0.0398,0.0438,0.0478,0.0517,0.0557,0.0596,0.0636,0.0675,0.0714,0.0753],
        [0.2,0.0793,0.0832,0.0871,0.091,0.0948,0.0987,0.1026,0.1064,0.1103,0.1141],
        [0.3,0.1179,0.1217,0.1255,0.1293,0.1331,0.1368,0.1406,0.1443,0.148,0.1517],
        [0.4,0.1554,0.1591,0.1628,0.1664,0.17,0.1736,0.1772,0.1808,0.1844,0.1879],
        [0.5,0.1915,0.195,0.1985,0.2019,0.2054,0.2088,0.2123,0.2157,0.219,0.2224],
        [0.6,0.2257,0.2291,0.2324,0.2357,0.2389,0.2422,0.2454,0.2486,0.2517,0.2549],
        [0.7,0.258,0.2611,0.2642,0.2673,0.2704,0.2734,0.2764,0.2794,0.2823,0.2852],
        [0.8,0.2881,0.291,0.2939,0.2967,0.2995,0.3023,0.3051,0.3078,0.3106,0.3133],
        [0.9,0.3159,0.3186,0.3212,0.3238,0.3264,0.3289,0.3315,0.334,0.3365,0.3389],
        [1,0.3413,0.3438,0.3461,0.3485,0.3508,0.3531,0.3554,0.3577,0.3599,0.3621],
        [1.1,0.3643,0.3665,0.3686,0.3708,0.3729,0.3749,0.377,0.379,0.381,0.383],
        [1.2,0.3849,0.3869,0.3888,0.3907,0.3925,0.3944,0.3962,0.398,0.3997,0.4015],
        [1.3,0.4032,0.4049,0.4066,0.4082,0.4099,0.4115,0.4131,0.4147,0.4162,0.4177],
        [1.4,0.4192,0.4207,0.4222,0.4236,0.4251,0.4265,0.4279,0.4292,0.4306,0.4319],
        [1.5,0.4332,0.4345,0.4357,0.437,0.4382,0.4394,0.4406,0.4418,0.4429,0.4441],
        [1.6,0.4452,0.4463,0.4474,0.4484,0.4495,0.4505,0.4515,0.4525,0.4535,0.4545],
        [1.7,0.4554,0.4564,0.4573,0.4582,0.4591,0.4599,0.4608,0.4616,0.4625,0.4633],
        [1.8,0.4641,0.4649,0.4656,0.4664,0.4671,0.4678,0.4686,0.4693,0.4699,0.4706],
        [1.9,0.4713,0.4719,0.4726,0.4732,0.4738,0.4744,0.475,0.4756,0.4761,0.4767],
        [2,0.4772,0.4778,0.4783,0.4788,0.4793,0.4798,0.4803,0.4808,0.4812,0.4817],
        [2.1,0.4821,0.4826,0.483,0.4834,0.4838,0.4842,0.4846,0.485,0.4854,0.4857],
        [2.2,0.4861,0.4864,0.4868,0.4871,0.4875,0.4878,0.4881,0.4884,0.4887,0.489],
        [2.3,0.4893,0.4896,0.4898,0.4901,0.4904,0.4906,0.4909,0.4911,0.4913,0.4916],
        [2.4,0.4918,0.492,0.4922,0.4925,0.4927,0.4929,0.4931,0.4932,0.4934,0.4936],
        [2.5,0.4938,0.494,0.4941,0.4943,0.4945,0.4946,0.4948,0.4949,0.4951,0.4952],
        [2.6,0.4953,0.4955,0.4956,0.4957,0.4959,0.496,0.4961,0.4962,0.4963,0.4964],
        [2.7,0.4965,0.4966,0.4967,0.4968,0.4969,0.497,0.4971,0.4972,0.4973,0.4974],
        [2.8,0.4974,0.4975,0.4976,0.4977,0.4977,0.4978,0.4979,0.4979,0.498,0.4981],
        [2.9,0.4981,0.4982,0.4982,0.4983,0.4984,0.4984,0.4985,0.4985,0.4986,0.4986],
        [3,0.4987,0.4987,0.4987,0.4988,0.4988,0.4989,0.4989,0.4989,0.499,0.499],
        [3.1,0.499,0.4991,0.4991,0.4991,0.4992,0.4992,0.4992,0.4992,0.4993,0.4993],
        [3.2,0.4993,0.4993,0.4994,0.4994,0.4994,0.4994,0.4994,0.4995,0.4995,0.4995],
        [3.3,0.4995,0.4995,0.4995,0.4996,0.4996,0.4996,0.4996,0.4996,0.4996,0.4997],
        [3.4,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4997,0.4998],
        [3.5,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998,0.4998],
        [3.6,0.4998,0.4998,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
        [3.7,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
        [3.8,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999,0.4999],
        [3.9,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5],
        [4,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]
    ]

    let resultado:number=0;
    let bus=busquedaAreaBajoLaCurvaNormalEstandarizada(numerosTextoTabla)
    let newZ:number[]=Z.map((z)=> bus(Math.abs(z))*(z<0?-1:1)).sort()
    console.log(Z)    
    console.log(newZ)
    switch (opciones) {
        case Opciones.igualQue:

        break;
        case Opciones.entresQue:
            resultado =newZ.reduceRight((a,b)=>a-b)
        break;
        case Opciones.mayorQue:
            resultado =redondeo(newZ[0]>=0?0.50- newZ[0]:1-(0.50+ newZ[0]),10000)
        break;
        case Opciones.menorIgualQue:
            resultado =redondeo(newZ[0]<=0?0.50+ newZ[0]:1-(0.50- newZ[0]),10000)
        break;
        case Opciones.mayorIgualQue:
            resultado =redondeo(newZ[0]>=0?0.50- newZ[0]:1-(0.50+ newZ[0]),10000)
        break;
        case Opciones.menorQue:
            resultado =redondeo(newZ[0]<=0?0.50+ newZ[0]:1-(0.50- newZ[0]),10000)
        break;
        default:
        break;
    }
    return resultado

}
export function encontrarPorcentajeIndiceReglaEmpirica(indices:number[],opciones?:Opciones):number[] {
    let listado:number[] = [0,0.15,2.35,13.5,34,34,13.5,2.35,0.15]
    let resultado:number[]=[]
    let comienzo:number = 4
    let nuevoIndices:number[]=indices.sort().map((i)=>i<0?i+1:i)
    switch (opciones) {
        case Opciones.igualQue:
            resultado = indices.map(a=> listado[comienzo+a])
        break;
        case Opciones.entresQue:
            resultado =listado.splice(comienzo+nuevoIndices[0],(comienzo+nuevoIndices[1]+1-(comienzo+nuevoIndices[0])))//[comienzo+nuevoIndices[0],(comienzo+nuevoIndices[1]-(comienzo+nuevoIndices[0]))]
        break;
        case Opciones.mayorQue:
            resultado = listado.splice(nuevoIndices[0]>0?comienzo+nuevoIndices[0]+1:comienzo+nuevoIndices[0])
        break;
        case Opciones.menorIgualQue:
            resultado = listado.splice(0,comienzo+nuevoIndices[0]+1)
        break;
        case Opciones.mayorIgualQue:
            resultado = listado.splice(comienzo+nuevoIndices[0])
        break;
        case Opciones.menorQue:
            resultado = listado.splice(0,comienzo+nuevoIndices[0])
        break;
        default:
            resultado = listado
        break;
    }
    return resultado
}
export function porcentajesReglaEmpirica(m:number,d:number):(n:number[],o:Opciones)=>number{
    let _conteoReglaEmpirica = conteoReglaEmpirica(m,d);
    return (numeros:number[],opciones:Opciones) =>{
        let porcentajes:number[] = encontrarPorcentajeIndiceReglaEmpirica(numeros.map(_conteoReglaEmpirica),opciones)
        let resultado:number=porcentajes.reduce((a,b)=>a+b);
        return resultado;
    }

}
export function reglaEmpirica(m:number,d:number):number{
    return 1
}

function tablaAreasBajoLaCurvaNormalEstandarizada(tabla:number[][]): Map<number,number[]> {
    let listado = new Map( tabla.map((d)=>[d.splice(0,1)[0],d]))
    return listado
}
export function busquedaAreaBajoLaCurvaNormalEstandarizada(tabla:number[][]):(n:number)=>number{
    let tablaMap:Map<number,number[]>  = tablaAreasBajoLaCurvaNormalEstandarizada(tabla)
    return (num:number)=>{
        let tabla= tablaMap.get(Number(num.toFixed(2).slice(0,3)))
        let nueva = tabla?.concat([])[Number(num.toFixed(2).slice(3))]
        return Number(nueva);
    }
}
export async function tablaPromesa():Promise<number[][]>{
    const decoder = new TextDecoder('utf-8');
    let texto = await decoder.decode(await Deno.readFile("Tabla_de_áreas_bajo_la_curva_normal_estandarizada.csv"));
    return convertirTextoToTabla(texto)
}
export function convertirTextoToTabla(texto:string):number[][]{
    let arrayTexto:number[][]= texto.split("\n").map((n)=>n.split("\t").map(Number))
    return arrayTexto;
}

export let textoTabla:string=
`z	0	0.01	0.02	0.03	0.04	0.05	0.06	0.07	0.08	0.09
0.0	0.0000	0.0040	0.0080	0.0120	0.0160	0.0199	0.0239	0.0279	0.0319	0.0359
0.1	0.0398	0.0438	0.0478	0.0517	0.0557	0.0596	0.0636	0.0675	0.0714	0.0753
0.2	0.0793	0.0832	0.0871	0.0910	0.0948	0.0987	0.1026	0.1064	0.1103	0.1141
0.3	0.1179	0.1217	0.1255	0.1293	0.1331	0.1368	0.1406	0.1443	0.1480	0.1517
0.4	0.1554	0.1591	0.1628	0.1664	0.1700	0.1736	0.1772	0.1808	0.1844	0.1879
0.5	0.1915	0.1950	0.1985	0.2019	0.2054	0.2088	0.2123	0.2157	0.2190	0.2224
0.6	0.2257	0.2291	0.2324	0.2357	0.2389	0.2422	0.2454	0.2486	0.2517	0.2549
0.7	0.2580	0.2611	0.2642	0.2673	0.2704	0.2734	0.2764	0.2794	0.2823	0.2852
0.8	0.2881	0.2910	0.2939	0.2967	0.2995	0.3023	0.3051	0.3078	0.3106	0.3133
0.9	0.3159	0.3186	0.3212	0.3238	0.3264	0.3289	0.3315	0.3340	0.3365	0.3389
1.0	0.3413	0.3438	0.3461	0.3485	0.3508	0.3531	0.3554	0.3577	0.3599	0.3621
1.1	0.3643	0.3665	0.3686	0.3708	0.3729	0.3749	0.3770	0.3790	0.3810	0.3830
1.2	0.3849	0.3869	0.3888	0.3907	0.3925	0.3944	0.3962	0.3980	0.3997	0.4015
1.3	0.4032	0.4049	0.4066	0.4082	0.4099	0.4115	0.4131	0.4147	0.4162	0.4177
1.4	0.4192	0.4207	0.4222	0.4236	0.4251	0.4265	0.4279	0.4292	0.4306	0.4319
1.5	0.4332	0.4345	0.4357	0.4370	0.4382	0.4394	0.4406	0.4418	0.4429	0.4441
1.6	0.4452	0.4463	0.4474	0.4484	0.4495	0.4505	0.4515	0.4525	0.4535	0.4545
1.7	0.4554	0.4564	0.4573	0.4582	0.4591	0.4599	0.4608	0.4616	0.4625	0.4633
1.8	0.4641	0.4649	0.4656	0.4664	0.4671	0.4678	0.4686	0.4693	0.4699	0.4706
1.9	0.4713	0.4719	0.4726	0.4732	0.4738	0.4744	0.4750	0.4756	0.4761	0.4767
2.0	0.4772	0.4778	0.4783	0.4788	0.4793	0.4798	0.4803	0.4808	0.4812	0.4817
2.1	0.4821	0.4826	0.4830	0.4834	0.4838	0.4842	0.4846	0.4850	0.4854	0.4857
2.2	0.4861	0.4864	0.4868	0.4871	0.4875	0.4878	0.4881	0.4884	0.4887	0.4890
2.3	0.4893	0.4896	0.4898	0.4901	0.4904	0.4906	0.4909	0.4911	0.4913	0.4916
2.4	0.4918	0.4920	0.4922	0.4925	0.4927	0.4929	0.4931	0.4932	0.4934	0.4936
2.5	0.4938	0.4940	0.4941	0.4943	0.4945	0.4946	0.4948	0.4949	0.4951	0.4952
2.6	0.4953	0.4955	0.4956	0.4957	0.4959	0.4960	0.4961	0.4962	0.4963	0.4964
2.7	0.4965	0.4966	0.4967	0.4968	0.4969	0.4970	0.4971	0.4972	0.4973	0.4974
2.8	0.4974	0.4975	0.4976	0.4977	0.4977	0.4978	0.4979	0.4979	0.4980	0.4981
2.9	0.4981	0.4982	0.4982	0.4983	0.4984	0.4984	0.4985	0.4985	0.4986	0.4986
3.0	0.4987	0.4987	0.4987	0.4988	0.4988	0.4989	0.4989	0.4989	0.4990	0.4990
3.1	0.4990	0.4991	0.4991	0.4991	0.4992	0.4992	0.4992	0.4992	0.4993	0.4993
3.2	0.4993	0.4993	0.4994	0.4994	0.4994	0.4994	0.4994	0.4995	0.4995	0.4995
3.3	0.4995	0.4995	0.4995	0.4996	0.4996	0.4996	0.4996	0.4996	0.4996	0.4997
3.4	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4998
3.5	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998
3.6	0.4998	0.4998	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.7	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.8	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.9	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000
4.0	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000`

/**
 * 
 *https://matemovil.com/tabla-de-distribucion-normal-estandarizada-tabla-z/
 z	0	0.01	0.02	0.03	0.04	0.05	0.06	0.07	0.08	0.09
0.0	0.0000	0.0040	0.0080	0.0120	0.0160	0.0199	0.0239	0.0279	0.0319	0.0359
0.1	0.0398	0.0438	0.0478	0.0517	0.0557	0.0596	0.0636	0.0675	0.0714	0.0753
0.2	0.0793	0.0832	0.0871	0.0910	0.0948	0.0987	0.1026	0.1064	0.1103	0.1141
0.3	0.1179	0.1217	0.1255	0.1293	0.1331	0.1368	0.1406	0.1443	0.1480	0.1517
0.4	0.1554	0.1591	0.1628	0.1664	0.1700	0.1736	0.1772	0.1808	0.1844	0.1879
0.5	0.1915	0.1950	0.1985	0.2019	0.2054	0.2088	0.2123	0.2157	0.2190	0.2224
0.6	0.2257	0.2291	0.2324	0.2357	0.2389	0.2422	0.2454	0.2486	0.2517	0.2549
0.7	0.2580	0.2611	0.2642	0.2673	0.2704	0.2734	0.2764	0.2794	0.2823	0.2852
0.8	0.2881	0.2910	0.2939	0.2967	0.2995	0.3023	0.3051	0.3078	0.3106	0.3133
0.9	0.3159	0.3186	0.3212	0.3238	0.3264	0.3289	0.3315	0.3340	0.3365	0.3389
1.0	0.3413	0.3438	0.3461	0.3485	0.3508	0.3531	0.3554	0.3577	0.3599	0.3621
1.1	0.3643	0.3665	0.3686	0.3708	0.3729	0.3749	0.3770	0.3790	0.3810	0.3830
1.2	0.3849	0.3869	0.3888	0.3907	0.3925	0.3944	0.3962	0.3980	0.3997	0.4015
1.3	0.4032	0.4049	0.4066	0.4082	0.4099	0.4115	0.4131	0.4147	0.4162	0.4177
1.4	0.4192	0.4207	0.4222	0.4236	0.4251	0.4265	0.4279	0.4292	0.4306	0.4319
1.5	0.4332	0.4345	0.4357	0.4370	0.4382	0.4394	0.4406	0.4418	0.4429	0.4441
1.6	0.4452	0.4463	0.4474	0.4484	0.4495	0.4505	0.4515	0.4525	0.4535	0.4545
1.7	0.4554	0.4564	0.4573	0.4582	0.4591	0.4599	0.4608	0.4616	0.4625	0.4633
1.8	0.4641	0.4649	0.4656	0.4664	0.4671	0.4678	0.4686	0.4693	0.4699	0.4706
1.9	0.4713	0.4719	0.4726	0.4732	0.4738	0.4744	0.4750	0.4756	0.4761	0.4767
2.0	0.4772	0.4778	0.4783	0.4788	0.4793	0.4798	0.4803	0.4808	0.4812	0.4817
2.1	0.4821	0.4826	0.4830	0.4834	0.4838	0.4842	0.4846	0.4850	0.4854	0.4857
2.2	0.4861	0.4864	0.4868	0.4871	0.4875	0.4878	0.4881	0.4884	0.4887	0.4890
2.3	0.4893	0.4896	0.4898	0.4901	0.4904	0.4906	0.4909	0.4911	0.4913	0.4916
2.4	0.4918	0.4920	0.4922	0.4925	0.4927	0.4929	0.4931	0.4932	0.4934	0.4936
2.5	0.4938	0.4940	0.4941	0.4943	0.4945	0.4946	0.4948	0.4949	0.4951	0.4952
2.6	0.4953	0.4955	0.4956	0.4957	0.4959	0.4960	0.4961	0.4962	0.4963	0.4964
2.7	0.4965	0.4966	0.4967	0.4968	0.4969	0.4970	0.4971	0.4972	0.4973	0.4974
2.8	0.4974	0.4975	0.4976	0.4977	0.4977	0.4978	0.4979	0.4979	0.4980	0.4981
2.9	0.4981	0.4982	0.4982	0.4983	0.4984	0.4984	0.4985	0.4985	0.4986	0.4986
3.0	0.4987	0.4987	0.4987	0.4988	0.4988	0.4989	0.4989	0.4989	0.4990	0.4990
3.1	0.4990	0.4991	0.4991	0.4991	0.4992	0.4992	0.4992	0.4992	0.4993	0.4993
3.2	0.4993	0.4993	0.4994	0.4994	0.4994	0.4994	0.4994	0.4995	0.4995	0.4995
3.3	0.4995	0.4995	0.4995	0.4996	0.4996	0.4996	0.4996	0.4996	0.4996	0.4997
3.4	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4997	0.4998
3.5	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998	0.4998
3.6	0.4998	0.4998	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.7	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.8	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999	0.4999
3.9	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000
4.0	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000	0.5000
 */
