document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector("form");
    const todoList = document.querySelector("ul");
    const taskDescription = document.querySelector("#taskDescription");

    // Load existing tasks
    Object.keys(localStorage).forEach(key => {
        createTodoItem(key, localStorage.getItem(key));
    });

    // Add task
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const value = taskDescription.value.trim();
        if (value) {
            localStorage.setItem(value, value);
            createTodoItem(value, value);
            taskDescription.value = '';
        }
        taskDescription.focus();
    });

    // Remove or edit task
    todoList.addEventListener("click", (event) => {
        if (event.target.tagName === 'BUTTON') {
            const itemContainer = event.target.closest("div");
            const key = itemContainer.querySelector("li").getAttribute("data-key");
            localStorage.removeItem(key);
            itemContainer.remove();
        }
    });

    todoList.addEventListener("focusout", (event) => {
        if (event.target.tagName === 'LI') {
            const oldValue = event.target.getAttribute("data-key");
            const newValue = event.target.textContent.trim();
            if (newValue && newValue !== oldValue) {
                localStorage.removeItem(oldValue);
                localStorage.setItem(newValue, newValue);
                event.target.setAttribute("data-key", newValue);
            } else {
                event.target.textContent = oldValue; // Revert changes if new value is empty or unchanged
            }
        }
    }, true);
});

function createTodoItem(key, value) {
    let listItem = document.createElement("li");
    listItem.setAttribute("contentEditable", true);
    listItem.setAttribute("data-key", key);
    listItem.textContent = value;

    let removeButton = document.createElement("button");
    removeButton.textContent = "x";

    let itemContainer = document.createElement("div");
    itemContainer.style.display = "flex";
    itemContainer.appendChild(listItem);
    itemContainer.appendChild(removeButton);

    document.querySelector("ul").appendChild(itemContainer);
}