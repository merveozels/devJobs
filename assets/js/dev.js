const cardHtml = document.querySelector('.card-area');
let datas;
const inputHtml = document.querySelector('.input-area');

async function init() {
  
  datas = await fetch('./data.json').then(response => response.json());
  console.log(datas);
  // anasayfaya geri dondurmek 
  const detailSection = document.querySelector('.detail-section');
  detailSection.innerHTML = '';
  cardHtml.classList.remove('none');
  inputHtml.classList.remove('none');
  cardHtml.innerHTML = ''; 
  displayCard(); 
}


function displayCard() {
  for (const data of datas) {
    cardHtml.innerHTML += `
    <div class="card-inner" data-id="${data.id}">
      <img class="card-img" src="${data.logo}" alt="${data.company} logo">
      <p class="card-contract">${data.postedAt}. ${data.contract}</p>
      <p class="card-position">${data.position}</p>
      <span class="card-company">${data.company}</span>
      <span class="card-location">${data.location}</span>
    </div>
    `;
  }

  const cardInner = document.querySelectorAll('.card-inner');
  for (const item of cardInner) {
    item.addEventListener('click', showDetails);
  }
}

function showDetails(event) {
  const cardId = event.currentTarget.getAttribute('data-id');
  const selectedCard = datas.find(item => item.id == cardId);
  if (selectedCard) {
    const detailSection = document.querySelector('.detail-section');
    cardHtml.classList.add('none');
    inputHtml.classList.add('none');
    detailSection.innerHTML = `
    <div class="detailsCard"> 
      <div class="detailsTop">
        <div class="details-left">
          <img class="card-img-top" src="${selectedCard.logo}">
          <div class="details-txt">
            <h3> ${selectedCard.company}</h3>
            <h4>${selectedCard.website}
          </div>
        </div>
      <a href="${selectedCard.website}" target="blank">Company Site</a>
    </div>
      <div class="details-bottom">
      <div class="details-bottom-top"> 
        <div class="text-bottom">
        <p class="bottom-contract">${selectedCard.postedAt}. ${selectedCard.contract}</p>
        <p class="bottom-position">${selectedCard.position}</p>
        <span class="bottom-location">${selectedCard.location}</span>
        </div>
      <a class="applyBtn" href="${selectedCard.apply}" target="blank" >Apply Now</a>
      </div>
      <div class="detail-apply">
      <p class="detail-abouts"> ${selectedCard.description}</p>
      <h5>Requirements</h5>
      <p class="detail-abouts"> ${selectedCard.requirements.content}</p>
      <ul>
      ${selectedCard.requirements.items.map(item => `<li>${item}</li>`).join('')}
     </ul>
    <h5>What You Will Do</h5>
      <p class="detail-abouts"> ${selectedCard.role.content}</p>
      <ul>
      ${selectedCard.role.items.map(item => `<li>${item}</li>`).join('')}
     </ul>
      </div>
      </div>
      <div class="header-bottom">
      <div class="textArea">
        <span class="postionName">${selectedCard.position}</span>
        <span class="companyName">${selectedCard.company}</span>
      </div>
      <a class="applyBtn" href="${selectedCard.apply}" target="blank" >Apply Now</a>
    </div>
    </div>
    `;
  }
}

// checkbox part
const checkBox=document.querySelector('.chekboxFull');
checkBox.addEventListener('change',showFiltered);
function showFiltered(){
  if (checkBox.checked) {
    console.log('Checkbox işaretlendi.');
    cardHtml.innerHTML = '';
    for (const data of datas) {
      if(data.contract === 'Full Time'){
        cardHtml.innerHTML += `
        <div class="card-inner" data-id="${data.id}">
          <img class="card-img" src="${data.logo}" alt="${data.company} logo">
          <p class="card-contract">${data.postedAt}. ${data.contract}</p>
          <p class="card-position">${data.position}</p>
          <span class="card-company">${data.company}</span>
          <span class="card-location">${data.location}</span>
        </div>
        `
      } 
        
    }

  }else {
    cardHtml.innerHTML = '';
    for (const data of datas) {
      cardHtml.innerHTML += `
      <div class="card-inner" data-id="${data.id}">
        <img class="card-img" src="${data.logo}" alt="${data.company} logo">
        <p class="card-contract">${data.postedAt}. ${data.contract}</p>
        <p class="card-position">${data.position}</p>
        <span class="card-company">${data.company}</span>
        <span class="card-location">${data.location}</span>
      </div>
      `;
    }
  }
  const cardInner = document.querySelectorAll('.card-inner');
  for (const item of cardInner) {
    item.addEventListener('click', showDetails);
  }
}

// input filtered
const searchInput = document.querySelector('.filterClass');
searchInput.addEventListener('input', filterData);

const searchLocation =document.querySelector('.filterHarita');
searchLocation.addEventListener('input',filterData);

function filterData() {
  const inputValue = searchInput.value.toLowerCase().trim();
  const locationValue = searchLocation.value.toLowerCase().trim();
  cardHtml.innerHTML = '';

  const filteredData = datas.filter((data) => {
    const matchesSearchInput = 
      data.position.toLowerCase().includes(inputValue) ||
      data.company.toLowerCase().includes(inputValue);
    
    const matchesLocationInput = data.location.toLowerCase().includes(locationValue);

    return matchesSearchInput && matchesLocationInput;
  });

  displayFilteredData(filteredData);
}

function displayFilteredData(filteredData) {
  if (filteredData.length === 0) {
    cardHtml.innerHTML = '<p>No matching results found</p>';
    return;
  }

  for (const data of filteredData) {
    cardHtml.innerHTML += `
      <div class="card-inner" data-id="${data.id}">
        <img class="card-img" src="${data.logo}" alt="${data.company} logo">
        <p class="card-contract">${data.postedAt}. ${data.contract}</p>
        <p class="card-position">${data.position}</p>
        <span class="card-company">${data.company}</span>
        <span class="card-location">${data.location}</span>
      </div>
    `;
  }
  const cardInner = document.querySelectorAll('.card-inner');
  for (const item of cardInner) {
    item.addEventListener('click', showDetails);
  }
}

// anasayfa
document.querySelector('.logo').addEventListener('click', init);


init();

