const expect = require('expect');

const {Users} = require('./users');


describe('Users',  () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'sahni',
            room: 'softest'
        }, {
            id: '2',
            name: 'preety',
            room: 'softdev'
        },{
            id: '3',
            name: 'bhaskar',
            room: 'softdev'
        }];
    });

    it('should add new user', () =>  {
        var users = new Users();
        var user = {
            id: '123',
            name:'Bhaskar',
            room: 'wieland'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '1';
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        var userId = '99';
        var user = users.removeUser(userId);
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '99';
        var user = users.getUser(userId);
        expect(user).toBeFalsy();
    });

    it('should return softdev',() => {
        var userList = users.getUserList('softdev');

        expect(userList).toEqual(['preety','bhaskar']);
    });
    it('should return softest',() => {
        var userList = users.getUserList('softest');

        expect(userList).toEqual(['sahni']);
    });
});