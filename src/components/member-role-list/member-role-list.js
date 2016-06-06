define(["knockout", "text!./member-role-list.html", '../data-objects/user-do.js'], function(ko, templateMarkup, UserDO) {

    /* fake some data in here, before calling to the rest end point */



    function MemberRoleList(params) {
        var self = this;
        
        self.role = ko.observable(params.role);
        self.userList = ko.observableArray();
        var query = {roles: params.role};

        if (params.role === 'BOARD') {
            query = {board: true};   //TODO: need to figure out how to eliminate the officers from the board list, open issue
        } else if (params.role === 'OFFICER') {
            query = {officer: true};
        } else if (params.role === 'BARTENDER') {
            query = {bartender: true};
        }
        
        new UserDO().loadList(self.userList, {q: query});

    }

    return { viewModel: MemberRoleList, template: templateMarkup };
});