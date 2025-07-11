$(document).ready(function () {
  $("#form-tarefa").on("submit", function (e) {
    e.preventDefault();
    const tarefa = $("#nome-tarefa").val();

    if (tarefa) {
      const novaTarefa = $(
        `<li>
          <span class="check-icon"></span>
          <span>${tarefa}</span>
        </li>`
      );

      $("#lista-tarefas").append(novaTarefa);
      $("#nome-tarefa").val("");
    }
  });

  $("#lista-tarefas").on("click", "li", function () {
    $(this).toggleClass("completed");
  });
});