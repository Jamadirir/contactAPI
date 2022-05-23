const contactModel = require("../models/contact");
const _ = require("lodash");

const create_contact = async (req, res) => {
  const newContact = await new contactModel(
    _.pick(req.body, ["contact_number", "contact_email", "contact_desc"])
  );
  return newContact
    .save()
    .then(() => {
      return res.status(200).json(newContact);
    })
    .catch((err) => {
      console.log("Error : ", err.message);
      return res.status(400).json({ msg: "Bad request" });
    });
};

const contact_list = async (req, res) => {
  try {
    const contact = await contactModel.find();
    return res.status(200).send(contact);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

const view_byId = async (req, res) => {
  const _id = req.params.id;
  try {
    const contact = await contactModel.find({ _id });
    if (!contact) return res.status(400).json({ msg: "Contact not found" });

    return res.status(200).json({ contact });
  } catch (error) {
    return res.status(500).json({ message: "contact could not found", error });
  }
};

const update_contact = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["contact_number", "contact_email", "contact_desc"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  const _id = req.params.id; //* params id

  if (!isValidUpdate)
    return res.status(400).send({ Error: "Invalid updates.!" });

  try {
    const contact = await contactModel.findOne({ _id });
    if (!contact) return res.status(400).send("Oops Not founded !!");

    updates.forEach((update) => (contact[update] = req.body[update]));
    await contact.save();
    res
      .status(200)
      .send(
        _.pick(contact, ["contact_number", "contact_email", "contact_desc"])
      );
  } catch (err) {
    return res.status(400).json(err.message);
  }
};

const delete_contact = async (req, res) => {
  const _id = req.params.id;
  try {
    const contact = await contactModel.findByIdAndRemove({ _id });
    if (!contact)
      return res.status(200).json({ message: "Contact not exists" });

    return res
      .status(200)
      .json({ message: "Contact deleted successfully", contact });
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
};

module.exports = {
  create_contact,
  contact_list,
  delete_contact,
  view_byId,
  update_contact,
};
