import axios from "axios";
const BackendApi = process.env.REACT_APP_BACKEND_API;

export const restApiCalls = async(method, route, data = null) =>{
    switch (method) {
        case "GET":{
            try{
                const res = await axios.get(`${BackendApi}/${route}`);
                if(res.status == 200){
                    return res.data;
                }
            }catch(err){
                return {success:false, error : err}

            }
        }
        case "POST":{
            try{
                // console.log(`${BackendApi}/${route}`, data)
                const res = await axios.post(`${BackendApi}/${route}`, data);
                console.log(res);
                return res.data;
            }catch(err){
                return {success:false, error:err}

            }
        }

        case "DELETE":{
            try{
                const res = await axios.delete(`${BackendApi}/${route}`);
                return res.data;

            }catch(err){
                return {success:false, error:err}
            }
        }

    
        default:
            return "Not a valid call";
    }
}