const express = require('express');
const router = express.Router();
const { checkSymptoms, getSymptomHistory } = require('../controllers/symptom.controller');

router.post('/check', checkSymptoms);
router.get('/history', getSymptomHistory);


module.exports = router;
