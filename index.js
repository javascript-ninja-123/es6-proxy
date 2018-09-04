// const target = {}
// const handler = {
//   get(target,key){
//     if(target[key]){
//       return target[key]
//     }
//     return 'It does not exist'
//   }
// };
//
// const proxy = new Proxy(target,handler);
//
// proxy.name = 'yes'
// //
// // console.log(proxy.name)
// //
// // console.log(proxy.yes)
//
//
// const target2 = {}
// const validator = {
//   set(target,key,value){
//     if(key === 'age'){
//       if(typeof value !== 'number' || Number.isNaN(value)){
//         throw new TypeError('Age must be number')
//       }
//       if(value <=0) throw new TypeError('Age must be a positive number')
//     }
//     target[key] = value;
//     return true;
//   },
//   get(target,key){
//     if(target[key]) return target[key]
//     return 'it does not exist';
//   }
// }
//
// const newProxy = new Proxy(target2,validator);
//
// newProxy.age = 10;
// //
// // console.log(newProxy.age)
// //
// //


const proxyWrap = obj => {

  const handler = {
    get(target,key){
      if(key.startsWith("_")) return 'you cannot access private variables';
      if(!target[key]) return 'does not exist'
      return target[key];
    }
  }
  return new Proxy(obj,handler)
}



class project1One{
  constructor({name,age}){

    this.name = name;
    this.age = age;
    this._count = 0;

    return new Proxy(this, {
      set(target,key,value){
        if(key === 'name'){
          if(typeof value !== 'string') return 'name should be string'
        }
        else if(key === 'age'){
          if(value <=0) return 'age should be positive'
          if(typeof value !== 'number' || Number.isNaN(value)) return 'should be number'
        }
        target[key] = value;
        return true;
      },
      get(target,key){
        if(key.startsWith("_")) return 'Cannot access private variable'
        if(!target[key]) return 'does not exists'
        return target[key]
      }
    })
  }
  addCount(){
    this._count++;
    console.log('increased')
    return 'increased'
  }
}

//
// const w = new project1One({name:'sung',age:"4"});
// const count  = w.addCount();
//
// console.log(w.name)
// console.log(w.whatisup)


class Cache{
  constructor(){
    this._cache = {};
    return new Proxy(this, {
      set(target,key,value){
        if(key === 'setFunction'){
          if(!Array.isArray(value.args)) return 'arguments have to be in array'
          if(typeof value.fn !== 'function') return 'fn has to be function'
        }
        target._cache[value.name] = value.fn(...value.args)
        return true;
      },
      get(target,key){
        if(key.startsWith('_')) return 'you cannot access private variables'
        if(!target._cache[key]) return 'does not exist'
        return target._cache[key]
      }
    })

  }
  set setFunction({fn,args}){

  }
}

const add =(x,y) => x + y;
const computation = (x,y) => x - y;
const ay = new Cache();

ay.setFunction = {fn:add, args:[1,2],name:'add'}
ay.setFunction = {fn:computation, args:[1,2],name:'computation'}
const y = ay.add;
const yy = ay.computation
// console.log(y)
// console.log(yy)








class ProxyClas2{
  constructor(){

  }
  doIt(){
    console.log('yeesss')
    return 'yses'
  }
}



class ProxyClass {
  constructor(data,cl){
    this.data = data;
    this.proxyman = new cl();
    this._count = 0;

    return new Proxy(this, {
      get(target,key){
        if(key.startsWith('_')) return 'cannot access private'
        if(!target[key])  return target.proxyman[key] ||  'does not exists';
        return target[key]
      }
    })
  }

  addCount(){
    this._count++;
    return 'increased'
  }
}



const newProxyClass = new ProxyClass({name:'sung'},ProxyClas2);
newProxyClass.addCount();
newProxyClass.doIt();


const credential = {
  name:'sungmin yi',
  uid:1213414141541
}
