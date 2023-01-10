let data = []
async function Getdata(){
  await fetch("https://api.spacexdata.com/v3/launches").then(res => res.json).then(el => data = [...el]);
}
Getdata();

export default data
