import sequelize from "./index.js";
import { DataTypes, Model } from "sequelize";

export class Rates extends Model{
    //buffer에 저장하면 binary 형태로 저장이 되기 때문에 json type으로 다시 변환시켜주기 위함
    toJSON(){
        return super.toJSON();
    }

}

Rates.init(
    {
        response : {
            type : DataTypes.CHAR(1),
            allowNull : false
        }
    },

    {
        sequelize,
        modelName : "Rates",
        tableName : "rate",
        timestamps : false
    }
)