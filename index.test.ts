import {
    assertEquals,
    assertArrayContains,
  } from "https://deno.land/std/testing/asserts.ts";
import * as  probabilidad  from "./index.ts";
let prueba:number[][] = [
    [10, 0 , 0.00004],
    [10, 2 , 0.0023],
    [10, 1 , 0.0005],
    [10, 3 , 0.0076],
    [2, 0 , 0.1353],
    [2, 3 , 0.1804],
    [2, 4 , 0.0902],
    [2, 5 , 0.0361],
]
function redondeo(n:number,decimales:number){
    return Math.round( n*decimales) / decimales
}
let decimales:number = 10000

prueba.forEach((dato,index)=>{
    Deno.test("distribucionPoisson "+index, () => {
        let operacion:number= redondeo(  probabilidad.distribucionPoisson(dato[0])(dato[1]),decimales)  
        let resultado:number=redondeo( dato[2],decimales) 
        assertEquals( operacion,resultado);
    });
})
interface entreDe{
    desde:number
    hasta:number
    media:number
    fueraDE:boolean
    resultado:number
}
let pruebaEntre:entreDe[]=[
    {desde:3,hasta:5,media:2,fueraDE:false,resultado:0.3068},
    {desde:0,hasta:3,media:10,fueraDE:false,resultado:0.0103},
    {desde:0,hasta:3,media:10,fueraDE:true,resultado:0.9897},
    {desde:0,hasta:2,media:4,fueraDE:false,resultado:0.2381},
    {desde:0,hasta:3,media:4,fueraDE:true,resultado:0.5665},
    {desde:0,hasta:2,media:0.625,fueraDE:true,resultado:0.025656930899025657},
]
pruebaEntre.forEach((dato,index)=>{
    Deno.test("distribucionPoissonEntre "+index, () => {
        assertEquals(redondeo(probabilidad.distribucionPoissonEntre(dato.media,dato.hasta,dato.desde,dato.fueraDE),decimales),redondeo(dato.resultado,decimales));
    });
})

interface parafactorial {
    i:number,s:bigint
}
let prueba2:parafactorial[] = [
    {i:0, s:1n},
    {i:1, s:1n},
    {i:2, s:2n},
    {i:3, s:6n},
    {i:4, s:24n},
    {i:5, s:120n},
    {i:6, s:720n},
    {i:7, s:5040n},
    {i:8, s:40320n},
    {i:9, s:362880n},
    {i:10, s:3628800n},
    {i:11, s:39916800n},
    {i:12, s:479001600n},
    {i:13, s:6227020800n},
    {i:14, s:87178291200n},
    {i:15, s:1307674368000n},
    {i:16, s:20922789888000n},
    {i:17, s:355687428096000n},
    {i:18, s:6402373705728000n},
    {i:19, s:121645100408832000n},
    {i:20, s:2432902008176640000n},
    {i:21, s:51090942171709440000n},
    {i:22, s:1124000727777607680000n},
    {i:23, s:25852016738884976640000n},
    {i:24, s:620448401733239439360000n},
    {i:25, s:15511210043330985984000000n},
    {i:26, s:403291461126605635584000000n},
    {i:27, s:10888869450418352160768000000n},
    {i:28, s:304888344611713860501504000000n},
    {i:29, s:8841761993739701954543616000000n},
    {i:30, s:265252859812191058636308480000000n},
    {i:31, s:8222838654177922817725562880000000n},
    {i:32, s:263130836933693530167218012160000000n},
    {i:33, s:8683317618811886495518194401280000000n},
    {i:34, s:295232799039604140847618609643520000000n},
    {i:35, s:10333147966386144929666651337523200000000n},
    {i:36, s:371993326789901217467999448150835200000000n},
    {i:37, s:13763753091226345046315979581580902400000000n},
    {i:38, s:523022617466601111760007224100074291200000000n},
    {i:39, s:20397882081197443358640281739902897356800000000n},
    {i:40, s:815915283247897734345611269596115894272000000000n},
    {i:41, s:33452526613163807108170062053440751665152000000000n},
    {i:42, s:1405006117752879898543142606244511569936384000000000n},
    {i:43, s:60415263063373835637355132068513997507264512000000000n},
    {i:44, s:2658271574788448768043625811014615890319638528000000000n},
    {i:45, s:119622220865480194561963161495657715064383733760000000000n},
    {i:46, s:5502622159812088949850305428800254892961651752960000000000n},
    {i:47, s:258623241511168180642964355153611979969197632389120000000000n},
    {i:48, s:12413915592536072670862289047373375038521486354677760000000000n},
    {i:49, s:608281864034267560872252163321295376887552831379210240000000000n},
    {i:50, s:30414093201713378043612608166064768844377641568960512000000000000n},
  ]
