const csv = require('csv-parser')
const fs = require('fs')
const Graph = require('./graph');
const arr = [];
const size = 20;

class MProfile {
    constructor() {
        this.pv = {};
        this.range = [];
        this.data = [];
        this.plot = [[]];
        this.vol = [[]];
    }
   
    loadData(){
// Calling the readFileSync() method
// to read 'input.txt' file
 this.pv = fs.readFileSync('data/ETH-USD.csv',
            {encoding:'utf8', flag:'r'});
  
// Display the file data
// console.log(pv);

    }
    process(){
        // console.log(this.pv);
        this.pv.split('\n').forEach(element => {
            // console.log('row ',element);
            if (!element.includes('Open')){
            let arr = element.split(',');
            // console.log(arr[5],arr[6]);
            this.data.push([parseFloat(arr[5]), parseFloat(arr[6])]); 
            }
        });
        let min  = Math.min(...this.data.map(x => x[0]));
        let max  = Math.max(...this.data.map(x => x[0]));
        let range = (max-min)/size;
        // console.log(min,max);
        for(let i=0;i< size;i++){
            // this.range[i] = min + (i+1)*range;
            this.plot[i] = [(min + i*range).toFixed(2),0];
            this.vol[i] = [(min + i*range).toFixed(2),0];
        }
    //  console.log(this.plot);
    }

    align(){
        this.data.forEach(item=>{
            // console.log(item);
        for(let k =0; k < size; k++){
            if (this.plot[k]  && (item[0] < this.plot[k][0])) {
                // console.log(this.plot[k-1]);
            //    let xx = this.plot[k][1];
                // xx = xx + '0' ;
                this.plot[k][1] += 1;
                this.vol[k][1] += (item[1]/100000);
                break;
            }
        }
        });
        
            // console.log(this.plot.map( item => item[1]));
        const graph = new Graph();
         graph.bar(this.plot);  
         graph.bar(this.vol); 
         graph.draw();      
    
    }

}

const mp = new MProfile();
mp.loadData();
mp.process();
mp.align();