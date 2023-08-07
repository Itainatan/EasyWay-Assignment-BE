import { RequestHandler } from "express";
import Joi from "joi";
import fs from "fs";
import { logger } from "../utils";
import { DATA_PATH_JSON } from "../consts";
// import { cryptoCurrencyExchangeObject } from '../@types'

const get: RequestHandler = async (req, res) => {
  try {
    logger.info(`request history of locations `);

    const dataFromFile = await fs.promises.readFile(DATA_PATH_JSON, "utf-8");
    const parsedDataFromFile = JSON.parse(dataFromFile);

    return res.status(200).json({ parsedDataFromFile });
  } catch (e) {
    const message = e instanceof Error ? e.message : "General Error";
    const stack = e instanceof Error ? e.stack : "No Stack";

    logger.error(message, { stack });

    return res.status(500).json({
      message: message,
    });
  }
};

export default get;
