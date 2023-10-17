import rateService from "../service/rateService.js";

const rateController = {

    total : async (req, res) => {
        try {
            const response = await rateService.total();
            res.json(response.total);
        } catch (err) {
            res.json(err);
        }
    },

    correct : async (req, res) => {
        try {
            const response = await rateService.correct();
            res.json(response.correct);
        } catch (err) {
            res.json(err);
        }
    },

    answer : async (req, res) => {
        try {
            const response = await rateService.answer(req.body);
            res.json(response);
        } catch (err) {
            res.json(err);
        }
        
    }

}

export default rateController;