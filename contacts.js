const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");

async function getDb() {
    const dbRaw = await fs.readFile(contactsPath);
    const db = JSON.parse(dbRaw);
    return db;
}

async function listContacts() {
    const contacts = await getDb();
    return contacts;
}

async function getContactById(contactId) {
    const contacts = await getDb();
    const contactById = contacts.filter((contact) => contact.id == contactId);
    return contactById[0];
}

async function addContact(name, email, phone) {
    const id = nanoid();
    const contact = { id, name, email, phone };
    const db = await getDb();
    db.push(contact);
    await fs.writeFile(contactsPath, JSON.stringify(db));
    return contact;
}

async function removeContact(contactId) {
    const db = await getDb();
    const contact = db.find((item) => item.id === contactId);
    if (!contact) {
        return 'Such contact does not consist';
    }
    const contacts = db.filter((item) => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
};