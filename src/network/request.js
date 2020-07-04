import axios from 'axios'

export function request(config){
 
const instance1 = axios.create({
    baseURL:'http://152.136.185.210:8000/api/n3'
})

//axios拦截器
instance1.interceptors.request.use(config => {
    console.log(config);
    return config;
},err => {

})

instance1.interceptors.response.use(res => {
    return res.data
},err => {

})

return instance1(config)   //返回promis，所以可以在实例后面直接then
}