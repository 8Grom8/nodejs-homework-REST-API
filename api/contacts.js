const express = require('express');
const { ctrlWrapper } = require("../helpers");
const { contacts: ctrl } = require('../controllers');
const { joiSchema } = require("../models/schemas/contact");
const { validation, authenicate } = require("../middlewares");

const router = express.Router();

router.get('/', authenicate, ctrl.getAll);
router.get('/:contactId', authenicate, ctrlWrapper(ctrl.getById));
router.post('/', authenicate, validation(joiSchema), ctrl.add);
router.put("/:contactid", ctrlWrapper(ctrl.update));
router.delete('/:id', authenicate, ctrlWrapper(ctrl.del));
router.patch("/:contactId/favorite", validation(joiSchema), ctrl.updateStatus);

module.exports = router;