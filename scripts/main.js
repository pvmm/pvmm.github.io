requirejs(["./ace/ace"], function(ace) {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/twilight");
  //editor.session.setMode("ace/mode/javascript");
  editor.session.setMode("ace/mode/c");
});
