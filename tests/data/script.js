function generateCard() {
    const name = document.getElementById('name').value;
    const wish = document.getElementById('wish').value;
    const card = document.getElementById('card');
    const cardName = document.getElementById('cardName');
    const cardWish = document.getElementById('cardWish');

    if (name && wish) {
        cardName.textContent = name;
        cardWish.textContent = wish;
        card.style.display = 'block';
    } else {
        alert('Please fill in both fields.');
    }
}

function closeCard() {
    const card = document.getElementById('card');
    card.style.display = 'none';
}