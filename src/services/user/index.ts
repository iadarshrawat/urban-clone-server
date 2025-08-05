import { USER } from '../../models';

export const getUser = async (selection= {}, projection= {}) => new Promise((resolve, reject) => {
  USER.findOne(selection)
      .then(resolve)
      .catch(reject);
});

export const createUser = async (payload= {}) => new Promise((resolve, reject) => {
  USER.create(payload)
      .then(resolve)
      .catch(reject);
});

export const updateUser = async (selection= {}, updation= {}) => new Promise((resolve, reject) => {
  USER.findOneAndUpdate(updateUser, updation)
      .then(resolve)
      .catch(reject);
});
