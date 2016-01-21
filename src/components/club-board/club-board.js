define(["knockout", "text!./club-board.html"], function(ko, templateMarkup) {

    /* fake some data in here, before calling to the rest end point */



    function ClubBoard(route) {
        var self = this;

        self.message = ko.observable('some message');

        self.officers = ko.observableArray([
            {name: 'Steve Kenesie', position: 'President'},
            {name: 'Rich Lemay', position: 'Vice-President'},
            {name: 'Kirk Blaisdell', position: 'Treasurer'},
            {name: 'Caroline Honold', position: 'Sub-Treasurer'},
            {name: 'Tina Rosselli', position: 'Secretary'}
        ]);

        self.rangeCaptains = ko.observableArray([
            {name: 'John Bloom', position: 'Indoor Range'},
            {name: 'Matt Haas', position: 'Range 1 Captain'},
            {name: 'Marty Haas', position: 'Range 2 Captain'},
            {name: 'Ken Gardner', position: 'Range 3 Captain'},
            {name: 'Michael Richter', position: 'Range 4 Captain'}
        ]);


        self.boardMembers = ko.observableArray([
            {name: 'Bob Wheeler', position: 'Practice Butts'},
            {name: 'Ed Honold', position: 'Mowing'},
            {name: 'Chuck Leisten', position: 'Targets'},
            {name: 'Rick Desotel', position: 'Equipment'},
            {name: 'Frank Lemay', position: 'Clubhouse'},
            {name: 'Joey Wright', position: 'Bar Agent'}
        ]);


    }

    return { viewModel: ClubBoard, template: templateMarkup };
});