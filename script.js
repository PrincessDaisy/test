
window.onload = function(){
	document.getElementById('form_search').addEventListener("submit", function(e){
		var searchVal = document.getElementById('search').value;
		document.getElementById('more').style.display = "inline-block"
		e.preventDefault();
		document.getElementsByClassName('photo-list')[0].innerHTML = '';
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function (data) {
			if (this.readyState === 4) {
				if (this.status === 200) {
					document.body.className = 'ok';
					data = JSON.parse(this.responseText);
				}
			}

			if (data.total > 0) { 
				var responseLength = data.results.length; 
				for (var i = 0; i < responseLength; ++i) {
					var b = document.createElement("a");
					var img = document.createElement("img");
					img.src = ""+data.results[i].urls.small+"";
					b.className = 'link slide-in-elliptic-top-fwd';
					b.href = "photo_page?id="+data.results[i].id+"";
					document.getElementsByClassName('photo-list')[0].appendChild(b)[i];
					document.getElementsByClassName('link')[i].appendChild(img)[i];
				}
			}
		};
		xhr.open("GET", 'https://api.unsplash.com/search/photos/?client_id=539a243d3ccefd20c8def536a22699cc55608b6e0ce6db506b2be577682ed2ef&query='+searchVal+'', true);
		xhr.send(null);
	});

	var page = 1;
	document.getElementById('more').addEventListener("click", function(e){
		var searchVal = document.getElementById('search').value;
		e.preventDefault();
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function (data) {
			if (this.readyState === 4) {
				if (this.status === 200) {
					document.body.className = 'ok';
					data = JSON.parse(this.responseText);
				}
			}
			if (data.total > 0) { 
				var responseLength = data.results.length; 
				for (var i = 0; i < responseLength; ++i) {
					var b = document.createElement("a");
					var img = document.createElement("img");
					img.src = ""+data.results[i].urls.small+"";
					b.className = 'link slide-in-elliptic-top-fwd';
					b.href = "photo_page?id="+data.results[i].id+"";
					document.getElementsByClassName('photo-list')[0].appendChild(b)[i];
					document.getElementsByClassName('link')[(page - 1) * responseLength - 1  + i].appendChild(img)[i];
				}
			}
		};
		page += 1;
		xhr.open("GET", 'https://api.unsplash.com/search/photos/?client_id=539a243d3ccefd20c8def536a22699cc55608b6e0ce6db506b2be577682ed2ef&query='+searchVal+'&page='+page+'', true);
		xhr.send(null);
	});
}




