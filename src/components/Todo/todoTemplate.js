export function getTodoTemplate(data) {
  return `
    <!-- List items should get the class 'editing' when editing and 'completed' when marked as completed -->
    <li data-id="${data.id}" ${data.completed ? "class='completed'" : ""}>
      <div class="view">
        <input 
          class="toggle" 
          type="checkbox" 
          ${data.completed ? "checked='checked'" : ""} 
        />
        <label>${data.content}</label>
        <button class="destroy"></button>
      </div>
      <input class="edit" value="Edit this todo" />
    </li>
  `;
}
