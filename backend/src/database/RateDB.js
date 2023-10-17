import { Sequelize } from "sequelize";
import sequelize from "./models/index.js";

const RateDB = {

    getTotal : async () => {
        const res = await sequelize.query(`SELECT COUNT(*) as total FROM rate `, {type : Sequelize.QueryTypes.SELECT});
        return res;
    },

    getCorrect : async () => {
        const res = await sequelize.query(`SELECT COUNT(*) as correct FROM rate WHERE response = 'T'`, {type : Sequelize.QueryTypes.SELECT});
        return res;
    },

    postAnswer : async (answer) => {
        const res = await sequelize.query(`INSERT INTO rate VALUES('${answer}')`);
        return res;
    }

}

export default RateDB;