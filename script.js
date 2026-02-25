function calculateBMI() {
    const height = parseFloat(document.getElementById('height').value) / 100;
    const weight = parseFloat(document.getElementById('weight').value);

    if (!height || !weight || height <= 0 || weight <= 0) {
        document.getElementById('result').textContent = 'Enter valid values';
        document.getElementById('category').textContent = '';
        document.getElementById('category').className = '';
        return;
    }

    const bmi = weight / (height * height);
    document.getElementById('result').textContent = bmi.toFixed(1);

    const category = document.getElementById('category');
    category.textContent = getCategory(bmi);
    category.className = getClass(bmi);
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
