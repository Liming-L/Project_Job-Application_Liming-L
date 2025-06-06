let data, info, output;

async function init(){
  let link = "https://data.cityofnewyork.us/resource/ic3t-wcy2.json?$limit=100";
  info = await fetch(link);
  data = await info.json();
  console.log(data);
  output = document.getElementById("output");
  output2 = document.getElementById("output2");
  let build = "";
  
  for(let i = 0; i < data.length; i++){
    let jobs = data[i];
	let lat=jobs.gis_latitude
	let lon=jobs.gis_longitude
    build += `<div class="card2">`;
    build += `		<h4>Applicant's name: ${jobs.applicant_s_first_name} ${jobs.applicant_s_last_name}</h4>`;
	build += `		<p>Owner's name: ${jobs.owner_s_first_name} ${jobs.owner_s_last_name}</p>`;
	build += `		<p>Partnership status: ${jobs.owner_type}</p>`;
	build += `		<p>Job's borough: ${jobs.borough}</p>`;
	build += `		<p>Job's status: ${jobs.job_status_descrp}</p>`;
	build += `		<p>Latitude and Longitude: ${jobs.gis_latitude}, ${jobs.gis_longitude}</p>`;
	if(lat && lon){
        build += `<input type='button' value='Map' onclick="showMap(${lat},${lon})">`;
    }
    build += `</div>`;
  }
  output2.innerHTML = build;
  
}

function searchbyBorough(){
  //Challenge 5: Create and initialize variables to keep a count of accidents by borough
  let bk = 0, q = 0, s = 0, m = 0, bx = 0;
  
  //Challenge 6: Traverse the data and use decisions to determine which count variable to increase.
  for(let i = 0; i < data.length; i++){
    let borough = data[i];
    if(borough.borough == "QUEENS"){
      q++;
    }else if(borough.borough == "MANHATTAN"){
      m++;
    }else if(borough.borough == "BROOKLYN"){
      bk++;
    }else if(borough.borough == "BRONX"){
      bx++;
    }else if(borough.borough == "STATEN ISLAND"){
      s++;
    }
  }
  //Challenge 7: Build the data structure required for charts (an array of arrays with the first position in each array representing the data label)
  let chartData = [
    ["QUEENS", q],
    ["MANHATTAN", m],
    ["BROOKLYN", bk],
    ["BRONX", bx],
    ["STATEN ISLAND", s]
  ];
  
  //Challenge 8: Retrieve the type of chart from the user's selection in the drop down box.
  let chartType = document.getElementById("chartType").value;
  
  //Challenge 9: Display the chart
  displayChart(chartData,"output",chartType);
}



function searchbyPartner(){

  let p=0,id=0;
  
  for(let i = 0; i < data.length; i++){
    let type = data[i];
    if(type.owner_type == "PARTNERSHIP"){
      p++;
    }else if(type.owner_type == "INDIVIDUAL")
      id++;
 
  }
   let chartData = [
    ["Partnership", p],
    ["Individual", id],
  ];
  
  let chartType = document.getElementById("chartType").value;
  
  displayChart(chartData,"output",chartType);
}


//Function that accepts the data, an id to the div to display the chart and the type of chart
function displayChart( data, id, type ){
  let chart = c3.generate({
    bindto: '#' + id,
    data: {
      columns: data,
      type:type
    }
  });
}

function searchBorough(){
  let boro = document.getElementById("borough").value;
  let build = "";
  
  for(let i = 0; i < data.length; i++){
    let jobs = data[i];
	let lat=jobs.gis_latitude
	let lon=jobs.gis_longitude
	if (jobs.borough == boro){		
		build += `<div class="card2">`;
		build += `		<h4>Applicant's name: ${jobs.	applicant_s_first_name} ${jobs.applicant_s_last_name}</h4>`;
		build += `		<p>Owner's name: ${jobs.owner_s_first_name} ${jobs.owner_s_last_name}</p>`;
		build += `		<p>Partnership status: ${jobs.owner_type}</p>`;
		build += `		<p>Job's borough: ${jobs.borough}</p>`;
		build += `		<p>Job's status: ${jobs.job_status_descrp}</p>`;
		build += `		<p>Latitude and Longitude: ${jobs.gis_latitude}, ${jobs.gis_longitude}</p>`;
		if(lat && lon){
        build += `<input type='button' value='Map' onclick="showMap(${lat},${lon})">`;
    }
		build += `</div>`;
	}
  }
  output2.innerHTML = build;  
}

function searchPartner(){
  let part = document.getElementById("partner").value;
  let build = "";
  
  for(let i = 0; i < data.length; i++){
    let jobs = data[i];
	let lat=jobs.gis_latitude
	let lon=jobs.gis_longitude
	if (jobs.owner_type == part){		
		build += `<div class="card2">`;
		build += `		<h4>Applicant's name: ${jobs.	applicant_s_first_name} ${jobs.applicant_s_last_name}</h4>`;
		build += `		<p>Owner's name: ${jobs.owner_s_first_name} ${jobs.owner_s_last_name}</p>`;
		build += `		<p>Partnership status: ${jobs.owner_type}</p>`;
		build += `		<p>Job's borough: ${jobs.borough}</p>`;
		build += `		<p>Job's status: ${jobs.job_status_descrp}</p>`;
		build += `		<p>Latitude and Longitude: ${jobs.gis_latitude}, ${jobs.gis_longitude}</p>`;
		if(lat && lon){
        build += `<input type='button' value='Map' onclick="showMap(${lat},${lon})">`;
    }
		build += `</div>`;
	}
  }
  output2.innerHTML = build;  
}

//showMap() displays the map
function showMap(lat,lon){
  let location = [lat, lon];
  // Line below needed to clear existing map object
  if (map) {
    map.remove();
  }
  // draws map at specified zoom level
  map = L.map("map").setView(location, 14);

  const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
  }).addTo(map);

  let marker = L.marker(location).addTo(map);// places marker on map center (not reqd)
}     

function init1(){

    //let gallery = new Gallery( avengers );>
    
    let avengers = ["pic1.jpg","pic3.jpg","pic4.webp","pic5.webp"];
    
	let gallery = new Gallery( avengers );
	gallery.render("gallery1");
	 //Add the autoplay feature to the gallery.
	gallery.play();
}