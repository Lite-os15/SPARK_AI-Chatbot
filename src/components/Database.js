import Realm from 'realm';

// Define the schema for messages
const MessageSchema = {
  name: 'Message',
  primaryKey: 'id',
  properties: {
    id: 'int', // Primary key
    role: 'string',
    content: 'string',
    timestamp: 'date'
  }
};

// Define a migration function
const migrationFunction = (oldRealm, newRealm) => {
  if (oldRealm.schemaVersion < 1) {
    // Add the 'id' field to existing objects
    const oldObjects = oldRealm.objects('Message');
    const newObjects = newRealm.objects('Message');
    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].id = i;
    }
  }
};

// Function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Function to get Realm instance
const getRealmInstance = () => {
  const currentDate = getCurrentDate();
  const realmPath = `realm_${currentDate}.realm`;
  return new Realm({ schema: [MessageSchema], path: realmPath, schemaVersion: 1, migration: migrationFunction });
};

// Function to store message in Realm database
const storeMessage = (role, content) => {
  const realm = getRealmInstance();
  realm.write(() => {
    realm.create('Message', {
      id: new Date().getTime(), // Generate unique id
      role: role,
      content: content,
      timestamp: new Date()
    });
  });
};

// Function to clear the database
const clearDatabase = () => {
  const realm = getRealmInstance();
  realm.write(() => {
    const allMessages = realm.objects('Message');
    realm.delete(allMessages); // Delete all objects from the 'Message' class
  });
};

// Function to retrieve chat history from Realm database
const getChats = () => {
  const realm = getRealmInstance();
  return realm.objects('Message').sorted('timestamp', true); // Retrieve messages sorted by timestamp in descending order
};


const printChatHistory = () => {
    const chatHistory = getChatHistory();
    console.log("Chat History:", chatHistory);
};

const getChatHistory1 = () => {
  const realm = getRealmInstance();
  const messages = realm.objects('Message').sorted('timestamp', true); // Retrieve messages sorted by timestamp in descending order
  
  // Separate user messages and assistant messages
  const userMessages = messages.filtered('role == "user"');
  const assistantMessages = messages.filtered('role != "user"');

  // Concatenate user messages and assistant messages while preserving the order
  const sortedMessages = [];
  let userIndex = 0;
  let assistantIndex = 0;

  while (userIndex < userMessages.length || assistantIndex < assistantMessages.length) {
    if (userIndex < userMessages.length) {
      sortedMessages.push(userMessages[userIndex]);
      userIndex++;
    }
    if (assistantIndex < assistantMessages.length) {
      sortedMessages.push(assistantMessages[assistantIndex]);
      assistantIndex++;
    }
  }

  return sortedMessages;
};

//Group the stored data as per the days.



export { storeMessage, clearDatabase, getChats,printChatHistory,getChatHistory1 };
