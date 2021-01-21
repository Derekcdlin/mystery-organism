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

const pAequorFactory = (num, array) =>{
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
    compareDNA(obj, bool=true){
      let count = 0;
      for(let i = 0; i < Math.min(this.dna.length, obj.dna.length); i++){
        if(this.dna[i] === obj.dna[i]){
          count++;
        }
      }
      const ret_perc = Math.round((count/Math.min(this.dna.length, obj.dna.length) * 100)*100)/100;
      if(bool){
        console.log(`specimen #1 and specimen #2 have ${string_ret}% DNA in common`);
      }
      return ret_perc;
    },
    willLikelySurvive(){
      const numCorG = this.dna.filter(base => (base === 'C' || base === 'G')).length;
      const percCorG = (numCorG/this.dna.length) * 100;
      return (percCorG >= 60);
    },
    complementStrand(){
      const complement = this.dna.map((base) => {
        switch(base){
          case 'A':
            return 'T';
          case 'T':
            return 'A';
          case 'C':
            return 'G';
          case 'G':
            return 'C';
        }
      });
      return complement;
    }
  };
  return obj;
};

const twoMostSimilarDNA = (arr) => {
  let largestSimilarity = 0;
  let index1;
  let index2;
  for(let i = 0; i < arr.length-1 ; i++){
    for(let j = 1; j < arr.length; j++){
      if(i == j){
        continue;
      }
      let currentSimilarity = arr[i].compareDNA(arr[j],false);
      if(currentSimilarity > largestSimilarity){
        //console.log(`i:${i}\tj:${j}\tsimilarity:${currentSimilarity}`);
        largestSimilarity = currentSimilarity;
        index1 = i;
        index2 = j;
      }
    }
  }
  console.log(`The two most similar DNAs are from species #${index1} and #${index2} at ${largestSimilarity}%.`);
  console.log(arr[index1].toString());
  console.log(arr[index2].toString());
};

//sample of 30 random species
const pAequorStudy = [];
for(let i = 0; i < 30; i++){
  pAequorStudy.push(pAequorFactory(i, mockUpStrand()));
  console.log(pAequorStudy[i].toString());
}

//complement strand test of last specie in pAequorStudy
console.log(pAequorStudy[29].complementStrand());
//twoMostSimilarDNA function test
twoMostSimilarDNA(pAequorStudy);
