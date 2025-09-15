async function loadJsonData() {
  try {
    const response = await fetch('songList.json'); // Replace with your file path
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    songs = data
    console.log(data); // Your JSON data as a JavaScript object
} catch (error) {
    console.error('Error loading JSON:', error);
}
}
let songs = {}
loadJsonData();
setTimeout(createList(),100)