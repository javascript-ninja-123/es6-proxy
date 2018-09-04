const credential = {
  name:'sungmin yi',
  uid:1213414141541,
  age:23
}

const persistentData = () => (
  new Proxy({}, {
    get(target,value){
      if(!localStorage.getItem(key)) return 'does not cotain I will save now'
      return localStorage.getItem(key)
    },
    set(target,key,value){
      localStorage.setItem(key, value)
      target[key] = value;
      return true;
    },
    deleteProperty(target,key){
      localStorage.removeItem(key)
      delete target[key]
      console.log('deleted');
    }
  })
)


const obj = persistentData();

Object.keys(credential).forEach(value => {
  obj[value] = credential[value];
})

delete obj['name']

console.log(obj)
