import express from 'express';
import * as ApparelController from '../controllers/apparelController';

const router = express.Router();

router.put('/apparel', ApparelController.updateApparel);
router.put('/apparel/bulk', ApparelController.updateApparelBulk);
router.post('/order/check', ApparelController.checkOrder);
router.post('/order/cost', ApparelController.getOrderCost);

export default router;

