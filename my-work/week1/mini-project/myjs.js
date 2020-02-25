let data =[
    {
        "seq": 2,
        "c1": 10,
        "c2": 10,
        "c3": 6,
        "c4": 7,
        "c5": 7,
        "a1": 8,
        "a2": 7,
        "a3": 8,
        "a4": 8,
        "a5": 6,
        "b1": 9,
        "b2": 8,
        "b3": 10,
        "b4": 8,
        "b5": 9,
        "d1": 10,
        "d2": 10,
        "d3": 10,
        "d4": 10,
        "d5": 10
    },
    {
        "seq": 3,
        "c1": 7,
        "c2": 8,
        "c3": 9,
        "c4": 4,
        "c5": 6,
        "a1": 8,
        "a2": 6,
        "a3": 8,
        "a4": 10,
        "a5": 7,
        "b1": 6,
        "b2": 4,
        "b3": 5,
        "b4": 7,
        "b5": 7,
        "d1": 7,
        "d2": 10,
        "d3": 3,
        "d4": 10,
        "d5": 8
    },
    {
        "seq": 4,
        "c1": 4,
        "c2": 5,
        "c3": 4,
        "c4": 4,
        "c5": 4,
        "a1": 4,
        "a2": 5,
        "a3": 4,
        "a4": 4,
        "a5": 4,
        "b1": 3,
        "b2": 3,
        "b3": 3,
        "b4": 3,
        "b5": 3,
        "d1": 1,
        "d2": 5,
        "d3": 1,
        "d4": 1,
        "d5": 1
    },
    {
        "seq": 5,
        "c1": 8,
        "c2": 4,
        "c3": 10,
        "c4": 6,
        "c5": 4,
        "a1": 8,
        "a2": 8,
        "a3": 8,
        "a4": 8,
        "a5": 8,
        "b1": 5,
        "b2": 5,
        "b3": 5,
        "b4": 5,
        "b5": 5,
        "d1": 9,
        "d2": 10,
        "d3": 8,
        "d4": 10,
        "d5": 10
    },
    {
        "seq": 6,
        "c1": 8,
        "c2": 7,
        "c3": 5,
        "c4": 5,
        "c5": 5,
        "a1": 9,
        "a2": 8,
        "a3": 8,
        "a4": 6,
        "a5": 8,
        "b1": 10,
        "b2": 10,
        "b3": 10,
        "b4": 10,
        "b5": 10,
        "d1": 5,
        "d2": 5,
        "d3": 5,
        "d4": 5,
        "d5": 5
    },
    {
        "seq": 7,
        "c1": 9,
        "c2": 10,
        "c3": 9,
        "c4": 8,
        "c5": 8,
        "a1": 6,
        "a2": 6,
        "a3": 5,
        "a4": 6,
        "a5": 6,
        "b1": 7,
        "b2": 7,
        "b3": 7,
        "b4": 7,
        "b5": 7,
        "d1": 8,
        "d2": 8,
        "d3": 8,
        "d4": 8,
        "d5": 8
    },
    {
        "seq": 8,
        "c1": 10,
        "c2": 10,
        "c3": 10,
        "c4": 10,
        "c5": 10,
        "a1": 1,
        "a2": 1,
        "a3": 1,
        "a4": 1,
        "a5": 1,
        "b1": 3,
        "b2": 3,
        "b3": 3,
        "b4": 2,
        "b5": 1,
        "d1": 1,
        "d2": 1,
        "d3": 1,
        "d4": 1,
        "d5": 1
    },
    {
        "seq": 9,
        "c1": 8,
        "c2": 8,
        "c3": 8,
        "c4": 8,
        "c5": 6,
        "a1": 6,
        "a2": 9,
        "a3": 5,
        "a4": 8,
        "a5": 8,
        "b1": 7,
        "b2": 7,
        "b3": 6,
        "b4": 7,
        "b5": 7,
        "d1": 8,
        "d2": 8,
        "d3": 8,
        "d4": 9,
        "d5": 7
    },
    {
        "seq": 10,
        "c1": 8,
        "c2": 8,
        "c3": 9,
        "c4": 8,
        "c5": 7,
        "a1": 5,
        "a2": 5,
        "a3": 4,
        "a4": 5,
        "a5": 5,
        "b1": 6,
        "b2": 6,
        "b3": 6,
        "b4": 6,
        "b5": 6,
        "d1": 5,
        "d2": 5,
        "d3": 5,
        "d4": 5,
        "d5": 5
    },
    {
        "seq": 11,
        "c1": 6,
        "c2": 6,
        "c3": 6,
        "c4": 6,
        "c5": 6,
        "a1": 6,
        "a2": 4,
        "a3": 8,
        "a4": 5,
        "a5": 2,
        "b1": 1,
        "b2": 1,
        "b3": 1,
        "b4": 1,
        "b5": 1,
        "d1": 1,
        "d2": 1,
        "d3": 1,
        "d4": 1,
        "d5": 1
    }
]


function averageData(data){
  // new empty array to be filled
  // with data in new structure
  let newData = [];
  // assuming each data point has the same
  // keys/categories, we extract an array of them from the
  // first data point in the array
  // in class we changed it to the last element instead
  // as the first one did not have all the categories filled out
  // there is more thorough ways to do this, but for out purposes
  // now, this will be enough
  let keys = Object.keys(data[0]);
  // now we loop over the keys/categories
  for(let i = 0; i < keys.length; i++){
    // store the current key/category in
    // a variable:
    let key = keys[i];
    // now we will loop over each data point
    // in the data set, check if it has a value
    // for the key/category and add them to
    // a total sum variable
    // as well as count the occurences in order to
    // calulate the averae in the end
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      // check if the key exists
      // for this datapoint
      if(key in datum){
        // add to sum
        sum += datum[key];
        // increase count
        num++;
      }
    }
    // now calculate the average
    let avg = sum/num;
    // make sure the value is a number
    // (some value might be strings)
    if(!isNaN(avg)){
      // create an object with both the average
      // and also the number of measurements that
      // went into the average
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      // add the new datapoint to the new data array
      newData.push(newDataPoint);
    }
  }
  // return everything when it is done
  return newData;
}


let transformedData = averageData(data);

console.log(transformedData);

for(let i =1; i+5<=transformedData.length; i = i +5){
  let datapoint = transformedData[i];
  let average = datapoint.average;


  let bar = document.createElement("div");
  bar.className = "bar";
  bar.style.width = (average * 100) + "px";

  let barname = document.createElement("p");
  barname.innerHTML = average;
  bar.appendChild(barname);
  document.body.appendChild(bar);
}
