/*===============*/  
/*== FROM BLOCK ==*/
/*===============*/

const nameField = document.querySelector('.name_field')
const btn = document.querySelector('.btn');

// validate name field
nameField.addEventListener('input', function(el) {
	this.value = this.value.replace(/[0-9\\/^$.|?*+\-_()]/g, "");
})

btn.addEventListener('click', function(e) {

	var options = document.getElementsByClassName('check');

	// validate checkboxes
	if(options[0].checked==false && options[1].checked==false && options[2].checked==false) {
			alert('Please check at least one of the options.');
			e.preventDefault();
	}

})

/*===============*/  
/*== API BLOCK ==*/
/*===============*/ 

const _apiBase = 'https://jsonplaceholder.typicode.com/posts';

getResource = async (url) => {
	const res = await fetch(`${url}`);

	if (!res.ok) {
		throw new Error(`Could not fetch ${url}` +
			`, received ${res.status}`)
	}
	return await res.json();
};

getAllData = async () => {
	const res = await getResource(_apiBase);
	return res;
};


const addElement = (userId, id, title, body) => { 
	// create a new div element 
	const newDiv = document.createElement("div"); 
	newDiv.classList.add('wr_elem');
	// user id span
	const spanUserId = document.createElement('span');
	spanUserId.classList.add('user_id') 
	spanUserId.innerHTML = `User ID: ${userId}`;
	// id span
	const postId = document.createElement('span');
	postId.classList.add('elem_id') 
	postId.innerHTML = `Post id: ${id}`;
	// user id span
	const postTitle = document.createElement('h4');
	postTitle.classList.add('post_title') 
	postTitle.innerHTML = title;
	// user id span
	const postDescr = document.createElement('div');
	postDescr.classList.add('post_descr') 
	postDescr.innerHTML = body;

	// add new content to our div
	newDiv.appendChild(spanUserId);    
	newDiv.appendChild(postId);    
	newDiv.appendChild(postTitle);    
	newDiv.appendChild(postDescr);    
	
	return newDiv;
}

getAllData()
	.then((items) => {
		items.forEach((item) => {
			const { userId, id, title, body } = item;
			document.getElementById('app').appendChild(addElement(userId, id, title, body))
		})
	})
	.catch((err) => {
		alert(err);
	})