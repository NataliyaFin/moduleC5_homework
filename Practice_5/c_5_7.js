const btn = document.querySelector('.btn');
const resultNode = document.querySelector('.result');

document.addEventListener("DOMContentLoaded", () => {
  let storageItem = localStorage.getItem('lastResponse');
  if (storageItem) {
      showResult(JSON.parse(storageItem));
  }
});

// Функция, которая возвращает fetch
const useRequest = (page, limit) => {
  return fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`)
  .then(response => response.json())
  .catch(() => {
      console.log('error');
      resultNode.innerHTML = '<p> Что-то пошло не так</p>'
  });
}

function showResult(apiData) {
  let cards = '';

  apiData.forEach(item => {
      const cardBlock = `
        <div class="card">
          <img class="card-image" src="${item.download_url}" alt="image">
          <p>${item.author}</p>
        </div>
      `;
      cards += cardBlock;
  });

  resultNode.innerHTML = cards;
//   resultNode.style.display = 'flex';
}

  // Вешаем обработчик на кнопку для запроса
  btn.addEventListener('click', async () => {
    const inputPage = document.querySelector('#page').value;
    const inputLimit = document.querySelector('#limit').value;
    if ((inputPage < 1 || inputPage > 10 || isNaN(inputPage)) && (inputLimit < 10 || inputLimit > 10 || isNaN(inputLimit))) {
        resultNode.innerHTML = '<p> Номер страницы и лимит вне диапазона от 1 до 10</p>';
    } else if (inputPage < 1 || inputPage > 10 || isNaN(inputPage)) {
        resultNode.innerHTML = '<p> Номер страницы вне диапазона от 1 до 10</p>';
    } else if (inputLimit < 1 || inputLimit > 10 || isNaN(inputLimit)) {
        resultNode.innerHTML = '<p> Лимит вне диапазона от 1 до 10</p>';
    } else {
      const requestResult = await useRequest(inputPage, inputLimit);
      localStorage.setItem('lastResponse', JSON.stringify(requestResult));
      showResult(requestResult);
    }
  })
  