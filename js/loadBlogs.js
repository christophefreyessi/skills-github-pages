function loadBlogLinks(containerId, indexFile = 'blogs/index.json', folderPath = 'blogs/') {
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

      // Sort by date (newest to oldest)
      items.sort((a, b) => new Date(b.date) - new Date(a.date));

      items.forEach(item => {
        if (!item.file || !item.title || !item.date) {
          console.warn('Invalid item format:', item);
          return;
        }

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = folderPath + item.file;
        a.textContent = item.title;

        const dateObj = new Date(item.date);
        const formattedDate = dateObj.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });

        const dateSpan = document.createElement('span');
        dateSpan.textContent = ` ${formattedDate}`;
        dateSpan.style.marginLeft = '8px';
        dateSpan.style.fontSize = '90%';
        dateSpan.style.color = 'grey';

        li.appendChild(a);
        li.appendChild(dateSpan);
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Error loading blog list:', error);
    });
}
