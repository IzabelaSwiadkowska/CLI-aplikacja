const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const updateContacts = async (data) => {
  const contacts = JSON.stringify(data);
  await fs.writeFile(contactsPath, contacts);
};

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
  }
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  const contactId = String(id);
  const result = contacts.find((item) => item.id == contactId);
  return result;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return;
  }
  const [contact] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return contact;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
