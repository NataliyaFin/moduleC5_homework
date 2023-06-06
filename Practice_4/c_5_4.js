const btn = document.querySelector('.btn');
const resultNode = document.querySelector('.result');

// Функция, которая возвращает fetch
const useRequest = (width, height) => {
  return fetch(`https://picsum.photos/${width}/${height}`)
  .then((response) => {
      return response;
  })
  .then(data => data.url)
  .catch(() => {
      console.log('error');
      resultNode.innerHTML = '<p> Что-то пошло не так</p>'
  });
}
  
  // Вешаем обработчик на кнопку для запроса
  btn.addEventListener('click', async () => {
    const inputWidth = document.querySelector('#width').value;
    const inputHeight = document.querySelector('#height').value;
    if (inputWidth < 100 || inputWidth > 300 || isNaN(inputWidth) || inputHeight < 100 || inputHeight > 300 || isNaN(inputHeight)) {
        resultNode.innerHTML = '<p> Одно из чисел вне диапазона от 100 до 300</p>';
    } else {
      const url = await useRequest(inputWidth, inputHeight);
      resultNode.innerHTML = `
    <img src='${url}' alt='image'>`
    }
  })
  