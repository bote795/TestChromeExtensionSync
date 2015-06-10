chrome.storage.onChanged.addListener(function(changes, namespace) {
  localStorage["Tasks"]=JSON.stringify(changes.data.newValue);
   chrome.runtime.sendMessage({method: "Update"},
        function (response) {
          if (response.status === 200) {
            console.log("sucess");
          }
        });
});