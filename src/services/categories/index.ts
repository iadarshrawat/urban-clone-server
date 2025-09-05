import { SERVICECATEGORY } from '../../models/servicesCategory';

export const getAllCategories = async (selection = {}, projection = {}) => new Promise ((resolve, reject) => {
    SERVICECATEGORY.find(selection, projection)
    .then(resolve)
    .catch(reject);
});

export const getCategory = async (selection = {}, projection = {}) => new Promise ((resolve, reject) => {
    SERVICECATEGORY.findOne(selection, projection)
    .then(resolve)
    .catch(reject);
});

export const createCategory = async (selection = {}, projection = {}) => new Promise ((resolve, reject) => {
    SERVICECATEGORY.create(selection, projection)
    .then(resolve)
    .catch(reject);
});

export const updateCategory = async (selection = {}, updation = {}) => new Promise ((resolve, reject)=>{
    SERVICECATEGORY.updateOne(selection, updation)
    .then(resolve)
    .catch(reject);
})
