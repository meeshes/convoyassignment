var limit = 10000;
var PAGE_LIMIT = 100;
var num_pages = Math.ceil(limit/PAGE_LIMIT);
var cur_page_num = 1;
json_array = [];

var sorting_array = [[false, sort_miles_asc, sort_miles_desc], [false, sort_origin_city_asc, sort_origin_city_desc], [false, sort_origin_state_asc, sort_origin_state_desc],
 [true, sort_pickup_start_asc, sort_pickup_start_desc], [false, sort_pickup_end_asc, sort_pickup_end_desc], [false, sort_destination_city_asc, sort_destination_city_desc],
 [false, sort_destination_state_asc, sort_destination_state_desc], [false, sort_dropoff_start_asc, sort_dropoff_start_desc], [false, sort_dropoff_end_asc, sort_dropoff_end_desc],
 [false, sort_offer_asc, sort_offer_desc]];
$(document).ready(function(){
	remove_nav_divs();
	hide_show_buttons();
	var json_url = "https://convoy-frontend-homework-api.herokuapp.com/offers?limit=" + limit;
    $.get( json_url, function( data ) {
		$(data).each(function(index){
			var obj = data[index];
			json_array[index] = obj;
		});
		if(limit > json_array.length){
			limit = json_array.length;
			num_pages = Math.ceil(limit/PAGE_LIMIT);
			remove_nav_divs();
		}
		var header = document.getElementById("page_nav_text");
		header.innerHTML = "Page " + cur_page_num + " of " + num_pages;
		json_array.sort(sort_pickup_start_asc);
		var row_max = PAGE_LIMIT < limit ? PAGE_LIMIT : limit;
		for(var i = 0; i < row_max; i++){
			insert_row(json_array[i], i);
		}
	});
});

function insert_row(json_obj, index){
	var table = document.getElementById("offer_table");
	var row = table.insertRow();
	var cell = row.insertCell();
	cell.innerHTML = index + 1;
	cell = row.insertCell();
	cell.innerHTML = json_obj.miles;
	cell = row.insertCell();
	cell.innerHTML = json_obj.origin.city;
	cell = row.insertCell();
	cell.innerHTML = json_obj.origin.state;
	cell = row.insertCell();
	cell.innerHTML = json_obj.origin.pickup.start;
	cell = row.insertCell();
	cell.innerHTML = json_obj.origin.pickup.end;
	cell = row.insertCell();
	cell.innerHTML = json_obj.destination.city;
	cell = row.insertCell();
	cell.innerHTML = json_obj.destination.state;
	cell = row.insertCell();
	cell.innerHTML = json_obj.destination.dropoff.start;
	cell = row.insertCell();
	cell.innerHTML = json_obj.destination.dropoff.end;
	cell = row.insertCell();
	cell.innerHTML = "$" + (json_obj.offer).toFixed(2);
}

//sorting functions
//miles
function sort_miles_asc(a, b){
	return parseFloat(a.miles) - parseFloat(b.miles);
}

function sort_miles_desc(a, b){
	return parseFloat(b.miles) - parseFloat(a.miles);
}

//offers
function sort_offer_asc(a, b){
	return parseFloat(a.offer) - parseFloat(b.offer);
}

function sort_offer_desc(a, b){
	return parseFloat(b.offer) - parseFloat(a.offer);
}

//origins state
function sort_origin_state_asc(a, b){
	return a.origin.state.localeCompare(b.origin.state);
}

function sort_origin_state_desc(a, b){
	return b.origin.state.localeCompare(a.origin.state);
}

//origin city
function sort_origin_city_asc(a, b){
	return a.origin.city.localeCompare(b.origin.city);
}

function sort_origin_city_desc(a, b){
	return b.origin.city.localeCompare(a.origin.city);
}

//destination state
function sort_destination_state_asc(a, b){
	return a.destination.state.localeCompare(b.destination.state);
}

function sort_destination_state_desc(a, b){
	return b.destination.state.localeCompare(a.destination.state);
}

//destination city
function sort_destination_city_asc(a, b){
	return a.destination.city.localeCompare(b.destination.city);
}

function sort_destination_city_desc(a, b){
	return b.destination.city.localeCompare(a.destination.city);
}

//pickup dates
function sort_pickup_start_desc(a, b){
	var date_a = new Date(a.origin.pickup.start);
	var date_b = new Date(b.origin.pickup.start);
	return date_a - date_b;
}

function sort_pickup_start_asc(a, b){
	var date_a = new Date(a.origin.pickup.start);
	var date_b = new Date(b.origin.pickup.start);
	return date_b - date_a;
}

function sort_pickup_end_desc(a, b){
	var date_a = new Date(a.origin.pickup.end);
	var date_b = new Date(b.origin.pickup.end);
	return date_a - date_b;
}

function sort_pickup_end_asc(a, b){
	var date_a = new Date(a.origin.pickup.end);
	var date_b = new Date(b.origin.pickup.end);
	return date_b - date_a;
}

