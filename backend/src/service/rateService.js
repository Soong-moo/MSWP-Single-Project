import RateDB from '../database/RateDB.js';

const rateService = {

    total : async () => {
        const total = await RateDB.getTotal();
        return { total };
    },

    correct : async () => {
        const correct = await RateDB.getCorrect();
        return { correct };
    },

    answer : async (body) => {
        const answer = await RateDB.postAnswer(body.answer);
        return { answer };
    }

}

export default rateService;