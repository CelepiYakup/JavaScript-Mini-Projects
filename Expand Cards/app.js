const panels = document.querySelectorAll(".panel");

panels.forEach(panel => {

  panel.addEventListener("click", () => {

    removeFirst();
    panel.classList.add("first");

  });

})

function removeFirst() {

  panels.forEach(panel => {

    panel.classList.remove("first");

  })

}
