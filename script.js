let currentUnit = 'metric';

function setUnit(unit) {
  currentUnit = unit;

  const metric = document.getElementById('metric-inputs');
  const standard = document.getElementById('standard-inputs');

  if (unit === 'metric') {
    metric.style.display = 'block';
    standard.style.display = 'none';
  } else {
    metric.style.display = 'none';
    standard.style.display = 'block';
  }

  // Highlight active tab
  const options = document.querySelectorAll('.unit-option');
  options.forEach(opt => {
    const input = opt.querySelector('input');
    if (input.value === unit) {
      opt.classList.add('active');
      input.checked = true;
    } else {
      opt.classList.remove('active');
      input.checked = false;
    }
  });

  // Reset result
  document.getElementById('result').textContent = 'Enter values and click Calculate';
  const category = document.getElementById('category');
  category.textContent = '';
  category.className = '';
}

function calculateBMI() {
  let heightMeters;
  let weightKg;

  if (currentUnit === 'metric') {
    const heightCm = parseFloat(document.getElementById('heightCm').value);
    const weight = parseFloat(document.getElementById('weightKg').value);

    if (!heightCm || !weight || heightCm <= 0 || weight <= 0) {
      showError();
      return;
    }

    heightMeters = heightCm / 100;
    weightKg = weight;
  } else {
    const feet = parseFloat(document.getElementById('heightFt').value);
    const inches = parseFloat(document.getElementById('heightIn').value);
    const pounds = parseFloat(document.getElementById('weightLb').value);

    if ((isNaN(feet) && feet !== 0) || (isNaN(inches) && inches !== 0) || !pounds || feet < 0 || inches < 0 || pounds <= 0) {
      showError();
      return;
    }

    const totalInches = feet * 12 + inches;
    const heightCm = totalInches * 2.54;     // inches → cm
    heightMeters = heightCm / 100;
    weightKg = pounds * 0.45359237;          // pounds → kg
  }

  const bmi = weightKg / (heightMeters * heightMeters);
  document.getElementById('result').textContent = bmi.toFixed(1);

  const category = document.getElementById('category');
  category.textContent = getCategory(bmi);
  category.className = getClass(bmi);
}

function showError() {
  document.getElementById('result').textContent = 'Enter valid values';
  const category = document.getElementById('category');
  category.textContent = '';
  category.className = '';
}

function getCategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function getClass(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
}

// Set initial tab on load
window.addEventListener('DOMContentLoaded', () => {
  setUnit('metric');
});
