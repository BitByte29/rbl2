const api_url = "https://rbl2.herokuapp.com/user"
//https://api.thingspeak.com/channels/1699416/feeds.json?results=2
//https://api.thingspeak.com/update?api_key=JC5C7CL4OKTFAOLB&field1=0 



function loadData(records = []){
	var allEle = ""
	for(let i = 0; i < records.length;i++){
		
		allEle += `<div class="portfolio-item">
		<div class="image">
			<img src=../img/port9.jpg alt="">
		</div>
		<div class="hover-items">
			<h3><span>Name:</span> ${records[i].name2}</h3>
			<h3><span>DOJ:</span> ${records[i].date}</h3>
			<h3><span>Checkup:</span> ${records[i].analysis}</h3>
			<div class="icons">
				<a href="dash.html?id=${records[i]._id}" class="icon">
					GO
				</a>
				<button class="delbtn" onclick=deleteData('${records[i]._id}')>Delete</button>

			</div>
		</div>
    </div>`

	}
	document.getElementById("new").innerHTML = allEle;

}

function getData() {
	
    fetch(api_url)
	.then((response) => response.json())
	.then((data) => { 
		console.table(data); 
		loadData(data);
	});
}


//Getting Data with ID
function getDataById(id) {
	fetch(`${api_url}/${id}`)
	.then((response) => response.json())
	.then((data) => { 
		$('#name2').text(data.name2);		
		$('#age').text(data.age);		
		$('#date').text(data.date);		
		$('#analysis').text(data.analysis);	
		GetTableData(data.api);

	})
}


function postData() {
	var name2 = $('#name').val();
	var age = $('#name').val();
	var doj = $('#doj').val();
	var analysis = $('#analysis').value();
	var api = "https://api.thingspeak.com/channels/1699416/feeds.json?results=5"	//Choosing a  default api
	data = {name: name2, age: age, date: doj,api:api,analysis:analysis};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "dash.html";
	})
}	



function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}




// function putData() {    //To change
	
// 	var _id = document.getElementById("id").value;
// 	var name = document.getElementById("name").value;
// 	var age = document.getElementById("age").value;
// 	var city = document.getElementById("city").value;
	
// 	data = {_id: _id, name: name, age: age, city: city};
	
// 	fetch(api_url, {
// 		method: "PUT",
// 		headers: {
// 		  'Accept': 'application/json',
// 		  'Content-Type': 'application/json'
// 		},
// 		body: JSON.stringify(data)
// 	})
// 	.then((response) => response.json())
// 	.then((data) => { 
// 		console.table(data);
// 		window.location.href = "index.html";
// 	})
// }



//Getting a data from axios

    // axios.get('https://api.thingspeak.com/channels/1693012/feeds.json?api_key=YUIIG599P6C50ML9&results=4')
	// .then(data => {
    //     // var all = data.data.feeds;
    //     console.log(data);
	// 	// loadData(all);
    // })
    // .catch(error => {
    //     console.log(error);
    // })