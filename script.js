'use strict';

const btnDelete = document.querySelector('.delete__btn');
const btnCreate = document.querySelector('.create__btn');

const inputArea = document.querySelector('.input__task');
const form = document.querySelector('.form');

const ulForm = document.querySelector('ul');
let listArr;

//change button view
inputArea.addEventListener('keyup', function (e) {
  let task = inputArea.value;
  if (task) {
    btnCreate.classList.add('create__active');
    console.log('ok');
  } else {
    btnCreate.classList.remove('create__active');
    console.log('nie');
  }
});

//button new task
btnCreate.addEventListener('click', function (e) {
  e.preventDefault();
  let task = inputArea.value;
  if (!task) return;
  addNewTask(task);
});

const initTask = function () {
  listArr = getData();
  listArr.forEach(item => {
    displayTask(item);
  });
};

const addNewTask = function (task) {
  displayTask(task);
  listArr.push(task);
  localStorage.setItem('Todo', JSON.stringify(listArr));
  inputArea.value = '';
};

const displayTask = function (task) {
  const html = `<li>${task}<span ><ion-icon name="trash-bin"></ion-icon></span>
  </li>`;
  form.insertAdjacentHTML('afterbegin', html);
};

const getData = function () {
  let task = localStorage.getItem('Todo');
  if (!task) return;
  listArr = JSON.parse(task);
  return listArr;
};

initTask();

//delete task and refresh data

ulForm.addEventListener('click', function (e) {
  if (e.target.name === 'trash-bin') {
    const text = e.target.parentNode.parentNode.innerText;
    const index = listArr.findIndex(item => item === text);
    console.log(index);
    e.target.parentNode.parentNode.remove();
    listArr.splice(index, 1);
    localStorage.setItem('Todo', JSON.stringify(listArr));
  }
});
