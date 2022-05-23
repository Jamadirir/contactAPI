const express = require("express");
const router = express.Router();

const {
  create_contact,
  contact_list,
  update_contact,
  delete_contact,
  view_byId,
} = require("../controllers/contact");

//this Api is on process..
router.post("/create", create_contact);
router.put("/update/:id", update_contact);
router.get("/list", contact_list);
router.get("/display/:id", view_byId);
router.delete("/delete/:id", delete_contact);

module.exports = router;
