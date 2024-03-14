
function suggestCrops() {
    const temperature = parseFloat(document.getElementById('temperature').value);
    let suggestion = '';
  
    if (temperature >= 20 && temperature <= 30) {
      suggestion = 'Tomatoes, Peppers, Cucumbers';
    } else if (temperature >= 10 && temperature <= 20) {
      suggestion = 'Carrots, Lettuce, Spinach';
    } else if (temperature >= 30 && temperature <= 40) {
      suggestion = 'Watermelons, Pumpkins, Cantaloupes';
    } else if (temperature >= 40 && temperature < 50) {
      suggestion = 'Zucchini, Squash, Eggplant';
  } else if (temperature >= 5 && temperature < 10) {
      suggestion = 'Broccoli, Cabbage, Cauliflower';
  } else if (temperature < 5 || temperature >= 50) {
      suggestion = 'Kale, Brussels sprouts';
    } else if (temperature >= 40) {
      suggestion = 'Okra, Sweet potatoes, Chilies, Gourds, Malabar spinach';
  } else if (temperature >= 5 && temperature < 10) {
      suggestion = 'Broccoli, Cabbage, Cauliflower, Peas, Brussels sprouts';
  } else if (temperature < 5) {
      suggestion = 'Kale, Parsnips, Turnips, Beets, Collard greens';
    } else {
      suggestion = 'No suggestions for this temperature range';
    }
    document.getElementById('suggestions').innerText = 'Recommended crops: ' + suggestion;
  }
