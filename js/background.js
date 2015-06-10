chrome.storage.onChanged.addListener(function(changes, namespace) {
  localStorage["Tasks"]=JSON.stringify(changes.data.newValue);
  populateTable();
});