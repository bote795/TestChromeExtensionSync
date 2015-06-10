chrome.storage.onChanged.addListener(function(changes, namespace) {
  localStorage["Tasks"]=JSON.stringify(changes.data.newValue);
  for (key in changes) {
    var storageChange = changes[key];
    alert('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});