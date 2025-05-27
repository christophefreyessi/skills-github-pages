  function loadBlogLinksToMenu(containerId, indexFile = 'blogs/index.json', folderPath = 'blogs/') {
	fetch(indexFile)
		.then(response => {
		  if (!response.ok) throw new Error(`HTTP error ${response.status}`);
		  return response.json();
		})
		.then(items => {
		  const list = document.getElementById(containerId);
		  if (!list) {
			console.error(`Element with id "${containerId}" not found.`);
			return;
		  }
		const menu = document.getElementById("blogMenu");	
		  // Sort by date (newest to oldest)
		  items.sort((a, b) => new Date(b.date) - new Date(a.date));

		  items.forEach(item => {
			if (!item.file || !item.title || !item.date) {
			  console.warn('Invalid item format:', item);
			  return;
			}

			//const li = document.createElement('li');
			const a = document.createElement('a');
			a.href = folderPath + item.file;
			a.textContent = item.title;
			//li.appendChild(a);
			console.info("menu list loaded");
			menu.appendChild(a);
		  });
		})
		.catch(error => {
		  console.error('Error loading blog list:', error);
		});
 }
