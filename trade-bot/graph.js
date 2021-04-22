const plotlib = require('nodeplotlib');
class Graph
{

    constructor(){
        plotlib.clear();
    }
    bar(array){
        if(!array){ return}
        let x,y = [];
        x =  array.map(item => item[0]);
        y =  array.map(item => item[1]);
        
        const data = [{
            x: x, y:y, type: 'bar'
        }];
        plotlib.stack(data);
    }
    draw(){
        plotlib.plot();
    }
}
module.exports = Graph;