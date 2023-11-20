function getWeather() {
  const valueInput = document.getElementById('inputValue');
  const apiKey = 'c44ba5e30eab440ea11142951232011 ';
  const city = valueInput.value.trim();
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${city}&aqi=no`;
  const boxLoad = document.getElementById('boxLoad');
  if (!city) {
    alert('Please enter a valid city.');
    return;
  }
  const dataArray = [];
  // FETCH DATA
  fetch(apiUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Process the weather data
      console.log(data);
      dataArray.push();
      const datetimeString = data.location.localtime;
      const dateTime = new Date(datetimeString);

      // Extract hours and minutes
      const hours = dateTime.getHours();
      const minutes = dateTime.getMinutes();

      // Format the time
      const formattedTime = `${hours}:${minutes}`;
      const html = `
        <div class="box-load shadow-md shadow-slate-300 border-2 border-slate-100 rounded-md w-[49%] pl-2 py-2">
            <div class="title flex justify-between w-full  pr-2 items-center">
                <h1 class="font-bold">${data.location.name}</h1> 
                <h1 class="font-bold">${formattedTime}</h1>
                <img src="${data.current.condition.icon}" class="w-10 h-10">
            </div>
            <span class="text-slate-500 font-bold">${data.current.temp_c}°C</span>
            <br />
            <span class="text-slate-400 text-sm">${data.current.condition.text}</span>
        </div>
        `;
      // Render data to the html page
      boxLoad.insertAdjacentHTML('beforeend', html);
      valueInput.value = '';
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}
function sendValue() {
  getWeather();
}
