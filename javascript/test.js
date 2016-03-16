"use strict"

describe ("TEST", function() {
    
    var array = [
        [0,9,0],
        [0,9,0],
        [0,0,0]
        ];
    

    it("Генерация координат", function(){
        assert.equal(randomInteger(0),0);
    });
    
    it("Бомб вокруг клетки [0][0] - 2", function(){
        assert.equal(determineNumberCell(0, 0, array), 2);
    });
    
    it("Бомб вокруг клетки [0][2] - 2", function(){
        assert.equal(determineNumberCell(0, 2, array), 2);
    });
    
     it("Бомб вокруг клетки [2][1] - 2", function(){
        assert.equal(determineNumberCell(1, 0, array), 2);
    });
    
    it("Определяет крайнюю клетку", function(){
        assert.equal(hasNeighbor(-1, 8), false);
    });
    
    it("Определяет, что вокруг есть соседи", function(){
        assert.equal(hasNeighbor(2, 8), true);
    });
    
});