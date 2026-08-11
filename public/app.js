
document.body.addEventListener("htmx:afterRequest", (event) => {
  if (


    event.detail.successful &&
    event.detail.requestConfig.verb === "post"
  ) {
    const form = document.querySelector("#listing-form");
    form?.reset();
    document.querySelector("#organization")?.focus();
  }

});
