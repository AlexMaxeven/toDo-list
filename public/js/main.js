!function(){const t=document.querySelector("#form"),e=document.querySelector("#taskInput"),n=document.querySelector("#tasksList"),s=document.querySelector("#emptyList");t.addEventListener("submit",(function(t){t.preventDefault();const o=`\n    <li class="list-group__item">                           \n        <h2 class="task__title">${e.value}</h2>\n        <div class="task-item__buttons">\n            <button class="button btn-action active" data-action="done" >Yes</button>\n            <button class="button btn-action pass" data-action="delete" >No</button>\n        </div>\n    </li>`;n.insertAdjacentHTML("beforeend",o),e.value="",e.focus(),n.children.length>1&&s.classList.add("none")})),n.addEventListener("click",(function(t){"delete"===t.target.dataset.action&&(t.target.closest(".list-group__item").remove(),1===n.children.length&&s.classList.remove("none"))})),n.addEventListener("click",(function(t){if("done"!==t.target.dataset.action)return;t.target.closest(".list-group__item").querySelector(".task__title").classList.toggle("task__title--done")}))}();