//dropoff dates
function sort_dropoff_start_desc(a, b){
	var date_a = new Date(a.destination.dropoff.start);
	var date_b = new Date(b.destination.dropoff.start);
	return date_a - date_b;
}

function sort_dropoff_start_asc(a, b){
	var date_a = new Date(a.destination.dropoff.start);
	var date_b = new Date(b.destination.dropoff.start);
	return date_b - date_a;
}

function sort_dropoff_end_desc(a, b){
	var date_a = new Date(a.destination.dropoff.end);
	var date_b = new Date(b.destination.dropoff.end);
	return date_a - date_b;
}

function sort_dropoff_end_asc(a, b){
	var date_a = new Date(a.destination.dropoff.end);
	var date_b = new Date(b.destination.dropoff.end);
	return date_b - date_a;
}

function sort_table(index){
	sorting_array[index][0] = !sorting_array[index][0];
	var ascending = sorting_array[index][0];
	if(ascending){
		json_array.sort(sorting_array[index][1]);
	} else {
		json_array.sort(sorting_array[index][2]);
	}
	fill_table();
}

function hide_show_buttons(){
	hide_show_prev_button();
	hide_show_next_button();
}

function hide_show_prev_button(){
	if(cur_page_num == 1){
		var prev_button = document.getElementById("prev_button");
		prev_button.style.visibility = "hidden";
	} else if(cur_page_num > 1){
		var prev_button = document.getElementById("prev_button");
		prev_button.style.visibility = "";
	}	
}

function hide_show_next_button(){
	if(cur_page_num == num_pages){
		var next_button = document.getElementById("next_button");
		next_button.style.visibility = "hidden";
	} else if(cur_page_num < num_pages){
		var next_button = document.getElementById("next_button");
		next_button.style.visibility = "";
	}
}

function prev_page(){
	if(cur_page_num > 1){
		cur_page_num--;
	}
	hide_show_buttons();
	fill_table();
}

function next_page(){
	if(cur_page_num < num_pages){
		cur_page_num++;
	}
	hide_show_buttons();
	fill_table();
}
		
function fill_table(){
	set_up_numbers();
	var table = document.getElementById("offer_table");
	var row_max = (PAGE_LIMIT * cur_page_num) < limit ? PAGE_LIMIT : (limit - ((cur_page_num - 1) * PAGE_LIMIT));
	var json_index;
	var row_index;
	for(row_index = 1; row_index <= row_max; row_index++){
		json_index = (row_index - 1) + ((cur_page_num - 1) * PAGE_LIMIT);
		table.rows[row_index].style.visibility = "";
		table.rows[row_index].cells[0].innerHTML = json_index + 1;
		table.rows[row_index].cells[1].innerHTML = json_array[json_index].miles;
		table.rows[row_index].cells[2].innerHTML = json_array[json_index].origin.city;
		table.rows[row_index].cells[3].innerHTML = json_array[json_index].origin.state;
		table.rows[row_index].cells[4].innerHTML = json_array[json_index].origin.pickup.start;
		table.rows[row_index].cells[5].innerHTML = json_array[json_index].origin.pickup.end;
		table.rows[row_index].cells[6].innerHTML = json_array[json_index].destination.city;
		table.rows[row_index].cells[7].innerHTML = json_array[json_index].destination.state;
		table.rows[row_index].cells[8].innerHTML = json_array[json_index].destination.dropoff.start;
		table.rows[row_index].cells[9].innerHTML = json_array[json_index].destination.dropoff.end;
		table.rows[row_index].cells[10].innerHTML = "$" + (json_array[json_index].offer).toFixed(2);
	}
	
	//hide rows if needed
	if(row_index < PAGE_LIMIT){
		for(row_index; row_index <= PAGE_LIMIT; row_index++){
			table.rows[row_index].style.visibility = "hidden";
		}
	}
	var header = document.getElementById("page_nav_text");
	header.innerHTML = "Page " + cur_page_num + " of " + num_pages;
}

function nav_button_press(num){
	var div = document.getElementById("nav_button_" + num);
	cur_page_num = div.innerHTML;
	hide_show_buttons();
	fill_table();
}

function remove_nav_divs(){
	for(var i = 10; i > 0; i--){
		if(num_pages < i){
			var div = document.getElementById("nav_button_" + i);
			div.remove();
		}
	}
}

function set_up_numbers(){
	var start;
	if(num_pages <= 10){
		return;
	}
	//set numbers
	if(cur_page_num > (num_pages - 4)){
		start = num_pages - 9;
	} else if (cur_page_num <= 5) {
		start = 1;
	} else {
		start = cur_page_num - 5; 
	}
	var cur = start;
	for(var i = 1; i <= 10; i++){
		var nav_button = document.getElementById("nav_button_" + i);
		nav_button.innerText = cur;
		if(cur == cur_page_num){
			nav_button.style.color = "black";
		} else {
			nav_button.style.color = "white";
		}
		cur++;
	}
}