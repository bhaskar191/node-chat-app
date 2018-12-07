var expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage',(from,text) =>{
it('should generate a message object', () =>{
    var from = 'bhaskar';
    var text = 'Some message';

    var message = generateMessage(from,text);

    expect(typeof message.createdAt).toBe('number');
       expect(message).toMatchObject({from, text});
});
});