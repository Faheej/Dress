const express = require("express")
const { verify, verifyAdmin } = require("../Middleware/auth")
const dressTypeController = require("../Controller/dressTypeController")
const router = express.Router()

router.get("/get/:id",dressTypeController.getDressType)
router.get("/getAll",dressTypeController.getAllDressType)
router.post("/create",verifyAdmin,dressTypeController.createDressType)
router.put("/update/:id",verifyAdmin,dressTypeController.updateDressType)
router.delete("/delete/:id",verifyAdmin,dressTypeController.deleteDressType)

module.exports = router