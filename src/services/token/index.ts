import { TOKEN } from '../../models/token';

export const createToken = async (payload = {}) => {
  return await TOKEN.create(payload);
};

export const getToken = async (selection = {}, projection = {}) => {
  return await TOKEN.findOne(selection, projection);
};
