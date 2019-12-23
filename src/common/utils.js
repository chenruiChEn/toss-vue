import Localstoreage from 'store'

//localStorage
//通用存
export function setLocalValue(name, value) {
  return Localstoreage.set(name, value)
}

//通用取
export function getLocalValue(name) {
  return Localstoreage.get(name)
}
//通用删
export function removeLocalValue(name) {
  return Localstoreage.remove(name)
}