prueba2.forEach((dato,index)=>{
Deno.test("factorial "+index, () => {
    assertEquals(probabilidad.factorial(dato.i),BigInt(dato.s));
    });
})

interface tipoConteoReglaEmpirica{
    m:number,
    d:number
}
let conteoReglaEmpirica:[tipoConteoReglaEmpirica,number,number][]=[
    [{m:22.4,d:2.7},27.8,2],
    [{m:22.4,d:2.7},30.5,3],
    [{m:20.8,d:3.1},23.9,1],
    [{m:10,d:1.4},7.2,-2],
    [{m:3.1,d:0.6},2.5,-1],
    [{m:3.1,d:0.6},4.3,2],
    [{m:13.8,d:3.2},7.4,-2],
    [{m:10.4,d:1.9},16.1,3],
    [{m:16,d:1.7},14.3,-1],
    [{m:20.8,d:3.1},23.9,1],
    [{m:10,d:1.4},7.2,-2],
    [{m:10,d:1.4},11.4,1],
    [{m:16,d:1.7},19.4,2],
    [{m:20.5,d:3.9},16.6,-1],
    [{m:20.5,d:3.9},24.4,1],
]
conteoReglaEmpirica.forEach((dato,index)=>{
    Deno.test("conteoReglaEmpirica "+index, () => {
        assertEquals(probabilidad.conteoReglaEmpirica(dato[0].m,dato[0].d)(dato[1]),dato[2]);
    });
})

let indicesReglaEmpirica:[number[],number[],probabilidad.Opciones?][]=[
    [[1],[34],probabilidad.Opciones.igualQue],
    [[2,3],[13.5,2.35],probabilidad.Opciones.igualQue],
    [[-1,-2],[ 13.5, 2.35],probabilidad.Opciones.igualQue],
    [[1],[ 34],probabilidad.Opciones.igualQue],
    [[1],[13.5,2.35,0.15],probabilidad.Opciones.mayorQue],
    [[1],[0,0.15,2.35,13.5,34,34],probabilidad.Opciones.menorIgualQue],
    // [[1],[0,0.15,2.35,13.5,34],probabilidad.Opciones.menorQue],
    // [[-2],[0,0.15,2.35],probabilidad.Opciones.menorQue],
    // [[3],[0,0.15,2.35,13.5,34,34,13.5],probabilidad.Opciones.menorQue],
    [[-1],[0,0.15,2.35,13.5],probabilidad.Opciones.menorQue],
    [[-2],[0,0.15,2.35],probabilidad.Opciones.menorQue],
    [[-1,2],[34,34,13.5],probabilidad.Opciones.entresQue],
    [[2,-1],[34,34,13.5],probabilidad.Opciones.entresQue],
    [[-3,1],[2.35,13.5,34,34],probabilidad.Opciones.entresQue],
    [[-1,1],[34,34],probabilidad.Opciones.entresQue],
    [[-2,1],[13.5,34,34],probabilidad.Opciones.entresQue],
    [[-2],[13.5,34,34,13.5,2.35,0.15],probabilidad.Opciones.mayorQue],
    [[-1],[34,34,13.5,2.35,0.15],probabilidad.Opciones.mayorQue],
    [[1],[0,0.15,2.35,13.5,34,34,13.5,2.35,0.15]]
    
]

