// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

function pAequorFactory(num, array){
  const obj = {
    _specimenNum: num,
    _dna: array,
    get specimenNum(){
      return this._specimenNum;
    },
    get dna(){
      return this._dna;
    },
    mutate(){
      const randBaseIndex = Math.floor(Math.random() * this.dna.length);
      let diffBase;
      do{
        diffBase = returnRandBase();
      }while(diffBase === this.dna[randBaseIndex]);
      this.dna[randBaseIndex] = diffBase;
      return this.dna;
    },
    toString(){
      return `Specimen Number: ${this.specimenNum}\nDNA: ${this.dna}`;
    },
    compareDNA(obj){
      let count = 0;
      for(let i = 0; i < Math.min(this.dna.length, obj.dna.length); i++){
        if(this.dna[i] === obj.dna[i]){
          count++;
        }
      }
      const ret_perc = (count/Math.min(this.dna.length, obj.dna.length) * 100).toFixed(2);
      console.log(`specimen #1 and specimen #2 have ${ret_perc}% DNA in common`);
    },
    willLikelySurvive(){
      const numCorG = this.dna.filter(base => (base === 'C' || base === 'G')).length;
      const percCorG = (numCorG/this.dna.length) * 100;
      return (percCorG >= 60);
    }
  };

  return obj;
}

const pAequorStudy = [];
for(let i = 0; i < 30; i++){
  pAequorStudy.push(pAequorFactory(i, mockUpStrand()));
  console.log(pAequorStudy[i].toString());
}
console.log(pAequorStudy);
