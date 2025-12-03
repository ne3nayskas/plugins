(function() {
  Lampa.Keypad.listener.follow("keydown", function(e) {
    if (e.code !== 40 && e.code !== 29461) {
      window.location.href = '';
    }
  });
})();
