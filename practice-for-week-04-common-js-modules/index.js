
// Your code here
const sayHelloTo = require('./send-messages/say-hello-to');
const giveMessageToMrsPotato = require('./send-messages/give-message-to-mrs-potato');

// const {msg1, msg2, msg3} = require('./messages');
const messages = require('./messages/index');
const msg1 = messages.msg1;
const msg2 = messages.msg2;
const msg3 = messages.msg3;



/****************************************************************************/
/******************* DO NOT EDIT CODE BELOW THIS LINE ***********************/

sayHelloTo("Mr. Potato");
giveMessageToMrsPotato(msg1);
giveMessageToMrsPotato(msg2);
giveMessageToMrsPotato(msg3);
