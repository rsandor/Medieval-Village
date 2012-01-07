(function() {
  var MedievalVillage;
  MedievalVillage = (function() {
    function MedievalVillage() {}
    MedievalVillage.start = function() {
      return console.log("MedievalVillage.start!");
    };
    return MedievalVillage;
  })();
  $(MedievalVillage.start);
}).call(this);