indicesReglaEmpirica.forEach((dato,index)=>{
    Deno.test("encontrarPorcentajeIndiceReglaEmpirica "+index+"  opcion:"+dato[2], () => {
        assertEquals(probabilidad.encontrarPorcentajeIndiceReglaEmpirica(dato[0],dato[2]),dato[1]);
    });
})

interface TipoporcentajesReglaEmpirica {
    ingresar:number[],
    resultado:number,
    opciones:probabilidad.Opciones
}
let porcentajesReglaEmpirica:[tipoConteoReglaEmpirica,TipoporcentajesReglaEmpirica][]=[
    // [{m:22.4,d:2.7},{ingresar:[27.8,30.5],resultado:15.85,opciones:probabilidad.Opciones.entresQue}],
     [{m:3.1,d:0.6},{ingresar:[2.5,4.3],resultado:81.5,opciones:probabilidad.Opciones.entresQue}],
     [{m:3.1,d:0.6},{ingresar:[2.5],resultado:84,opciones:probabilidad.Opciones.mayorQue}],
     [{m:20.8,d:3.1},{ingresar:[11.5,27],resultado:97.35,opciones:probabilidad.Opciones.entresQue}],
     [{m:10,d:1.4},{ingresar:[7.2,11.4],resultado:81.5,opciones:probabilidad.Opciones.entresQue}],
    [{m:20.8,d:3.1},{ingresar:[23.9],resultado:16,opciones:probabilidad.Opciones.mayorQue}],
    [{m:10,d:1.4},{ingresar:[7.2],resultado:97.5,opciones:probabilidad.Opciones.mayorQue}],
    [{m:13.8,d:3.2},{ingresar:[7.4],resultado:97.5,opciones:probabilidad.Opciones.mayorQue}],
    [{m:13.8,d:3.2},{ingresar:[7.4],resultado:2.5,opciones:probabilidad.Opciones.menorQue}],
    [{m:16,d:1.7},{ingresar:[14.3],resultado:84,opciones:probabilidad.Opciones.mayorQue}],
    [{m:16,d:1.7},{ingresar:[14.3],resultado:16,opciones:probabilidad.Opciones.menorQue}],
    [{m:16,d:1.7},{ingresar:[14.3,19.4],resultado:81.5,opciones:probabilidad.Opciones.entresQue}],
    [{m:20.5,d:3.9},{ingresar:[16.6,24.4],resultado:68,opciones:probabilidad.Opciones.entresQue}],
    // [{m:10,d:1.4},{ingresar:[7.2],resultado:2.5,opciones:probabilidad.Opciones.menorQue}],
    // [{m:20.8,d:3.1},{ingresar:[23.9],resultado:84,opciones:probabilidad.Opciones.menorQue}],
    // [{m:10.4,d:1.9},{ingresar:[16.1],resultado:97.5,opciones:probabilidad.Opciones.menorQue}],
]

porcentajesReglaEmpirica.forEach((dato,index)=>{
    Deno.test("porcentajesReglaEmpirica "+index, () => {
        assertEquals(probabilidad.porcentajesReglaEmpirica(dato[0].m,dato[0].d)(dato[1].ingresar,dato[1].opciones),dato[1].resultado);
    });
})
let tablaDistribucionNormal:number[][] = probabilidad.convertirTextoToTabla(probabilidad.textoTabla)
let busquedaAreaBajoLaCurvaNormalEstandarizada = probabilidad.busquedaAreaBajoLaCurvaNormalEstandarizada(tablaDistribucionNormal)// esto es necesario de guardar en una variable el resultado de la funcion ya que tablaDistribucionNormal esta cambiando de datos cada vez que se llama en esta funcion
let datosDistribucionNormal:[number,number][]=[
    [1.25,0.3944],
    [1.33,0.4082],
    [0.91,0.3186]
]
datosDistribucionNormal.forEach((dato,index)=>{
    Deno.test("busquedaAreaBajoLaCurvaNormalEstandarizada "+index+" "+dato[1], () => {
        assertEquals(busquedaAreaBajoLaCurvaNormalEstandarizada(dato[0]),dato[1]);
    });
})





