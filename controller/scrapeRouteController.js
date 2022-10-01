
const axios = require('axios')

const genericResponses = require('../utils/genericResponses')
const { stringifyCircularReference, eachNode, generateSelector }  = require('../utils/helpers')
const { SELECTORTYPES } = require('../utils/selectorTypes')

//INPUT
// body = {
//     text: '',
//     urlSource: "",
//     element: "" ?? *
//     auth: {
//             email: '',
//             password: " "
//    }
// }

//INPUT
// returns specified selector in requestBody - SELECTORTYPES

class ScrapeRouteController {

    constructor(){

    }

    //TODO - Implement
    static async getSelector(req, res, next){

        try{
            console.log("Get - Testing")
            genericResponses.sendSuccess(res, {
                message: '',
                code: 200,
                success: true
            })
        }catch(e){
            genericResponses.sendError(res, e)
        }
    }


    static async postSelector(req, res, next){

        try{

            const { text, urlSource, auth} = req.body

            let { element } = req.body

            if (!text) throw new Error("text cannot be empty")

            if (!urlSource) throw new Error("urlSource cannot be empty")

            //Authenticate before proceeding 
            if (auth){

            }

            const result = await axios.get(urlSource)

            const selectors = generateSelector(result.data, element, text)

            let responseObject = {
                message: '',
                code: 200,
                success: true,
            }

            if (selectors === null){
                responseObject.message = "Text not found in urlSource"
                responseObject.code = 404
                responseObject.success = false
            }
            
            return genericResponses.sendSuccess(
                res, 
                responseObject,
                selectors
            )

        }catch(e){
            genericResponses.sendError(res, e)
        }
    }

}

module.exports = ScrapeRouteController;