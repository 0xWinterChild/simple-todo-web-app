const createTodoItem = (value) => {
    let listItem = document.createElement("li");
    listItem.textContent = localStorage.getItem(value);

    let removeButton = document.createElement("button");
    removeButton.textContent = "x";
    removeButton.addEventListener("click", (event) => {
        event.stopPropagation();
        let itemContainer = event.target.parentNode;
        localStorage.removeItem(listItem.textContent);
        itemContainer.remove();
    });

    let itemContainer = document.createElement("div");
    itemContainer .style.display = "flex";
    itemContainer.appendChild(listItem);
    itemContainer.appendChild(removeButton);

    todoList.appendChild(itemContainer);
}

const form = document.querySelector("form");
const todoList = document.querySelector("ul");
const taskDescription = document.querySelector("#taskDescription");
Object.keys(localStorage).forEach(key => {
    createTodoItem(key);
});



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const value = taskDescription.value;
    localStorage.setItem(value, value);

    createTodoItem(value);

    taskDescription.value = '';
    taskDescription.focus();
});