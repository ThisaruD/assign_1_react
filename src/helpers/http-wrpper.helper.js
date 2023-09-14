import axios from 'axios';

/**
 * Http client wrapper
 * @param {String} apiURL 
 * @param {String} httpMethod 
 * @param {Object} body 
 * @returns any
 */
const httpRequset=async(apiURL,httpMethod="get",body={})=>{
    try{
        const data = await axios({
            url:apiURL,
            method:httpMethod,
            data:body,
            headers:{
                Authorization:`Bearer ${process.env.REACT_APP_API_KEY}`
            }
        });

        return data.data;

    } catch(ex){
        console.log("EX-",ex);
        return null;
    }
}

export {
    httpRequset
}