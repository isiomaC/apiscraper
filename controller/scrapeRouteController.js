
const axios = require('axios')
const cheerio = require('cheerio')

const genericResponses = require('../utils/genericResponses')
const { stringifyCircularReference, eachNode }  = require('../utils/helpers')
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
            console.log("Post - Testing")
            
            const { text, urlSource, auth} = req.body

            let { element } = req.body

            if (!text) throw new Error("text cannot be empty")

            if (!urlSource) throw new Error("urlSource cannot be empty")

            //Authenticate before proceeding 
            if (auth){

            }

            const result = await axios.get(urlSource)

            const $ = cheerio.load(result.data)

            //query cheerio for element and

            console.log(`//${element}[contains(., "${text}")]`)

            let returnElement, returnElementTextContent

            if (element){
               
                const findEleme = $(element) 

                for (let h4 of findEleme ){

                    for (let currentChild of h4.children){

                        if (currentChild.data.startsWith(text)){
                            returnElement = h4
                            returnElementTextContent = currentChild
                            break
                        }
                    }
                }
            }else{

                //TODO - Handle searching through DOM for text parent
                const findElem = $("*").text()

                console.log(findElem)

            }
            
            return genericResponses.sendSuccess(
                res, 
                { 
                    message: '',
                    code: 200,
                    success: true,
                },
                { 
                    element: JSON.parse(stringifyCircularReference(returnElement)),
                    textContent: JSON.parse(stringifyCircularReference(returnElementTextContent))
                }
            )

        }catch(e){
            genericResponses.sendError(res, e)
        }
    }

}

module.exports = ScrapeRouteController;