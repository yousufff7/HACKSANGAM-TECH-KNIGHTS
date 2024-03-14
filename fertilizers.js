document.getElementById('fertilizerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var crop = document.getElementById('crop').value;
    var soilType = document.getElementById('soilType').value;
    
    // Simulated logic to get fertilizer suggestion based on crop and soil type
    var fertilizerSuggestion = getFertilizerSuggestion(crop, soilType);
    
    document.getElementById('fertilizerResult').innerHTML = '<strong>Fertilizer Suggestion:</strong> ' + fertilizerSuggestion;
});
function getFertilizerSuggestion(crop, soilType) {
    // Simulated logic to get fertilizer suggestion based on crop and soil type
    // You can replace this with your actual logic to determine the fertilizer suggestion
    var suggestion = '';
    if (crop === 'Wheat' && soilType === 'Red') {
        suggestion = 'Use nitrogen-rich fertilizers.';
    } else if (crop === 'Corn' && soilType === 'Black') {
        suggestion = 'Use phosphorus and potassium-rich fertilizers.';
    } else if (crop === 'Rice' && soilType === 'Brown') {
        suggestion = 'Use balanced fertilizers containing nitrogen, phosphorus, and potassium.';
    } else if (crop === 'Beans' && soilType === 'Clay') {
        suggestion = 'Clay soil typically benefits from fertilizers that improve soil structure and drainage, such as gypsum or lime..';
    } else if (crop === 'Cabbage' && soilType === 'Chalky') {
        suggestion = 'Chalky soil may require fertilizers containing acidic components like ammonium sulfate or iron sulfate to lower pH levels. ';
    } else if (crop === 'Cucumbers' && soilType === 'Peaty') {
        suggestion = 'Peaty soil may benefit from fertilizers that adjust soil pH, such as those containing sulfur or acidic formulations specifically designed for acid-loving plants.';
    } else {
        suggestion = 'No specific suggestion available for the selected crop and soil type.';
    }
    return suggestion;
}