let datosDistribucionNormalOpciones:[number[],number,probabilidad.Opciones][]=[
    [[1.25],0.1056,probabilidad.Opciones.mayorIgualQue],
    [[-1.25],0.1056,probabilidad.Opciones.menorIgualQue],
    [[0,1.33],0.4082,probabilidad.Opciones.entresQue],
    [[0,-1.33],0.4082,probabilidad.Opciones.entresQue],
    [[0.33,1.33],0.4082-0.1293,probabilidad.Opciones.entresQue],
    [[1.33,-1.33],0.4082*2,probabilidad.Opciones.entresQue]
]

datosDistribucionNormalOpciones.forEach((dato,index)=>{
    Deno.test("encontrarPorcentajeAreaBajoLaCurva "+index, () => {
        assertEquals(probabilidad.encontrarPorcentajeAreaBajoLaCurva(dato[0],dato[2]),dato[1]);
    });
})
let datosDistribucionNormalOpciones2:[tipoConteoReglaEmpirica,number[],number,probabilidad.Opciones][]=[
    [{m:6,d:2},[8],0.1587,probabilidad.Opciones.mayorIgualQue],
    [{m:20,d:3},[18,20],0.2486,probabilidad.Opciones.entresQue],
    [{m:160,d:2},[158,163],0.7745,probabilidad.Opciones.entresQue],
    [{m:160,d:2},[158,158],0,probabilidad.Opciones.entresQue],
    [{m:160,d:2},[158,158],0,probabilidad.Opciones.entresQue],
    [{m:205,d:10},[200],0.3085,probabilidad.Opciones.menorIgualQue],
    [{m:205,d:10},[200],0.6915,probabilidad.Opciones.mayorIgualQue],
    // [{m:1000,d:14},[990],0.95,probabilidad.Opciones.menorIgualQue],
    [{m:180,d:8},[200,200],0,probabilidad.Opciones.entresQue],
    [{m:180,d:8},[200],0.9938,probabilidad.Opciones.menorIgualQue],
]

datosDistribucionNormalOpciones2.forEach((dato,index)=>{
    Deno.test("encontrarPorcentajeAreaBajoLaCurva2  "+index, () => {
        assertEquals(probabilidad.encontrarPorcentajeAreaBajoLaCurva(dato[1].map(probabilidad.variableEstandarizadaZ(dato[0].m,dato[0].d)),dato[3]),dato[2]);
    });
})

// let reglaEmpirica:[[
//     tipoConteoReglaEmpirica,
//     number[],
//     probabilidad.Opciones,
//     number
// ]]=[
//     [{m:22.4,d:2.7},[27.8,30.5]]
// ]

let datosdistribucionBinomial:[number/*probaExistos */,number/*totalExpermientos */,number/*exitos */,number,probabilidad.Opciones?][]=[
    [0.55,5,2,0.27565, probabilidad.Opciones.igualQue],
    [0.12,5,2,0.098131, probabilidad.Opciones.igualQue],
    [0.12,5,0,0.5277, probabilidad.Opciones.igualQue],
    [0.12,5,0,0.4723, probabilidad.Opciones.mayorQue],
    [0.12,5,3,0.9857,probabilidad.Opciones.menorQue],
    [0.12,5,3,0.0143,probabilidad.Opciones.mayorIgualQue],
    [0.50,4,1,0.3125,probabilidad.Opciones.menorIgualQue],
    [0.85,16,5,0,probabilidad.Opciones.menorIgualQue],
    [0.85,16,3,0,probabilidad.Opciones.menorIgualQue],
    [0.85,16,3,0,probabilidad.Opciones.menorIgualQue],
    [0.80,10,6,0.1209,probabilidad.Opciones.menorIgualQue],
    
]

datosdistribucionBinomial.forEach((dato,index)=>{
    Deno.test("distribucionBinomial "+index+" "+dato[1], () => {
        assertEquals(redondeo(probabilidad.distribucionBinomial(dato[0],dato[1],dato[2],dato[4]),10000),redondeo(dato[3],10000));
    });
})

// esto genra error Math.pow(0.15000000000000002, 13) = 1.946195068359379e-11