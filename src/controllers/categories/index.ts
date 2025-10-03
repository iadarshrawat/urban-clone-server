import express, { Request, Response } from 'express';
import { sendResponse } from '../../common';
import { MESSAGE } from '../../lib';
import { SERVICECATEGORY } from '../../models/servicesCategory';
import { createCategory, getAllCategories, getCategory, updateCategory } from '../../services/categories';

const router = express.Router();

router.get('/', (req: Request, res: Response) => {
    try {
        const categories = getAllCategories({deleted: false});
        if (!categories) {
            return sendResponse(res, 404, MESSAGE.NOTFOUND);
        }

        return sendResponse(res, 200, MESSAGE.GET);
    } catch (error: any) {
        return sendResponse(res, 400, error.message || MESSAGE.ERROR);
    }
});

router.post('/', async (req: Request, res: Response) => {
    try {
        const {name, description, icon} = req.body;
        console.log(name, description, icon);
        if(!name || !description || !icon) {
            return sendResponse(res, 400, MESSAGE.FIELD_REQUIRED)
        }
        const category = await getCategory({name, status: 'ACTIVE'});
        if(category){
            return sendResponse(res, 404, MESSAGE.ALREADY);
        }
        const newCategory = await createCategory({name, description, icon});
        return sendResponse(res, 200, MESSAGE.SUCCESS, newCategory);
    } catch (error: any) {
        return sendResponse(res, 400, error.message || MESSAGE.ERROR);
    }
});


router.put('/:id', async (req: Request, res: Response) => {
    try {
        const {name, description, icon} = req.body;
        const _id = req.params.id;
        const category = await getCategory({_id, status: 'ACTIVE'});
        if(!category){
            return sendResponse(res, 404, MESSAGE.NOTFOUND);
        }
        const newCategory = await updateCategory({_id, status: 'ACTIVE'}, {name, description, icon});
        return sendResponse(res, 200, MESSAGE.SUCCESS, newCategory);
    } catch (error: any) {
        return sendResponse(res, 400, error.message || MESSAGE.ERROR);
    }
});


router.delete('/:id', async (req: Request, res: Response)=>{
    const _id = req.params.id;
    const category = await getCategory({_id, status: 'ACTIVE'});
    if(!category){
        return sendResponse(res, 404, MESSAGE.NOTFOUND);
    }
    const delCategory = updateCategory({_id, status: 'ACTIVE'}, {status: 'DELETED'});
    return sendResponse(res, 200, MESSAGE.DELETED, delCategory);
})

export const categoriesController = router;
